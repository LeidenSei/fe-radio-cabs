import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { DriversComponent } from './pages/drivers/drivers.component';
import { AdvertisementComponent } from './pages/advertisement/advertisement.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ListingPageComponent } from '../listing/pages/listing-page/listing-page.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Default route for HomeModule
  { path: 'register', component: UserRegistrationComponent }, // Route for user registration
  { path: 'driver', component: DriversComponent }, // Route for user registration
  { path: 'driver', component: DriversComponent }, // Route for user registration
  { path: 'listing', component: ListingPageComponent }, // Route for user registration
  { path: 'advertise', component: AdvertisementComponent }, // Route for user registration
  { path: 'feedback', component: FeedbackComponent }, // Route for user registration
  { path: 'login', component: LoginComponent }, // Route for user registration
  { path: 'about', component: AboutComponent }, // Route for user registration
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
