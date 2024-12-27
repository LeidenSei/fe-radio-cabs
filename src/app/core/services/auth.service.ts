// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from 'src/app/models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('currentUser') || '{}')
  );

  constructor(private http: HttpClient) {}

  public get currentUser() {
    return this.currentUserSubject.value;
  }

  decodeToken(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
          return response;
        })
      );
  }

  isAdmin(): boolean {
    const currentUser = this.currentUser;
    // Kiểm tra token và decode để lấy role
    if (currentUser?.token) {
      const decodedToken = this.decodeToken(currentUser.token);
      return decodedToken?.role === 'ADMIN';
    }
    return false;
  }

  getCurrentRole(): string | undefined {
    return this.currentUser?.user?.role;
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, user);
  }

  logout() {
    // Xóa cả token và user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('adminToken');
    this.currentUserSubject.next({});
  }

  isLoggedIn(): boolean {
    const currentUser = this.currentUser;
    return !!currentUser?.token;
  }
}