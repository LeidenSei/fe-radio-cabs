import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Feedback, CreateFeedbackDTO, UpdateFeedbackDTO } from 'src/app/models/feedback';
import { QueryParams } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
 })
 export class FeedbackService {
  private apiUrl = `${environment.apiUrl}/feedback`;
 
  constructor(private http: HttpClient) {}
 
  // Tìm kiếm feedback
  searchFeedbacks(queryParams: QueryParams): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, queryParams)
      .pipe(
        catchError(error => {
          console.error('Error searching feedbacks:', error);
          throw error;
        })
      );
  }
 
  // Lấy feedback theo ID
  getFeedbackById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error getting feedback ${id}:`, error);
          throw error;
        })
      );
  }
 
  // Tạo feedback mới - không cần auth
  createFeedback(feedback: CreateFeedbackDTO): Observable<any> {
    const formData = this.prepareFormData(feedback);
    return this.http.post(this.apiUrl, formData)
      .pipe(
        catchError(error => {
          console.error('Error creating feedback:', error);
          throw error;
        })
      );
  }
 
  // Cập nhật feedback - cần ADMIN role
  updateFeedback(id: number, feedback: UpdateFeedbackDTO): Observable<Feedback> {
    const formData = this.prepareFormData(feedback);
    return this.http.put<Feedback>(`${this.apiUrl}/${id}`, formData)
      .pipe(
        catchError(error => {
          console.error(`Error updating feedback ${id}:`, error);
          throw error;
        })
      );
  }
 
  // Xóa feedback - cần ADMIN role
  deleteFeedback(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting feedback ${id}:`, error);
          throw error;
        })
      );
  }
 
  // Helper để tạo FormData
  private prepareFormData(data: CreateFeedbackDTO | UpdateFeedbackDTO): FormData {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (key === 'images' && data[key] instanceof File) {
        formData.append('images', data[key] as File);
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key].toString());
      }
    });
 
    return formData;
  }
 }
