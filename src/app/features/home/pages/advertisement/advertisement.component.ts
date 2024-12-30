import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdvertiseService } from 'src/app/core/services/advertise.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CreateAdvertiseDTO } from 'src/app/models/advertise';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  registrationForm: FormGroup;
  amount: string = '';

  constructor(
    private fb: FormBuilder,
    private advertiseService: AdvertiseService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      designation: ['', Validators.required],
      companyId: [null],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      paymentType: ['', Validators.required],
      amount: [{ value: '', disabled: true }],
      isActive: true
    });

    this.onPaymentTypeChange();
  }
  resetForm() {
    this.registrationForm.reset();
  }
  // Dynamically update the amount field based on payment type
  onPaymentTypeChange() {
    this.registrationForm.get('paymentType')?.valueChanges.subscribe(value => {
      const amountField = this.registrationForm.get('amount');
      if (value) {
        switch (value) {
          case 'credit':
            this.amount = '100 USD';
            break;
          case 'debit':
            this.amount = '50 USD';
            break;
          case 'paypal':
            this.amount = '75 USD';
            break;
          default:
            this.amount = '';
            break;
        }
        amountField?.setValue(this.amount);
      } else {
        amountField?.setValue('');
      }
    });
  }

  // Submit the form
 onSubmit() {
    if (this.registrationForm.valid) {
      this.setCompanyId();
      const formData: CreateAdvertiseDTO = {
        ...this.registrationForm.value,
      };

      this.advertiseService.addAdvertise(formData).subscribe({
        next: () => {
          this.showSuccess('Thêm quảng cáo thành công');
          this.resetForm();
        },
        error: (error) => {
          if (error.error === "Company is not existed") {
            this.showError('You cant register advertise without role company');
          } else {
            this.showError('Internal server');
          }
        }
      });
    }
  }
  //role company will asign to advertise
  setCompanyId() {
    const userId = this.authService.getCurrentUserId(); 
    if (userId) {
      console.log(this.authService.isCompany());
      
      if(this.authService.isCompany()){
        this.registrationForm.patchValue({ companyId: userId }); // Set companyId in the form
      }
      
    }
  }
  private showSuccess(message: string) {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}
