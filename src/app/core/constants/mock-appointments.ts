import { Appointment } from '../models/appointment.model';

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    vehicle: '2022 Honda Civic',
    service: 'Oil Change',
    date: '2026-05-10T09:00:00',
    status: 'completed',
    mechanic: 'Mike Mechanic',
  },
  {
    id: 'a2',
    vehicle: '2020 Toyota Camry',
    service: 'Brake Inspection',
    date: '2026-05-15T14:30:00',
    status: 'scheduled',
    mechanic: 'Mike Mechanic',
  },
  {
    id: 'a3',
    vehicle: '2019 Ford F-150',
    service: 'Tire Rotation',
    date: '2026-04-28T11:00:00',
    status: 'cancelled',
  },
  {
    id: 'a4',
    vehicle: '2023 Tesla Model 3',
    service: 'Battery Health Check',
    date: '2026-05-20T10:00:00',
    status: 'scheduled',
    mechanic: 'Sarah Tech',
  },
];
