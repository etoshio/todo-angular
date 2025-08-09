// src/app/features/tasks/task-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskFormComponent } from '../form/task-form.component';
import { TaskService } from '../../../core/services/task.service';
import { TaskStatus } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';

@Component({
        selector: 'app-task-list',
        standalone: true,
        templateUrl: './task-list.component.html',
        styleUrls: ['./task-list.component.css'],
        imports: [
          CommonModule, ReactiveFormsModule, RouterLink,
          MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
          MatButtonModule, MatIconModule, MatSnackBarModule,
          TaskFormComponent]
})
export class TaskListComponent implements OnInit {
  private service = inject(TaskService);
  private snack = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  tasks: Task[] = [];
  loading = false;
  creating = false;

  filterForm = this.fb.group({
    status: ['' as '' | TaskStatus]
  });

  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    const status = this.filterForm.value.status || undefined;
    this.service.list({ status }).subscribe({
      next: res => { this.tasks = res; this.loading = false; },
      error: err => { console.error(err); this.snack.open('Erro ao carregar tarefas', 'OK', { duration: 2500 }); this.loading = false; }
    });
  }

  openNew() { this.creating = true; }
  afterCreate() { this.creating = false; this.load(); }

  markDone(t: Task) {
    if (!t.id) return;
    this.service.updateStatus(t.id, 'COMPLETED').subscribe({
      next: () => { this.snack.open('Tarefa concluída!', 'OK', { duration: 2000 }); this.load(); },
      error: err => { console.error(err); this.snack.open('Erro ao concluir tarefa', 'OK', { duration: 2500 }); }
    });
  }

  remove(t: Task) {
    if (!t.id) return;
    if (!confirm(`Excluir a tarefa "${t.title}"?`)) return;
    this.service.remove(t.id).subscribe({
      next: () => { this.snack.open('Tarefa excluída', 'OK', { duration: 2000 }); this.load(); },
      error: err => { console.error(err); this.snack.open('Erro ao excluir tarefa', 'OK', { duration: 2500 }); }
    });
  }
}
