import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { CompanySearchComponent } from './components/company-search/company-search.component';



@NgModule({
  declarations: [ListingPageComponent, CompanyFormComponent, CompanySearchComponent],
  imports: [
    CommonModule
  ]
})
export class ListingModule { }
