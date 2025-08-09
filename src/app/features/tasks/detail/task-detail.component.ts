
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { TaskFormComponent } from '../form/task-form.component';

@Component({
        selector: 'app-task-detail',
        standalone: true,
        templateUrl: './task-detail.component.html',
        styleUrls: ['./task-detail.component.css'],
        imports: [CommonModule, MatCardModule, MatButtonModule, TaskFormComponent]
})
export class TaskDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(TaskService);
  task?: Task;
  editing = false;

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.get(id).subscribe(res => this.task = res);
  }
  back(){ this.router.navigate(['/tasks']); }
  afterSave(t: Task){ this.editing = false; this.task = t; }
}
