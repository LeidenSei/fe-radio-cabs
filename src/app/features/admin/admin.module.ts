// src/app/features/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';  // Add this import

// Component Imports
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { CompanyManagementComponent } from './page/company-management/company-management.component';
import { DriverManagementComponent } from './page/driver-management/driver-management.component';
import { AdvertiseManagementComponent } from './page/advertise-management/advertise-management.component';
import { FeedbackManagementComponent } from './page/feedback-management/feedback-management.component';
import { PaymentManagementComponent } from './page/payment-management/payment-management.component';
import { PaymentPlansComponent } from './page/payment-plans/payment-plans.component';
import { UserManagementComponent } from './page/user-management/user-management.component';
import { RoleManagementComponent } from './page/role-management/role-management.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'company',
        component: CompanyManagementComponent
      }
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
    RoleManagementComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    // Material Modules
    MatFormFieldModule,
    MatInputModule,
    MatCardModule  // Add this module
  ]
})
export class AdminModule { }