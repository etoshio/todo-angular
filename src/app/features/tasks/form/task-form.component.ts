// src/app/features/tasks/task-form.component.ts
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { CommonModule } from '@angular/common';

@Component({
        selector: 'app-task-form',
        standalone: true,
        templateUrl: './task-form.component.html',
        styleUrls: ['./task-form.component.css'],
        imports: [ 
          CommonModule,
          ReactiveFormsModule,
          MatCardModule,
          MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
          MatDatepickerModule,
          MatNativeDateModule,
          MatSnackBarModule
        ]
})

export class TaskFormComponent {
  private fb = inject(FormBuilder);
  private service = inject(TaskService);
  private snack = inject(MatSnackBar);

  @Input() value?: Task | null = null;
  @Output() saved = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  saving = false;

  form = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    // aqui trabalhamos com Date no form; converteremos para ISO na submissão
    dueDate: <Date | null>(null)
  });

  ngOnChanges() {
    if (this.value) {
      const due = this.value.dueDate ? new Date(this.value.dueDate) : null;
      this.form.patchValue({ title: this.value.title, description: this.value.description ?? '', dueDate: due });
    } else {
      this.form.reset({ title: '', description: '', dueDate: null });
    }
  }

  submit() {
    if (this.form.invalid || this.saving) return;
    this.saving = true;

    const raw = this.form.value;
    const payload: Task = {
      title: (raw.title ?? '').trim(),
      description: (raw.description ?? '').trim() || undefined,
      dueDate: raw.dueDate ? new Date(raw.dueDate).toISOString() : undefined
    };

    const obs = this.value?.id
      ? this.service.update(this.value.id!, payload)
      : this.service.create(payload);

    obs.subscribe({
      next: (t) => {
        this.snack.open(this.value?.id ? 'Tarefa atualizada!' : 'Tarefa criada!', 'OK', { duration: 2000 });
        this.saving = false;
        this.saved.emit(t);
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Erro ao salvar tarefa', 'OK', { duration: 2500 });
        this.saving = false;
      }
    });
  }
}
