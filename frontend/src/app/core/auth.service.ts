import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface AuthUser {
  authenticated: boolean;
  name: string | null;
  email: string | null;
  picture: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authUserSubject = new BehaviorSubject<AuthUser>({
    authenticated: false,
    name: null,
    email: null,
    picture: null
  });

  readonly authUser$ = this.authUserSubject.asObservable();

  get currentUser(): AuthUser {
    return this.authUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.authUserSubject.value.authenticated;
  }

  constructor(private http: HttpClient) {}

  loadCurrentUser(): void {
    this.http.get<AuthUser>('/api/auth/me').subscribe({
      next: (user) => this.authUserSubject.next(user),
      error: () => this.authUserSubject.next({ authenticated: false, name: null, email: null, picture: null })
    });
  }

  loginWithGoogle(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  logout(): void {
    this.http.post('/api/auth/logout', {}).subscribe({
      next: () => {
        this.authUserSubject.next({ authenticated: false, name: null, email: null, picture: null });
        window.location.href = '/';
      },
      error: () => {
        window.location.href = '/';
      }
    });
  }
}
