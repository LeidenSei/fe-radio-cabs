import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Confirm</h2>
    <div mat-dialog-content>{{data.message}}</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button (click)="onYesClick()" cdkFocusInitial>Yes</button>
    </div>
  `
})
export class ConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {message: string}
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}