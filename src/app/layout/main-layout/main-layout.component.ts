import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/user.model';

interface NavItem {
  path: string;
  label: string;
  roles?: UserRole[];
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  private readonly auth = inject(AuthService);

  readonly user = this.auth.currentUser;
  readonly role = this.auth.userRole;

  private readonly allNav: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/topics', label: 'Angular Topics' },
    { path: '/admin', label: 'Admin', roles: ['admin'] },
  ];

  readonly navItems = computed(() => {
    const r = this.role();
    return this.allNav.filter((item) => !item.roles || (r && item.roles.includes(r)));
  });

  logout(): void {
    this.auth.logout();
  }
}
