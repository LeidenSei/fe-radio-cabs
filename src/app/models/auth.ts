
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
  }