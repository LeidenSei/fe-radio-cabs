// core/services/advertise.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateAdvertiseDTO, SearchAdFilter } from 'src/app/models/advertise';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvertiseService {
  private apiUrl = `${environment.apiUrl}/advertise`;

  constructor(private http: HttpClient) {}

  // Get all advertisements
  getAdvertisements(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Search advertisements
  searchAdvertise(filter: SearchAdFilter): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, filter);
  }

  // Create new advertise
  addAdvertise(advertise: CreateAdvertiseDTO): Observable<any> {
    const formData = new FormData();
    
    formData.append('companyId', advertise.companyId.toString());
    formData.append('description', advertise.description);
    formData.append('designation', advertise.designation);
    formData.append('isActive', advertise.isActive.toString());
    formData.append('startDate', advertise.startDate.toISOString());
    formData.append('endDate', advertise.endDate.toISOString());

    if (advertise.images) {
      formData.append('images', advertise.images);
    }

    return this.http.post(this.apiUrl, formData)
      .pipe(
        catchError(error => {
          if (error.status === 400 && error.error === "Company is not existed") {
            throw new Error('Company does not exist');
          }
          throw error;
        })
      );
  }

  // Update advertise
  updateAdvertise(id: number, advertise: any): Observable<any> {
    const formData = new FormData();
    
    formData.append('companyId', advertise.companyId.toString());
    formData.append('description', advertise.description);
    formData.append('designation', advertise.designation);
    formData.append('isActive', advertise.isActive.toString());
    formData.append('startDate', advertise.startDate.toISOString());
    formData.append('endDate', advertise.endDate.toISOString());

    if (advertise.images) {
      formData.append('images', advertise.images);
    }

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  // Delete advertise
  deleteAdvertise(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}