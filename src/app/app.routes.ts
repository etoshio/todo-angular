import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { TaskDetailComponent } from './features/tasks/detail/task-detail.component';
import { authGuard } from './core/guards/auth.guard';
import { TaskListComponent } from './features/tasks/list/task-list.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },           // sem guard
  { path: 'register', component: RegisterComponent },     // sem guard
  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: '**', redirectTo: 'tasks' }
];
