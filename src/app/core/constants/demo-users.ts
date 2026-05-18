import { User } from '../models/user.model';
import { appEmail } from './app-brand';

/** Mock users for interview demo — passwords match role + "123" */
export const DEMO_USERS: Array<User & { password: string }> = [
  {
    id: '1',
    email: appEmail('admin'),
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: appEmail('user'),
    password: 'user123',
    name: 'John Driver',
    role: 'user',
  },
  {
    id: '3',
    email: appEmail('mechanic'),
    password: 'mechanic123',
    name: 'Mike Mechanic',
    role: 'mechanic',
  },
];
