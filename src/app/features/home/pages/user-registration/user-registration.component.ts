import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  isSubmitting = false;
  serverError: string | null = null;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private AuthService: AuthService
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      // profileImage: [null]
    });
  }

  ngOnInit(): void {
    const header = document.querySelector('.site-header') as HTMLElement;
    if (header) {
      const headerHeight = header.offsetHeight;
      document.querySelector('.registration-page')?.setAttribute(
        'style',
        `padding-top: ${headerHeight-200}px`
      );
    }
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.registrationForm.patchValue({
      profileImage: file
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
  
      // Gửi dữ liệu form đến backend qua UserService
      const formData = this.registrationForm.value;
      this.AuthService.register(formData).subscribe(
        (response) => {
          console.log('User registered successfully', response);
          this.isSubmitting = false;
        },
        (error) => {
          console.error('Error registering user', error);
          this.isSubmitting = false;
        }
      );
    }
  }
  
}