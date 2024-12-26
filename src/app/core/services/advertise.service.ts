import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CreateAdvertiseDTO } from 'src/app/models/advertise';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvertiseService {
  private apiUrl = `${environment.apiUrl}/advertise`;

  constructor(private http: HttpClient) {}

  // Create new advertise
  addAdvertise(advertise: CreateAdvertiseDTO): Observable<any> {
    const formData = new FormData();
    
    // Add fields to formData
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
          if (error.status === 400) {
            // Handle specific error cases
            if (error.error === "Company is not existed") {
              throw new Error('Company does not exist');
            }
          }
          console.error('Error creating advertise:', error);
          throw error;
        })
      );
  }
}
