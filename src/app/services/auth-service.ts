import { inject, Injectable } from '@angular/core';
import { AuthClient } from './auth-client';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs';
import { LoginUserInterface } from '../models/LoginUserInterface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(AuthClient);
  private readonly TOKEN_KEY = 'authToken';

  login(email: string, password: string): Observable<string> {
    let loginRequest = { email, password };

    return this.httpClient.login(loginRequest).pipe(
      tap((token: string) => {
        localStorage.setItem(this.TOKEN_KEY, token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): Observable<LoginUserInterface | null> {
    if (!this.isAuthenticated()) {
      return of(null);
    }
    return this.httpClient.getCurrentUserFromToken();
  }

  getUserRole(): Observable<string | null> {
    return this.getCurrentUser().pipe(
      map(user => user ? user.role : null)
    );
  }

  isAdmin(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(user => user ? user.role === 'ADMIN' : false)
    );
  }
  
  logout(): void {
    this.httpClient.logout().subscribe({
      next: () => {
        localStorage.removeItem(this.TOKEN_KEY);
      },
      error: (error) => {
        console.error('Logout failed', error);
        localStorage.removeItem(this.TOKEN_KEY);
      },
    });
  }
}
