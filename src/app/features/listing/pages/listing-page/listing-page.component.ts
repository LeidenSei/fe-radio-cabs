import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdvertiseService } from 'src/app/core/services/advertise.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { DriverService } from 'src/app/core/services/driver.service';
import { CreateAdvertiseDTO } from 'src/app/models/advertise';
import { Company } from 'src/app/models/companyDto';
import { CreateDriverDTO } from 'src/app/models/driver';
import { QueryParams } from 'src/app/models/user';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})
export class ListingPageComponent implements OnInit {
  companies: Company[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  showModal: boolean = false;
  editingCompany: Company | null = null;
  selectedFile: File | null = null;

  companyForm: FormGroup;
  paymentAmount: any;

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {

  }



  ngOnInit(): void {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      userId: [''],
      contactPerson: ['', Validators.required],
      designation: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      telephone: ['', Validators.pattern(/^[0-9]{10}$/)],
      fax: [''],
      email: ['', [Validators.required, Validators.email]],
      membershipType: ['', Validators.required],
      paymentType: ['', Validators.required],
    });
    this.loadCompanies();

  }

  onRegister(): void {
    this.setCompanyId();
    const formData = this.companyForm.value;

    this.companyService.createCompany(formData).subscribe(
      () => {
        this.loadCompanies();
        this.companyForm.reset();

      },
      error => console.error('Error creating company:', error)
    );
  }

  changePage(page: number) {
    this.currentPage = page;  
    this.loadCompanies();
  }

  updatePayment(): void {
    const membershipType = this.companyForm.get('paymentType')?.value;
    switch (membershipType) {
      case 'Month':
        this.paymentAmount = 5000 + '$';
        break;
      case 'Quarter':
        this.paymentAmount = 2000 + '$';
        break;
      case 'Free':
        this.paymentAmount = 0;
        break;
    }
  }
  resetForm() {
    this.companyForm.reset();
  }
  setCompanyId() {
    const userId = this.authService.getCurrentUserId(); 
    if (userId) {
      console.log(this.authService.isCompany());
      if(this.authService.isCompany()){
        this.companyForm.patchValue({ userId: userId }); // Set companyId in the form
      }
      
    }
  }
  loadCompanies() {
    const queryParams: QueryParams = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      keyword: this.searchTerm,
      sortBy: "Id",
      sortDir: "asc"
    };

    this.companyService.searchCompanies(queryParams).subscribe(
      (response: any) => {
        this.companies = response.data;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
      },
      error => console.error('Error loading companies:', error)
    );
  }


  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.searchTerm = filterValue.trim().toLowerCase();;
    this.loadCompanies();
  }


}
