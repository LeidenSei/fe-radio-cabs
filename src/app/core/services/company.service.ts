import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company, CreateCompanyDTO, UpdateCompanyDTO } from 'src/app/models/companyDto';
import { QueryParams } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = `${environment.apiUrl}/company`;

  constructor(
    private http: HttpClient
  ) {}

  // Tìm kiếm company với phân trang
  searchCompanies(queryParams: QueryParams): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, queryParams)
      .pipe(
        catchError(error => {
          console.error('Error searching companies:', error);
          throw error;
        })
      );
  }

  // Lấy thông tin company theo ID
  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error getting company ${id}:`, error);
          throw error;
        })
      );
  }

  // Tạo company mới
  createCompany(company: CreateCompanyDTO): Observable<Company> {
    const formData = this.prepareFormData(company);
    return this.http.post<Company>(this.apiUrl, formData)
      .pipe(
        catchError(error => {
          console.error('Error creating company:', error);
          throw error;
        })
      );
  }

  // Cập nhật thông tin company
  updateCompany(id: number, company: UpdateCompanyDTO): Observable<Company> {
    const formData = this.prepareFormData(company);
    return this.http.put<Company>(`${this.apiUrl}/${id}`, formData)
      .pipe(
        catchError(error => {
          console.error(`Error updating company ${id}:`, error);
          throw error;
        })
      );
  }

  // Xóa company
  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting company ${id}:`, error);
          throw error;
        })
      );
  }

  // Helper method để tạo FormData
  private prepareFormData(data: CreateCompanyDTO | UpdateCompanyDTO): FormData {
    const formData = new FormData();
    
    // Thêm các trường thông tin vào formData
    Object.keys(data).forEach(key => {
      if (key === 'images' && data[key] instanceof File) {
        formData.append('images', data[key] as File);
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key].toString());
      }
    });

    return formData;
  }

  // Helper method để check role (tùy thuộc vào AuthService của bạn)
  private checkRole(allowedRoles: string[]): boolean {
    // Implement role checking logic here
    return true; // Placeholder return
  }
}