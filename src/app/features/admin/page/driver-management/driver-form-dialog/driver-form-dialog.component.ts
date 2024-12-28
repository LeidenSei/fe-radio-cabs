// driver-form-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Driver } from 'src/app/models/driver';

@Component({
  selector: 'app-driver-form-dialog',
  templateUrl: './driver-form-dialog.component.html',
  styleUrls: ['./driver-form-dialog.component.scss']
})
export class DriverFormDialogComponent implements OnInit {
  driverForm: FormGroup;
  imagePreview: string | null = null;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DriverFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Driver
  ) {
    this.isEditMode = !!data?.id;
    this.driverForm = this.fb.group({
      userId: [data?.userId || null, Validators.required],
      driverName: [data?.driverName || '', Validators.required],
      contactPerson: [data?.contactPerson || ''],
      address: [data?.address || ''],
      city: [data?.city || ''],
      mobile: [data?.mobile || '', [Validators.pattern('^[0-9]{10}$')]],
      telephone: [data?.telephone || ''],
      email: [data?.email || '', [Validators.required, Validators.email]],
      experience: [data?.experience || 0, [Validators.required, Validators.min(0)]],
      description: [data?.description || ''],
      isActive: [data?.isActive !== undefined ? data.isActive : true],
      images: [null]
    });
  }

  ngOnInit() {
    if (this.data?.images) {
      this.imagePreview = this.data.images;
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.driverForm.patchValue({ images: file });
      
      // Preview image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.driverForm.valid) {
      const formData = { ...this.driverForm.value };
      this.dialogRef.close(formData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}