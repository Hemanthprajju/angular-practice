export type UserRole = 'admin' | 'user' | 'mechanic';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginCredentials {
  name: string;
  role?: UserRole;
}
