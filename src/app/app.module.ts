import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';

import { AppComponent } from './app.component';
import { AdminLayoutModule } from './layout/admin-layout/admin-layout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AdminLayoutModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }