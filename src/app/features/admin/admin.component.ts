import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { TopicBadgeComponent } from '../../shared/components/topic-badge/topic-badge.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TopicBadgeComponent, JsonPipe],
  template: `
    <header class="page-header">
      <app-topic-badge label="roleGuard" />
      <h1>Admin panel</h1>
      <p>Only users with role <code>admin</code> can see this page.</p>
    </header>

    <section class="card">
      <h2>Route config snippet</h2>
      <pre>{{ routeSnippet }}</pre>
    </section>

    <section class="card">
      <h2>Current session</h2>
      <pre>{{ user() | json }}</pre>
    </section>
  `,
  styles: [
    `
      .page-header h1 {
        color: #f8fafc;
        margin: 0.5rem 0;
      }
      p {
        color: #94a3b8;
      }
      code {
        background: #334155;
        padding: 0.1rem 0.35rem;
        border-radius: 4px;
        color: #fcd34d;
      }
      .card {
        background: #1e293b;
        border-radius: 12px;
        padding: 1.25rem;
        margin-bottom: 1rem;
        border: 1px solid #334155;
        h2 {
          margin: 0 0 0.75rem;
          font-size: 1rem;
          color: #cbd5e1;
        }
        pre {
          margin: 0;
          color: #a5b4fc;
          font-size: 0.8rem;
          overflow-x: auto;
        }
      }
    `,
  ],
})
export class AdminComponent {
  private readonly auth = inject(AuthService);
  readonly user = this.auth.currentUser;

  readonly routeSnippet = `{
  path: 'admin',
  canActivate: [authGuard, roleGuard],
  data: { roles: ['admin'] },
  loadComponent: () => import('./admin/admin.component')
    .then(m => m.AdminComponent)
}`;
}
