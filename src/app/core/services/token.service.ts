
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const KEY = 'todo_jwt';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private _token$ = new BehaviorSubject<string | null>(this.get());
  token$ = this._token$.asObservable();

  set(token: string){ localStorage.setItem(KEY, token); this._token$.next(token); }
  get(): string | null { return localStorage.getItem(KEY); }
  clear(){ localStorage.removeItem(KEY); this._token$.next(null); }
}
