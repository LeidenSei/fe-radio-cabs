// src/app/features/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component:DashboardComponent
  },
  // {
  //   path: 'project',
  //   loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)
  // },
  // {
  //   path: 'crm',
  //   loadChildren: () => import('./crm/crm.module').then(m => m.CrmModule)
  // },
  // {
  //   path: 'sales',
  //   loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule)
  // },
  // {
  //   path: 'settings',
  //   loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  // }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }