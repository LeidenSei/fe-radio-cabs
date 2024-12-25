import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { DriversComponent } from './features/home/pages/drivers/drivers.component';
import { AdvertisementComponent } from './features/home/pages/advertisement/advertisement.component';
import { FeedbackComponent } from './features/home/pages/feedback/feedback.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
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
        component: DriversComponent
      },
      {
        path: 'advertisement',
        component: AdvertisementComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
        // canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }