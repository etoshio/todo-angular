
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, TokenResponse } from '../models/auth.model';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private tokens = inject(TokenService);

  isLoggedIn$ = new BehaviorSubject<boolean>(!!this.tokens.get());

  login(payload: LoginRequest){
    return this.http.post<TokenResponse>(`${environment.api}/auth/login`, payload)
      .pipe(tap(res => { this.tokens.set(res.token); this.isLoggedIn$.next(true); this.router.navigate(['/tasks']); }));
  }

  register(payload: RegisterRequest){
    return this.http.post(`${environment.api}/auth/register`, payload);
  }

  logout(){
    this.tokens.clear();
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  token(){ return this.tokens.get(); }
}
