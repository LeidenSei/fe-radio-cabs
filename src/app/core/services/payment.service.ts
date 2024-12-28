import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchPaymentFilter, Payment, CreatePaymentDTO, UpdatePaymentDTO } from './payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly baseUrl = `${environment.apiUrl}/payment`;

  // Payment status and type enums for better type safety
  readonly PaymentStatus = {
    PENDING: 'PENDING',
    DONE: 'DONE'
  } as const;

  readonly PaymentType = {
    MONTH: 'Month',
    QUARTER: 'Quarter'
  } as const;

  constructor(private http: HttpClient) {}

  /**
   * Search payments with filters
   * @param filter Search parameters
   * @returns Observable of paginated payment results
   */
  searchPayments(filter: SearchPaymentFilter): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/search`, filter).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get payment by ID
   * @param id Payment ID
   * @returns Observable of Payment
   */
  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Create new payment
   * @param payment Payment creation data
   * @returns Observable of created Payment
   */
  createPayment(payment: CreatePaymentDTO): Observable<Payment> {
    const formData = this.createFormData(payment);
    
    return this.http.post<Payment>(this.baseUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update existing payment
   * @param id Payment ID
   * @param payment Updated payment data
   * @returns Observable of updated Payment
   */
  updatePayment(id: number, payment: UpdatePaymentDTO): Observable<Payment> {
    const formData = this.createFormData(payment);
    
    return this.http.put<Payment>(`${this.baseUrl}/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Delete payment
   * @param id Payment ID
   * @returns Observable of deleted Payment
   */
  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Create FormData from payment DTO
   * @param payment Payment DTO
   * @returns FormData object
   */
  private createFormData(payment: CreatePaymentDTO | UpdatePaymentDTO): FormData {
    const formData = new FormData();
    
    if ('userId' in payment) {
      formData.append('userId', payment.userId.toString());
    }
    
    if ('planId' in payment) {
      formData.append('planId', payment.planId.toString());
    }
    
    if ('paymentStatus' in payment) {
      formData.append('paymentStatus', payment.paymentStatus);
    }
    
    return formData;
  }

  /**
   * Handle HTTP errors
   * @param error HTTP error response
   * @returns Observable error
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 400) {
        switch (error.error) {
          case 'User id Not found':
            errorMessage = 'User not found';
            break;
          case 'Payment plan id Not found':
            errorMessage = 'Payment plan not found';
            break;
          default:
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}