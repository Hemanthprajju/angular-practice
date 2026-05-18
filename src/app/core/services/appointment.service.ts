import { Injectable, signal } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';
import { MOCK_APPOINTMENTS } from '../constants/mock-appointments';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly appointmentsSignal = signal<Appointment[]>([...MOCK_APPOINTMENTS]);

  readonly appointments = this.appointmentsSignal.asReadonly();

  getAppointments(): Observable<Appointment[]> {
    return of([...this.appointmentsSignal()]).pipe(
      delay(400),
      tap((list) => this.appointmentsSignal.set(list))
    );
  }

  getByStatus(status: Appointment['status']): Appointment[] {
    return this.appointmentsSignal().filter((a) => a.status === status);
  }
}
