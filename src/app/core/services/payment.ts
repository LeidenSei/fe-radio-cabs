export interface Payment {
    id: number;
    userId: number;
    planId: number;
    amount: number;
    paymentDate: Date;
    paymentStatus: string; // 'PENDING' | 'DONE'
    paymentType: string;  // 'Month' | 'Quarter'
    validFrom?: Date;
    validTo?: Date;
    user?: any;
    paymentPlan?: any;
   }
   
   export interface SearchPaymentFilter {
    pageIndex: number;
    pageSize: number;
    searchTerm?: string;
    // Thêm các filter khác nếu cần
   }
   
   export interface CreatePaymentDTO {
    userId: number;
    planId: number;
   }
   
   export interface UpdatePaymentDTO {
    userId: number;
    planId: number;
    paymentStatus: string;
   }