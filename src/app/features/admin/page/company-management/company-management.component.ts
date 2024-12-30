import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/core/services/company.service';
import { Company } from 'src/app/models/companyDto';
import { QueryParams } from 'src/app/models/user';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styleUrls: ['./company-management.component.scss']
})
export class CompanyManagementComponent implements OnInit {
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

  constructor(
    private companyService: CompanyService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadCompanies();
  }

  private initForm() {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      telephone: [''],
      faxNumber: [''],
      address: [''],
      contactPerson: ['', Validators.required],
      designation: [''],
      membershipType: ['Free', Validators.required],
      isActive: [true],
      userId: [1] // Temporary userId
    });
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
        // Map new response format
        this.companies = response.data;
        this.totalItems = response.totalRecords;
      },
      error => console.error('Error loading companies:', error)
    );
  }

  onSearch() {
    this.currentPage = 1;
    this.loadCompanies();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadCompanies();
  }

  editCompany(company: Company) {
    this.editingCompany = company;
    this.companyForm.patchValue(company);
    this.showModal = true;
  }

  deleteCompany(id: number) {
    if (confirm('Bạn có chắc chắn muốn xóa công ty này?')) {
      this.companyService.deleteCompany(id).subscribe(
        () => {
          this.loadCompanies();
        },
        error => console.error('Error deleting company:', error)
      );
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitForm() {
    if (this.companyForm.valid) {
      const formData = this.companyForm.value;
      if (this.selectedFile) {
        formData.images = this.selectedFile;
      }

      if (this.editingCompany) {
        this.companyService.updateCompany(this.editingCompany.id, formData).subscribe(
          () => {
            this.closeModal();
            this.loadCompanies();
          },
          error => console.error('Error updating company:', error)
        );
      } else {
        this.companyService.createCompany(formData).subscribe(
          () => {
            this.closeModal();
            this.loadCompanies();
          },
          error => console.error('Error creating company:', error)
        );
      }
    }
  }

  closeModal() {
    this.showModal = false;
    this.editingCompany = null;
    this.selectedFile = null;
    this.companyForm.reset({
      membershipType: 'Free',
      isActive: true,
      userId: 1
    });
  }
}
