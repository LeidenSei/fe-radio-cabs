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
    pageIndex: number;
    pageSize: number;
    searchTerm?: string;
    sortColumn?: string;
    sortDirection?: 'asc' | 'desc';
    filterColumns?: { [key: string]: any };
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