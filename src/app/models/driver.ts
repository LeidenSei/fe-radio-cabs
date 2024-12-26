export interface Driver {
    id: number;
    driverName: string;
    contactPerson: string;
    email: string;
    mobile: string;
    telephone: string;
    address: string;
    city: string;
    experience: string;
    description: string;
    images?: string;
    isActive: boolean;
    userId: number;
    registrationDate?: Date;
    user?: any;
   }
   
   export interface CreateDriverDTO {
    driverName: string;
    contactPerson: string; 
    email: string;
    mobile: string;
    telephone: string;
    address: string;
    city: string;
    experience: string;
    description: string;
    images?: File;
    isActive: boolean;
    userId: number;
   }
   
   export interface UpdateDriverDTO extends CreateDriverDTO {}