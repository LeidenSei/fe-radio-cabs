import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserRegistrationComponent } from './pages/user-registration/user-registration.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: HomePageComponent }, // Default route for HomeModule
  { path: 'register', component: UserRegistrationComponent }, // Route for user registration
  { path: 'login', component: LoginComponent }, // Route for user registration
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
