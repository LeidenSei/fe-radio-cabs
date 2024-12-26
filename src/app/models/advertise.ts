export interface CreateAdvertiseDTO {
    companyId: number;
    description: string;
    designation: string;
    isActive: boolean;
    startDate: Date;
    endDate: Date;
    images?: File;
  }