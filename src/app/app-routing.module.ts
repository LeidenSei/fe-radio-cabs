import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'listing',
    loadChildren: () => import('./features/listing/listing.module').then(m => m.ListingModule)
  },
  {
    path: 'drivers', 
    loadChildren: () => import('./features/drivers/drivers.module').then(m => m.DriversModule)
  },
  {
    path: 'advertisement',
    loadChildren: () => import('./features/advertisement/advertisement.module').then(m => m.AdvertisementModule) 
  },
  {
    path: 'feedback',
    loadChildren: () => import('./features/feedback/feedback.module').then(m => m.FeedbackModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
