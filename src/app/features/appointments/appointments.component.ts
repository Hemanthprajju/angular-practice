import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppointmentService } from '../../core/services/appointment.service';
import { Appointment, AppointmentStatus } from '../../core/models/appointment.model';
import { TopicBadgeComponent } from '../../shared/components/topic-badge/topic-badge.component';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, TopicBadgeComponent],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent implements OnInit {
  private readonly appointmentService = inject(AppointmentService);

  readonly loading = signal(true);
  readonly filterStatus = signal<AppointmentStatus | 'all'>('all');
  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly searchTerm = signal('');

  readonly appointments = this.appointmentService.appointments;
  readonly filtered = signal<Appointment[]>([]);

  constructor() {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((term) => this.searchTerm.set(term.toLowerCase()));

    effect(() => {
      this.filterStatus();
      this.searchTerm();
      this.appointments();
      this.applyFilter();
    });
  }

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe({
      next: () => this.loading.set(false),
    });
  }

  setFilter(status: AppointmentStatus | 'all'): void {
    this.filterStatus.set(status);
  }

  private applyFilter(): void {
    let list = [...this.appointments()];
    const status = this.filterStatus();
    const search = this.searchTerm();

    if (status !== 'all') {
      list = list.filter((a) => a.status === status);
    }
    if (search) {
      list = list.filter(
        (a) =>
          a.vehicle.toLowerCase().includes(search) ||
          a.service.toLowerCase().includes(search)
      );
    }
    this.filtered.set(list);
  }
}
