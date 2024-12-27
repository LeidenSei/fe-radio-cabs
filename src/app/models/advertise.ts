// models/advertise.interface.ts
export interface Advertise {
  id: number;
  companyId: number;
  company?: {
    name: string;
  };
  designation: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  images?: string;
  createdDate?: Date;
}

export interface CreateAdvertiseDTO {
  companyId: number;
  designation: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  images?: File;
}

export interface SearchAdFilter {
  fromDate?: string;
  toDate?: string;
  companyId?: number;
}