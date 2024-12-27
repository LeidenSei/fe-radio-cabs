import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.adminLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.loadStyles();
    this.loadScripts();
  }

  get email() { return this.adminLoginForm.get('email'); }
  get password() { return this.adminLoginForm.get('password'); }

  onSubmit() {
    if (this.adminLoginForm.valid) {
      this.authService.login(this.adminLoginForm.value).subscribe({
        next: (response) => {
          const decodedToken = this.authService.decodeToken(response.token);
          if (decodedToken.role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.errorMessage = 'Access denied';
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.errors?.[0] || 'Login failed';
        }
      });
    }
  }
  private loadStyles() {
    const styles = [
      'assets/admin-assets/css/style.css'
    ];

    styles.forEach(style => {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'stylesheet');
      this.renderer.setAttribute(link, 'href', style);
      this.renderer.appendChild(document.head, link);
    });
  }

  private async loadScripts() {
    // Load vendors first
    await this.loadScript('assets/admin-assets/js/vendors.min.js');
    
    // Then load ApexCharts
    await this.loadScript('assets/admin-assets/vendors/apexcharts/apexcharts.js');
    
    // Then load app.min.js
    await this.loadScript('assets/admin-assets/js/app.min.js');
    
    // Finally load dashboard script
    await this.loadScript('assets/admin-assets/js/pages/project-dashboard.js');
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      this.renderer.appendChild(document.body, script);
    });
  }

  ngOnDestroy() {
    // Remove admin layout specific styles and scripts when component is destroyed
    const head = document.getElementsByTagName('head')[0];
    const body = document.getElementsByTagName('body')[0];
    
    // Remove styles
    const styles = document.querySelectorAll('link[href*="admin-assets"]');
    styles.forEach(style => head.removeChild(style));
    
    // Remove scripts
    const scripts = document.querySelectorAll('script[src*="admin-assets"]');
    scripts.forEach(script => body.removeChild(script));
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}