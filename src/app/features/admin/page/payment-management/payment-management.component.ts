// payment-management.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog.component';
import { Payment, SearchPaymentFilter } from 'src/app/core/services/payment';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.scss']
})
export class PaymentManagementComponent implements OnInit {
  payments: Payment[] = [];
  selectedPayment: Payment | null = null;
  loading = false;
  totalItems = 0;
  currentPage = 1;
  pageSize = 10;
  
  searchForm: FormGroup;
  editForm: FormGroup;
  
  displayedColumns: string[] = [
    'id', 
    'userId', 
    'planId', 
    'amount', 
    'paymentDate', 
    'paymentStatus',
    'paymentType',
    'validFrom',
    'validTo',
    'actions'
  ];

  constructor(
    public  paymentService: PaymentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.searchForm = this.fb.group({
      userId: [''],
      planId: [''],
      paymentStatus: [''],
      paymentType: [''],
      startDate: [''],
      endDate: ['']
    });

    this.editForm = this.fb.group({
      userId: ['', Validators.required],
      planId: ['', Validators.required],
      paymentStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(page: number = 1): void {
    this.loading = true;
    const filter: SearchPaymentFilter = {
      ...this.searchForm.value,
      page: page,
      pageSize: this.pageSize
    };

    this.paymentService.searchPayments(filter)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.payments = response.items;
          this.totalItems = response.totalItems;
          this.currentPage = page;
        },
        error: (error) => {
          this.showError('Error loading payments: ' + error.message);
        }
      });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadPayments();
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.loadPayments();
  }

  editPayment(payment: Payment): void {
    this.selectedPayment = payment;
    this.editForm.patchValue({
      userId: payment.userId,
      planId: payment.planId,
      paymentStatus: payment.paymentStatus
    });
  }

  cancelEdit(): void {
    this.selectedPayment = null;
    this.editForm.reset();
  }

  savePayment(): void {
    if (this.editForm.invalid || !this.selectedPayment) {
      return;
    }

    this.loading = true;
    this.paymentService.updatePayment(this.selectedPayment.id, this.editForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.showSuccess('Payment updated successfully');
          this.loadPayments(this.currentPage);
          this.cancelEdit();
        },
        error: (error) => {
          this.showError('Error updating payment: ' + error.message);
        }
      });
  }

  deletePayment(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { title: 'Confirm Delete', message: 'Are you sure you want to delete this payment?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.paymentService.deletePayment(id)
          .pipe(finalize(() => this.loading = false))
          .subscribe({
            next: () => {
              this.showSuccess('Payment deleted successfully');
              this.loadPayments(this.currentPage);
            },
            error: (error) => {
              this.showError('Error deleting payment: ' + error.message);
            }
          });
      }
    });
  }

  onPageChange(page: number): void {
    this.loadPayments(page);
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
  }
}
