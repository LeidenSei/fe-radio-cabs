// shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatDialogModule,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions 
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialog } from './confirm-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialog
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions
  ],
  exports: [
    ConfirmDialog,
    MatDialogModule
  ]
})
export class SharedModule { }