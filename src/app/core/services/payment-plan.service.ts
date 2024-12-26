import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SearchPaymentPlanFilter, PaymentPlan, CreatePaymentPlanDTO, UpdatePaymentPlanDTO } from 'src/app/models/payment-plan';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
 })
 export class PaymentPlanService {
  private apiUrl = `${environment.apiUrl}/paymentplan`;
 
  constructor(private http: HttpClient) {}
 
  // Tìm kiếm payment plans
  searchPaymentPlans(filter: SearchPaymentPlanFilter): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, filter)
      .pipe(
        catchError(error => {
          console.error('Error searching payment plans:', error);
          throw error;
        })
      );
  }
 
  // Lấy payment plan theo ID 
  getPaymentPlanById(id: number): Observable<PaymentPlan> {
    return this.http.get<PaymentPlan>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error getting payment plan ${id}:`, error);
          throw error;
        })
      );
  }
 
  // Tạo payment plan mới
  createPaymentPlan(plan: CreatePaymentPlanDTO): Observable<PaymentPlan> {
    const formData = this.prepareFormData(plan);
    return this.http.post<PaymentPlan>(this.apiUrl, formData)
      .pipe(
        catchError(error => {
          console.error('Error creating payment plan:', error);
          throw error;
        })
      );
  }
 
  // Cập nhật payment plan
  updatePaymentPlan(id: number, plan: UpdatePaymentPlanDTO): Observable<PaymentPlan> {
    const formData = this.prepareFormData(plan);
    return this.http.put<PaymentPlan>(`${this.apiUrl}/${id}`, formData)
      .pipe(
        catchError(error => {
          console.error(`Error updating payment plan ${id}:`, error);
          throw error;
        })
      );
  }
 
  // Xóa payment plan
  deletePaymentPlan(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting payment plan ${id}:`, error);
          throw error;
        })
      );
  }
 
  // Helper method để tạo FormData
  private prepareFormData(data: CreatePaymentPlanDTO | UpdatePaymentPlanDTO): FormData {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key].toString());
      }
    });
 
    return formData;
  }
 
  // Constants
  readonly PLAN_TYPES = {
    MONTH: 'Month',
    QUARTER: 'Quarter'  
  };
 }
