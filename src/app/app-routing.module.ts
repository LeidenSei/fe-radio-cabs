import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AdminLoginComponent } from './features/admin/page/admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent, // Parent layout
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
      },
    ],
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    data: { preload: true }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }