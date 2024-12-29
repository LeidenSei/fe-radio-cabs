import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const header = document.querySelector('.site-header') as HTMLElement;
    if (header) {
      const headerHeight = header.offsetHeight;
      document.querySelector('.login-page')?.setAttribute(
        'style',
        `padding-top: ${headerHeight-200}px`
      );
    }
    this.checkIfAlreadyLoggedIn();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          const decodedToken = this.authService.decodeToken(response.token);

          // Check if the user is ADMIN
          if (decodedToken.role === 'ADMIN') {
            this.errorMessage = 'Admin accounts are not allowed to log in.';
            this.isLoading = false;
          } else {
            // Store token and navigate
            this.authService.storeToken(response.token);
            this.router.navigate(['/user/dashboard']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.errors?.[0] || 'Login failed';
          this.isLoading = false;
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  checkIfAlreadyLoggedIn() {
    const token = this.authService.getToken();
    
    if (token) {
      const decodedToken = this.authService.decodeToken(token);
  
      // Check if the logged-in user is ADMIN
      if (decodedToken.role === 'ADMIN') {
        this.authService.logout();
        alert('You are logged in as ADMIN. Please log out and try again.');
      } else {
        // Non-ADMIN user already logged in
        const confirmLogout = confirm('You are already logged in. Do you want to log out?');
        if (confirmLogout) {
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/']);
        }
      }
    }
    // If no token exists, allow normal login
  }
  
}
