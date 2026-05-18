export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  vehicle: string;
  service: string;
  date: string;
  status: AppointmentStatus;
  mechanic?: string;
}
