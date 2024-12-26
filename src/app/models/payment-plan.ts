export interface PaymentPlan {
    id: number;
    amount: number;
    duration: number;
    planType: string; // 'Month' | 'Quarter'
    isActive: boolean;
   }
   
   export interface SearchPaymentPlanFilter {
    pageIndex: number; 
    pageSize: number;
    searchTerm?: string;
   }
   
   export interface CreatePaymentPlanDTO {
    amount: number;
    duration: number;
    planType: string;
    isActive: boolean;
   }
   
   export interface UpdatePaymentPlanDTO extends CreatePaymentPlanDTO {}