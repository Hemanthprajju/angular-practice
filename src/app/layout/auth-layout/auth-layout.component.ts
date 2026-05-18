import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="auth-shell">
      <div class="auth-panel">
        <div class="auth-brand">
          <span>📘</span>
          <h1>Angular Practice</h1>
          <p>Auth, guards, RxJS, signals &amp; more</p>
        </div>
        <router-outlet />
      </div>
      <aside class="auth-info">
        <h2>Interview topics in this app</h2>
        <ul>
          <li>Standalone components &amp; lazy routes</li>
          <li>Reactive forms &amp; validation</li>
          <li>JWT auth + HTTP interceptor</li>
          <li>authGuard, roleGuard, guestGuard</li>
          <li>BehaviorSubject + Signals</li>
          <li>Parent/child &amp; lifecycle hooks</li>
          <li>RxJS operators (map, filter, debounce)</li>
        </ul>
        <p class="hint">Demo: admin&#64;angularpractice.com / admin123</p>
      </aside>
    </div>
  `,
  styles: [
    `
      .auth-shell {
        min-height: 100vh;
        display: grid;
        grid-template-columns: 1fr 1fr;
        background: #0b1120;
      }
      .auth-panel {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 3rem;
        max-width: 480px;
        margin: 0 auto;
        width: 100%;
      }
      .auth-brand {
        margin-bottom: 2rem;
        span {
          font-size: 2rem;
        }
        h1 {
          margin: 0.5rem 0 0;
          color: #f1f5f9;
          font-size: 1.5rem;
        }
        p {
          margin: 0.25rem 0 0;
          color: #64748b;
          font-size: 0.9rem;
        }
      }
      .auth-info {
        background: linear-gradient(135deg, #1e1b4b, #312e81);
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h2 {
          color: #e0e7ff;
          font-size: 1.25rem;
        }
        ul {
          color: #c7d2fe;
          line-height: 1.8;
          padding-left: 1.25rem;
        }
        .hint {
          margin-top: 2rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          color: #a5b4fc;
          font-family: monospace;
          font-size: 0.85rem;
        }
      }
      @media (max-width: 900px) {
        .auth-shell {
          grid-template-columns: 1fr;
        }
        .auth-info {
          display: none;
        }
      }
    `,
  ],
})
export class AuthLayoutComponent {}
