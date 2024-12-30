import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from 'src/app/core/services/feedback.service';
import { CreateFeedbackDTO } from 'src/app/models/feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  fields = [
    { name: 'name', type: 'text', placeholder: 'Your name' },
    { name: 'email', type: 'email', placeholder: 'Email address' },
    { name: 'mobile', type: 'text', placeholder: 'Phone' },
    { name: 'city', type: 'text', placeholder: 'City' },
  ];
  constructor(
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    
  ) {
   
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      city: [''],
      feedbackType: ['Complaint'],
      description: ['']
    });
  }

    ngOnInit(): void {
    }
  
 
    resetForm(): void {
      this.feedbackForm.reset();
    }

  
    onSubmit(): void {
      if (this.feedbackForm.invalid) {
        console.log('vaod y');
        
        return;
      }
  
      const feedbackData: CreateFeedbackDTO = this.feedbackForm.value;
      this.feedbackService.createFeedback(feedbackData).subscribe({
        next: () => {
          this.snackBar.open('Feedback created successfully', 'Close', { duration: 3000 });
          this.resetForm();
        },
        error: () => {
          this.snackBar.open('Failed to create user', 'Close', { duration: 3000 });
        }
      });
    }
  
  showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'error' ? ['error-snackbar'] : ['success-snackbar']
    });
  }
}
