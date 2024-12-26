export interface Feedback {
    id: number;
    name: string;
    email: string;
    mobile: string;
    city: string;
    description: string;
    feedbackType: string;
    images?: string;
    submissionDate?: Date;
   }
   
   export interface CreateFeedbackDTO {
    name: string;
    email: string;
    mobile: string;
    city: string;
    description: string;
    feedbackType: string;
    images?: File;
   }
   
   export interface UpdateFeedbackDTO extends CreateFeedbackDTO {}