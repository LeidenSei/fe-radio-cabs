// src/app/models/auth.ts
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  success: boolean;
  errors?: string[];
  user: {
    id: number;
    email: string;
    username: string;
    role: string;
    images?: string;
    lastLoginDate?: Date;
  }
}