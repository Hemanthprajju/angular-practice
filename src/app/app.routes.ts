import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/auth/signup/signup.component').then((m) => m.SignupComponent),
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import('./features/appointments/appointments.component').then(
            (m) => m.AppointmentsComponent
          ),
      },
      {
        path: 'topics',
        loadComponent: () =>
          import('./features/topics/topics-hub/topics-hub.component').then(
            (m) => m.TopicsHubComponent
          ),
      },
      {
        path: 'topics/lifecycle',
        loadComponent: () =>
          import('./features/topics/lifecycle-demo/lifecycle-demo.component').then(
            (m) => m.LifecycleDemoComponent
          ),
      },
      {
        path: 'topics/parent-child',
        loadComponent: () =>
          import('./features/topics/parent-child-demo/parent-child-demo.component').then(
            (m) => m.ParentChildDemoComponent
          ),
      },
      {
        path: 'topics/rxjs',
        loadComponent: () =>
          import('./features/topics/rxjs-demo/rxjs-demo.component').then((m) => m.RxjsDemoComponent),
      },
      {
        path: 'topics/signals',
        loadComponent: () =>
          import('./features/topics/signals-demo/signals-demo.component').then(
            (m) => m.SignalsDemoComponent
          ),
      },
      {
        path: 'admin',
        canActivate: [roleGuard],
        data: { roles: ['admin'] },
        loadComponent: () =>
          import('./features/admin/admin.component').then((m) => m.AdminComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
