import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminLayoutModule } from './layout/admin-layout/admin-layout.module';
import { PublicLayoutModule } from './layout/public-layout.module';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './features/admin/page/admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicLayoutModule,
    AdminLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }