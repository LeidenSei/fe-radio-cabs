// src/app/models/companyDto.ts
export interface Company {
  id: number;
  userId: number;
  companyName: string;
  contactPerson: string;
  designation?: string;
  address?: string;
  mobile: string;
  telephone?: string; 
  faxNumber?: string;
  email: string;
  membershipType: string; // "Premium" | "Basic" | "Free"
  isActive: boolean;
  images?: string;
  registrationDate: Date;
}

export interface CreateCompanyDTO {
  userId: number;
  companyName: string;
  contactPerson: string;
  designation?: string;
  address?: string;
  mobile: string;
  telephone?: string;
  faxNumber?: string;
  email: string;
  membershipType: string;
  isActive: boolean;
  images?: File;
}

export interface UpdateCompanyDTO extends CreateCompanyDTO {}