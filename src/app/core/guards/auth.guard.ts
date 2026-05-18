import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Route guard — protects routes that require authentication.
 * Interview: CanActivateFn vs class-based CanActivate; returns UrlTree or boolean.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  return auth.currentUser$.pipe(
    take(1),
    map((user) => (user ? true : router.createUrlTree(['/auth/login'])))
  );
};
