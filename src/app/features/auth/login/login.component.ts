import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { appEmail } from '../../../core/constants/app-brand';
import { AuthService } from '../../../core/services/auth.service';
import { TopicBadgeComponent } from '../../../shared/components/topic-badge/topic-badge.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TopicBadgeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);

    this.auth
      .login(this.form.getRawValue())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err: Error) => this.error.set(err.message),
      });
  }

  fillDemo(role: 'admin' | 'user' | 'mechanic'): void {
    const map = {
      admin: { email: appEmail('admin'), password: 'admin123' },
      user: { email: appEmail('user'), password: 'user123' },
      mechanic: { email: appEmail('mechanic'), password: 'mechanic123' },
    };
    this.form.patchValue(map[role]);
  }
}
