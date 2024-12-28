import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaymentPlanService } from 'src/app/core/services/payment-plan.service';
import { PaymentPlan, CreatePaymentPlanDTO, UpdatePaymentPlanDTO } from 'src/app/models/payment-plan';
import { ConfirmDialog } from 'src/app/shared/confirm-dialog.component';

@Component({
  selector: 'app-payment-plans',
  templateUrl: './payment-plans.component.html',
  styleUrls: ['./payment-plans.component.scss']
})
export class PaymentPlansComponent implements OnInit {
  paymentPlans: PaymentPlan[] = [];
  displayedColumns: string[] = ['id', 'amount', 'duration', 'planType', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<PaymentPlan>(this.paymentPlans);

  searchForm: FormGroup;
  editForm: FormGroup;
  isEditing = false;
  selectedPlan: PaymentPlan | null = null;

  constructor(
    private paymentPlanService: PaymentPlanService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.searchForm = this.fb.group({
      planType: [''],
      duration: ['']
    });

    this.editForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      duration: ['', Validators.required],
      planType: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.loadPaymentPlans();
  }

  loadPaymentPlans(): void {
    const filter = this.searchForm.value;
    this.paymentPlanService.searchPaymentPlans(filter).subscribe({
      next: (response) => {
        this.paymentPlans = response.items || [];
        this.dataSource.data = this.paymentPlans;
      },
      error: (error) => {
        this.snackBar.open('Failed to load payment plans', 'Close', { duration: 3000 });
      }
    });
  }

  onSearch(): void {
    this.loadPaymentPlans();
  }

  resetSearch(): void {
    this.searchForm.reset();
    this.loadPaymentPlans();
  }

  editPaymentPlan(plan: PaymentPlan): void {
    this.selectedPlan = plan;
    this.editForm.patchValue(plan);
    this.isEditing = true;
  }

  savePaymentPlan(): void {
    if (this.editForm.invalid) {
      return;
    }

    const planData: UpdatePaymentPlanDTO = this.editForm.value;

    if (this.isEditing && this.selectedPlan) {
      this.paymentPlanService.updatePaymentPlan(this.selectedPlan.id, planData).subscribe({
        next: () => {
          this.snackBar.open('Payment plan updated successfully', 'Close', { duration: 3000 });
          this.loadPaymentPlans();
          this.cancelEdit();
        },
        error: () => {
          this.snackBar.open('Failed to update payment plan', 'Close', { duration: 3000 });
        }
      });
    } else {
      const newPlan: CreatePaymentPlanDTO = planData;
      this.paymentPlanService.createPaymentPlan(newPlan).subscribe({
        next: () => {
          this.snackBar.open('Payment plan created successfully', 'Close', { duration: 3000 });
          this.loadPaymentPlans();
        },
        error: () => {
          this.snackBar.open('Failed to create payment plan', 'Close', { duration: 3000 });
        }
      });
    }
  }

  deletePaymentPlan(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: { title: 'Delete Payment Plan', message: 'Are you sure you want to delete this plan?' }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.paymentPlanService.deletePaymentPlan(id).subscribe({
          next: () => {
            this.snackBar.open('Payment plan deleted successfully', 'Close', { duration: 3000 });
            this.loadPaymentPlans();
          },
          error: () => {
            this.snackBar.open('Failed to delete payment plan', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedPlan = null;
    this.editForm.reset();
  }
}
