import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DriversComponent } from './pages/drivers/drivers.component';
import { AdvertisementComponent } from './pages/advertisement/advertisement.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    HomePageComponent,
    UserRegistrationComponent,
    DriversComponent,
    AdvertisementComponent,
    FeedbackComponent,
    LoginComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatCardModule,
    MatSelectModule,
    HomeRoutingModule,
    MatButtonModule,
    MatIconModule  // Added this for mat-icon support
  ],
  exports: [
    HomePageComponent,
    UserRegistrationComponent,
    // Consider exporting material modules if needed by other modules
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HomeModule { }