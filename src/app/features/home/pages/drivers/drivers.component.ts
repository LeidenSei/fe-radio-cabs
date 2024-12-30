import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { DriverService } from 'src/app/core/services/driver.service';
import { CreateDriverDTO } from 'src/app/models/driver';
import { QueryParams } from 'src/app/models/user';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  registrationForm: FormGroup;
  searchForm: FormGroup;
  driverIdExists: boolean = false;
  driverDetails: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'driverName',
    'contactPerson',
    'mobile',
    'email',
    'city',
    'experience',
    'isActive',
    'registrationDate',
    'actions'
  ];
  dataSource: any = [];
  totalItems = 0;
  loading = false;
  queryParams: QueryParams = {
    pageNumber: 1,
    pageSize: 10,
    keyword: '',
    status: '',
    sortBy: 'Id',
    sortDir: 'asc'
  };

  constructor(private fb: FormBuilder,

    private authService: AuthService, private driverService: DriverService, private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    // Initialize registration form
    this.registrationForm = this.fb.group({
      userId: [''],
      driverName: ['', Validators.required],
      contactPerson: [''],
      address: [''],
      city: [],
      mobile: ['', [Validators.pattern('^[0-9]{10}$')]],
      telephone: [''],
      email: ['', [Validators.required, Validators.email]],
      experience: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      isActive: true,
      paymentType: ['', [Validators.required]],
      amount: [{ value: '', disabled: true }]
    });

    // Initialize search form
    this.searchForm = this.fb.group({
      searchDriverId: ['', [Validators.required]]
    });

    // Handle Payment Type Changes
    this.registrationForm.get('paymentType')?.valueChanges.subscribe(paymentType => {
      if (paymentType === 'hourly') {
        this.registrationForm.get('amount')?.setValue('50 USD/hr');
      } else if (paymentType === 'monthly') {
        this.registrationForm.get('amount')?.setValue('2000 USD/month');
      }
    });

    this.loadDrivers();

  }


  

  loadDrivers() {
    this.loading = true;

    // Update query params with current pagination state
    this.queryParams.pageNumber = this.paginator?.pageIndex + 1 || 1;
    this.queryParams.pageSize = this.paginator?.pageSize || 10;

    this.driverService.searchDrivers(this.queryParams).subscribe({
      next: (response) => {
        this.dataSource = response.data;
        this.totalItems = response.totalItems;
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading drivers', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.queryParams.keyword = filterValue.trim().toLowerCase();
    this.paginator.firstPage();
    console.log(event);
    
    this.loadDrivers();
  }


  // Submit Registration Form
  onSubmit() {
    if (this.registrationForm.valid && !this.driverIdExists) {
      this.setdDriverId();
      const formData: CreateDriverDTO = {
        ...this.registrationForm.value,
      };

      if (this.authService.isDriver()) {
        this.driverService.createDriver(formData).subscribe({
          next: () => {
            this.snackBar.open('Driver created successfully', 'Close', { duration: 3000 });
            this.loadDrivers();
            this.registrationForm.reset();

          },
          error: (error) => {
            this.snackBar.open(error.message || 'Error creating driver', 'Close', { duration: 3000 });
          }
        });
      }
      else {
        this.showError("You are not logined or your role not driver");
      }

    } else {
      console.log('Form is invalid or Driver ID already exists');
    }
  }

  setdDriverId() {
    const userId = this.authService.getCurrentUserId(); 
    if (userId) {
      console.log(this.authService.isDriver());
      
      if(this.authService.isDriver()){
        this.registrationForm.patchValue({ userId: userId }); // Set companyId in the form
      }
      
    }
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  onPageChange(event: any) {
    this.queryParams.pageNumber = event.pageIndex + 1;
    this.queryParams.pageSize = event.pageSize;
    this.loadDrivers();
  }
}
