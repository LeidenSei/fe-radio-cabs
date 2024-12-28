import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { CreateFeedbackDTO, Feedback } from 'src/app/models/feedback';

@Component({
  selector: 'app-feedback-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title>{{data ? 'Edit' : 'Create'}} Feedback</h2>
      
      <form [formGroup]="feedbackForm" class="feedback-form">
        <div mat-dialog-content>
          <div class="grid grid-cols-2 gap-4">
            <!-- Name Field -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" required>
              <mat-error *ngIf="feedbackForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>

            <!-- Email Field -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" required type="email">
              <mat-error *ngIf="feedbackForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="feedbackForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <!-- Mobile Field -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Mobile</mat-label>
              <input matInput formControlName="mobile" required>
              <mat-error *ngIf="feedbackForm.get('mobile')?.hasError('required')">
                Mobile number is required
              </mat-error>
            </mat-form-field>

            <!-- City Field -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>City</mat-label>
              <input matInput formControlName="city" required>
              <mat-error *ngIf="feedbackForm.get('city')?.hasError('required')">
                City is required
              </mat-error>
            </mat-form-field>

            <!-- Feedback Type Field -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Feedback Type</mat-label>
              <mat-select formControlName="feedbackType" required>
                <mat-option value="COMPLAINT">Complaint</mat-option>
                <mat-option value="SUGGESTION">Suggestion</mat-option>
                <mat-option value="APPRECIATION">Appreciation</mat-option>
              </mat-select>
              <mat-error *ngIf="feedbackForm.get('feedbackType')?.hasError('required')">
                Feedback type is required
              </mat-error>
            </mat-form-field>

            <!-- Image Upload -->
            <div class="w-full">
              <button 
                type="button" 
                mat-stroked-button 
                color="primary" 
                (click)="fileInput.click()"
                class="w-full h-14"
              >
                <mat-icon>cloud_upload</mat-icon>
                {{selectedFile ? selectedFile.name : 'Upload Image'}}
              </button>
              <input
                #fileInput
                type="file"
                hidden
                (change)="onFileSelected($event)"
                accept="image/*"
              >
            </div>

            <!-- Description Field - Full Width -->
            <mat-form-field appearance="outline" class="w-full col-span-2">
              <mat-label>Description</mat-label>
              <textarea 
                matInput 
                formControlName="description" 
                required
                rows="4"
              ></textarea>
              <mat-error *ngIf="feedbackForm.get('description')?.hasError('required')">
                Description is required
              </mat-error>
            </mat-form-field>
          </div>
        </div>

        <div mat-dialog-actions align="end" class="mt-4">
          <button 
            mat-button 
            type="button"
            (click)="onCancel()"
          >
            Cancel
          </button>
          <button 
            mat-raised-button 
            color="primary"
            [disabled]="!feedbackForm.valid || isSubmitting"
            (click)="onSubmit()"
          >
            {{isSubmitting ? 'Saving...' : 'Save'}}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 16px;
      max-width: 800px;
    }
    .feedback-form {
      padding-top: 16px;
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class FeedbackDialogComponent implements OnInit {
  feedbackForm: FormGroup;
  selectedFile: File | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Feedback | null
  ) {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      city: ['', [Validators.required]],
      feedbackType: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.feedbackForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        mobile: this.data.mobile,
        city: this.data.city,
        feedbackType: this.data.feedbackType,
        description: this.data.description
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      this.isSubmitting = true;
      
      const feedbackData: CreateFeedbackDTO = {
        ...this.feedbackForm.value,
        images: this.selectedFile ? [this.selectedFile] : []
      };

      const request = this.data
        ? this.feedbackService.updateFeedback(this.data.id, feedbackData)
        : this.feedbackService.createFeedback(feedbackData);

      request.subscribe({
        next: (response) => {
          this.showSnackBar(
            `Feedback successfully ${this.data ? 'updated' : 'created'}`,
            'success'
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.showSnackBar(
            `Failed to ${this.data ? 'update' : 'create'} feedback`,
            'error'
          );
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  private showSnackBar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: type === 'error' ? ['error-snackbar'] : ['success-snackbar']
    });
  }
}