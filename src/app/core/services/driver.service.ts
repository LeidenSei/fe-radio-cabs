import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateDriverDTO, Driver, UpdateDriverDTO } from 'src/app/models/driver';
import { QueryParams } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' 
 })
 export class DriverService {
  private apiUrl = `${environment.apiUrl}/driver`;
 
  constructor(private http: HttpClient) {}
 
  // Tìm kiếm driver
  searchDrivers(queryParams: QueryParams): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, queryParams)
      .pipe(
        catchError(error => {
          console.error('Error searching drivers:', error);
          throw error;
        })
      );
  }
 
  // Lấy thông tin driver theo ID
  getDriverById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error getting driver ${id}:`, error);
          throw error; 
        })
      );
  }
 
  // Tạo driver mới
  createDriver(driver: CreateDriverDTO): Observable<any> {
    const formData = this.prepareFormData(driver);
    return this.http.post(this.apiUrl, formData)
      .pipe(
        catchError(error => {
          if (error.status === 400 && error.error === "Driver is existed") {
            throw new Error('Driver already exists with this email');
          }
          console.error('Error creating driver:', error);
          throw error;
        })
      );
  }
 
  // Cập nhật thông tin driver
  updateDriver(id: number, driver: UpdateDriverDTO): Observable<Driver> {
    const formData = this.prepareFormData(driver);
    return this.http.put<Driver>(`${this.apiUrl}/${id}`, formData)
      .pipe(
        catchError(error => {
          console.error(`Error updating driver ${id}:`, error);
          throw error;
        })
      );
  }
 
  // Xóa driver 
  deleteDriver(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting driver ${id}:`, error);
          throw error;
        })
      );
  }
 
  // Helper để tạo FormData
  private prepareFormData(data: CreateDriverDTO | UpdateDriverDTO): FormData {
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
