// src/app/models/user.ts
export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    images?: string;
    createdAt?: Date;
    lastLoginDate?: Date;
  }
  
  export interface QueryParams {
    pageNumber: number;  
    pageSize: number;
    keyword?: string;
    status?: string;
    sortBy: string;  
    sortDir: string;  
   }
  
  export interface CreateUserDTO {
    username: string;
    email: string; 
    password?: string;
    role: string;
    images?: File;
  }
  
  export interface UpdateUserDTO {
    username: string;
    email: string;
    password?: string;
    role: string;
    images?: File;
  }