// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CreateUserDTO, QueryParams, UpdateUserDTO, User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  // Tìm kiếm với phân trang - khớp với API search
  searchUsers(queryParams: QueryParams): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, queryParams);
  }

  // Lấy user theo ID - khớp với API GetById 
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(userData: CreateUserDTO): Observable<any> {
    const formData = this.prepareFormData(userData);
    return this.http.post(this.apiUrl, formData); // Gửi formData đi
  }
  

  // Cập nhật user với form data - khớp với API Update
  updateUser(id: number, userData: UpdateUserDTO): Observable<User> {
    const formData = this.prepareFormData(userData);
    return this.http.put<User>(`${this.apiUrl}/${id}`, formData);
  }

  // Xóa user - khớp với API Delete
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Helper để tạo FormData
  private prepareFormData(data: CreateUserDTO | UpdateUserDTO): FormData {
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