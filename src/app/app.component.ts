import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <a routerLink="/tasks" style="color:white;text-decoration:none;margin-right:16px;">To-Do</a>
      <span style="flex:1"></span>
      <ng-container *ngIf="auth.isLoggedIn$ | async; else loggedOut">
        <button mat-button (click)="logout()">Sair</button>
      </ng-container>
      <ng-template #loggedOut>
        <a mat-button routerLink="/login">Entrar</a>
        <a mat-button routerLink="/register">Cadastrar</a>
      </ng-template>
    </mat-toolbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  auth = inject(AuthService);
  logout(){ this.auth.logout(); }
}
