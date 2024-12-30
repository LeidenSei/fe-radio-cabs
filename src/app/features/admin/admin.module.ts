// src/app/features/admin/admin.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

// Component Imports
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { CompanyManagementComponent } from './page/company-management/company-management.component';
import { DriverManagementComponent } from './page/driver-management/driver-management.component';
import { AdvertiseManagementComponent } from './page/advertise-management/advertise-management.component';
import { FeedbackManagementComponent } from './page/feedback-management/feedback-management.component';
import { PaymentManagementComponent } from './page/payment-management/payment-management.component';
import { PaymentPlansComponent } from './page/payment-plans/payment-plans.component';
import { UserManagementComponent } from './page/user-management/user-management.component';
import { DriverFormDialogComponent } from './page/driver-management/driver-form-dialog/driver-form-dialog.component';
import { FeedbackDialogComponent } from './page/feedback-management/feedback-dialog/feedback-dialog.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CompanyManagementComponent },
      { path: 'company', component: CompanyManagementComponent },
      { path: 'driver', component: DriverManagementComponent, data: { title: 'Driver Management' } },
      { path: 'advertise', component: AdvertiseManagementComponent },
      { path: 'feedback', component: FeedbackManagementComponent },
      { path: 'payment', component: PaymentManagementComponent },
      { path: 'payment-plans', component: PaymentPlansComponent },
      { path: 'users', component: UserManagementComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    CompanyManagementComponent,
    DriverManagementComponent,
    AdvertiseManagementComponent,
    FeedbackManagementComponent,
    PaymentManagementComponent,
    PaymentPlansComponent,
    UserManagementComponent,
    DriverFormDialogComponent,
    FeedbackDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSortModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatCardModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Optional: Add if necessary
})
export class AdminModule { }
