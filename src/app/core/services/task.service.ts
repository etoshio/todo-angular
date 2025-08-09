
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);

  list(filter?: { status?: TaskStatus; from?: string; to?: string }): Observable<Task[]> {
    let params = new HttpParams();
    if(filter?.status) params = params.set('status', filter.status);
    if(filter?.from) params = params.set('from', filter.from);
    if(filter?.to) params = params.set('to', filter.to);
    return this.http.get<Task[]>(`${environment.api}/tasks`, { params });
  }

  create(task: Task){ return this.http.post<Task>(`${environment.api}/tasks`, task); }
  update(id: number, task: Task){ return this.http.put<Task>(`${environment.api}/tasks/${id}`, task); }
  remove(id: number){ return this.http.delete<void>(`${environment.api}/tasks/${id}`); }
  get(id: number){ return this.http.get<Task>(`${environment.api}/tasks/${id}`); }
  updateStatus(id: number, status: TaskStatus){ return this.http.patch<Task>(`${environment.api}/tasks/${id}/status`, null, { params: { status } }); }
}

export { TaskStatus };
