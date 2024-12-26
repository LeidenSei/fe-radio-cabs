import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchPaymentFilter, Payment, CreatePaymentDTO, UpdatePaymentDTO } from './payment';

@Injectable({
  providedIn: 'root'
 })
 export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payment`;
 
  constructor(private http: HttpClient) {}
 
  // Tìm kiếm payment với filter
  searchPayments(filter: SearchPaymentFilter): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, filter)
      .pipe(
        catchError(error => {
          console.error('Error searching payments:', error);
          throw error;
        })
      );
  }
 
  // Lấy payment theo ID
  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error getting payment ${id}:`, error);
          throw error;
        })
      );
  }
 
  // Tạo payment mới
  createPayment(payment: CreatePaymentDTO): Observable<Payment> {
    const formData = new FormData();
    formData.append('userId', payment.userId.toString());
    formData.append('planId', payment.planId.toString());
 
    return this.http.post<Payment>(this.apiUrl, formData)
      .pipe(
        catchError(error => {
          if (error.status === 400) {
            if (error.error === "User id Not found") {
              throw new Error('User not found');
            }
            if (error.error === "Payment plan id Not found") {
              throw new Error('Payment plan not found');
            }
          }
          console.error('Error creating payment:', error);
          throw error;
        })
      );
  }
 
  // Cập nhật payment
  updatePayment(id: number, payment: UpdatePaymentDTO): Observable<Payment> {
    const formData = new FormData();
    formData.append('userId', payment.userId.toString());
    formData.append('planId', payment.planId.toString());
    formData.append('paymentStatus', payment.paymentStatus);
 
    return this.http.put<Payment>(`${this.apiUrl}/${id}`, formData)
      .pipe(
        catchError(error => {
          if (error.status === 400) {
            if (error.error === "User id Not found") {
              throw new Error('User not found');
            }
            if (error.error === "Payment plan id Not found") {
              throw new Error('Payment plan not found');
            }
          }
          console.error(`Error updating payment ${id}:`, error);
          throw error;
        })
      );
  }
 
  // Xóa payment
  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting payment ${id}:`, error);
          throw error;
        })
      );
  }
 
  // Constants
  readonly PAYMENT_STATUS = {
    PENDING: 'PENDING',
    DONE: 'DONE'
  };
 
  readonly PAYMENT_TYPE = {
    MONTH: 'Month',
    QUARTER: 'Quarter'
  };
 }
