import { Component, OnInit, Renderer2 } from '@angular/core';
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
    private router: Router,
    private renderer: Renderer2
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          const decodedToken = this.authService.decodeToken(response.token);
          const role =decodedToken.role;
          if (role === 'ADMIN') {

            this.router.navigate(['/admin/dashboard']);
          } else if(role=='COMPANY' || role=='DRIVER' || role=='ADVERTISE' || role=='USER') {
              // Store the token in localStorage (or sessionStorage if preferred)
            this.router.navigate(['']);
          }else {
            this.errorMessage = 'Access denied';
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.errors?.[0] || 'Login failed';
        }
      });
    }
  }

  ngOnDestroy() {
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
