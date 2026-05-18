import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, delay, map, of, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { DEMO_USERS } from '../constants/demo-users';
import {
  AuthResponse,
  LoginCredentials,
  SignupPayload,
  User,
  UserRole,
} from '../models/user.model';

const TOKEN_KEY = 'angular_practice_token';
const USERS_KEY = 'angular_practice_registered_users';

interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  name: string;
  exp: number;
}

/**
 * Interview topics demonstrated:
 * - BehaviorSubject: stream of current user for subscribers (guards, components)
 * - Signals: synchronous read in templates and computed()
 * - RxJS: login/signup as Observable pipelines with delay (simulated API)
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  private readonly currentUserSubject = new BehaviorSubject<User | null>(
    this.loadUserFromStorage()
  );

  /** Expose as Observable — classic RxJS pattern for async subscribers */
  readonly currentUser$ = this.currentUserSubject.asObservable();

  /** Signal mirror — Angular 16+ reactive primitive for templates */
  readonly currentUser = signal<User | null>(this.currentUserSubject.value);

  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  readonly userRole = computed(() => this.currentUser()?.role ?? null);

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return of(null).pipe(
      delay(600),
      map(() => {
        const users = this.getAllUsers();
        const match = users.find(
          (u) =>
            u.email.toLowerCase() === credentials.email.toLowerCase() &&
            u.password === credentials.password
        );
        if (!match) {
          throw new Error('Invalid email or password');
        }
        const { password: _, ...user } = match;
        return this.buildAuthResponse(user);
      }),
      tap((res) => this.setSession(res))
    );
  }

  signup(payload: SignupPayload): Observable<AuthResponse> {
    return of(null).pipe(
      delay(800),
      map(() => {
        const users = this.getAllUsers();
        if (users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase())) {
          throw new Error('Email already registered');
        }
        const newUser: User = {
          id: crypto.randomUUID(),
          email: payload.email,
          name: payload.name,
          role: payload.role ?? 'user',
        };
        users.push({ ...newUser, password: payload.password });
        this.saveRegisteredUsers(users.filter((u) => !DEMO_USERS.some((d) => d.id === u.id)));
        return this.buildAuthResponse(newUser);
      }),
      tap((res) => this.setSession(res))
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  hasRole(roles: UserRole[]): boolean {
    const role = this.userRole();
    return role !== null && roles.includes(role);
  }

  private setSession(response: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, response.token);
    this.currentUserSubject.next(response.user);
    this.currentUser.set(response.user);
  }

  private loadUserFromStorage(): User | null {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    if (!token) return null;
    try {
      const payload = jwtDecode<JwtPayload>(token);
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
      return {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        name: payload.name,
      };
    } catch {
      return null;
    }
  }

  private buildAuthResponse(user: User): AuthResponse {
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
    const header = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
    const body = btoa(
      JSON.stringify({
        sub: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        exp,
      })
    );
    const token = `${header}.${body}.demo-signature`;
    return { token, user };
  }

  private getAllUsers(): Array<User & { password: string }> {
    return [...DEMO_USERS, ...this.loadRegisteredUsers()];
  }

  private loadRegisteredUsers(): Array<User & { password: string }> {
    if (typeof localStorage === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]');
    } catch {
      return [];
    }
  }

  private saveRegisteredUsers(users: Array<User & { password: string }>): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}
