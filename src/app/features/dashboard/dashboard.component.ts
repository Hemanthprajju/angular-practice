import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { AppointmentService } from '../../core/services/appointment.service';
import { TopicBadgeComponent } from '../../shared/components/topic-badge/topic-badge.component';
import { Appointment } from '../../core/models/appointment.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, TopicBadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly appointments = inject(AppointmentService);
  private readonly route = inject(ActivatedRoute);

  readonly user = this.auth.currentUser;
  readonly roleDenied = signal(false);

  readonly stats = computed(() => {
    const list = this.appointments.appointments();
    return {
      total: list.length,
      scheduled: list.filter((a) => a.status === 'scheduled').length,
      completed: list.filter((a) => a.status === 'completed').length,
    };
  });

  readonly upcoming = computed(() =>
    this.appointments
      .appointments()
      .filter((a) => a.status === 'scheduled')
      .slice(0, 3)
  );

  ngOnInit(): void {
    this.appointments.getAppointments().subscribe();
    this.route.queryParamMap.subscribe((params) => {
      this.roleDenied.set(params.get('denied') === 'role');
    });
  }

  statusClass(status: Appointment['status']): string {
    return `status-${status}`;
  }
}
