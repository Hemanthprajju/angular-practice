import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

/**
 * Role guard — reads `data.roles` from route config.
 * Example: { path: 'admin', canActivate: [roleGuard], data: { roles: ['admin'] } }
 */
export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const allowedRoles = (route.data['roles'] as UserRole[]) ?? [];

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/auth/login']);
  }

  if (auth.hasRole(allowedRoles)) {
    return true;
  }

  return router.createUrlTree(['/dashboard'], {
    queryParams: { denied: 'role' },
  });
};
