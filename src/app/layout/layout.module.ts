import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './public-layout/header/header.component';
import { MainComponent } from './public-layout/main/main.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { AdminLayoutModule } from './admin-layout/admin-layout.module';
import { FooterComponent } from './public-layout/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PublicLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, // Cần cho routerLink
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent
  ]
})
export class LayoutModule { }