import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserInterface } from '../models/UserInterface';
import { LoginUserInterface } from '../models/LoginUserInterface';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  apiUrl = `${environment.apiUrl}api/speakly`;

  HttpClient = inject(HttpClient);

  login(loginInfo: any): Observable<string> {
    return this.HttpClient.post(`${this.apiUrl}/auth/login`, loginInfo, { responseType: 'text' });
  }

  logout(): Observable<void> {
    return this.HttpClient.post<void>(`${this.apiUrl}/auth/logout`, {});
  }

  getCurrentUserFromToken(): Observable<LoginUserInterface> {
    return this.HttpClient.get<LoginUserInterface>(`${this.apiUrl}/auth`);
  }
  getUserByUsername(username: string): Observable<LoginUserInterface> {
    return this.HttpClient.get<LoginUserInterface>(`${this.apiUrl}/users/username?username=${username}`);
  }

  getUserById(userId: number): Observable<UserInterface> {
    return this.HttpClient.get<UserInterface>(`${this.apiUrl}/users/${userId}`);
  }
}
