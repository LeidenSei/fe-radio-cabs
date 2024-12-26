export interface Company {
    id: number;
    companyName: string;
    contactPerson: string;
    designation: string;
    email: string;
    mobile: string;
    telephone: string;
    faxNumber: string;
    address: string;
    membershipType: string;
    images?: string;
    isActive: boolean;
    userId: number;
    registrationDate?: Date;
    user?: any;
  }
  
  export interface CreateCompanyDTO {
    companyName: string;
    contactPerson: string;
    designation: string;
    email: string;
    mobile: string;
    telephone: string;
    faxNumber: string;
    address: string;
    membershipType: string;
    images?: File;
    isActive: boolean;
    userId: number;
  }
  
  export interface UpdateCompanyDTO extends CreateCompanyDTO {}