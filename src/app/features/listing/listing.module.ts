import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CompanySearchComponent } from './components/company-search/company-search.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListingPageComponent, CompanyFormComponent, CompanySearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add this
    MatFormFieldModule,
    MatPaginatorModule, // Add this
  ]
})
export class ListingModule { }
