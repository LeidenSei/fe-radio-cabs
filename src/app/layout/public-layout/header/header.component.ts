import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  name:string;
  userInfoSubscription: Subscription | null = null;
  constructor(private router: Router, private authService: AuthService) {


   }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
  ngOnInit() {
    this.userInfoSubscription = this.authService.userInfo$.subscribe((userInfo) => {
      // this.name = userInfo;
      this.getUserInfo();
      console.log('User info updated:', this.name);
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  getUserInfo(): any {
    const userInfo = this.authService.getCurrentEmail();

    if (userInfo != null) {
      this.name = userInfo;
      console.log('vao day', this.name);

    }
  }
  logout():any {
    this.authService.logout();
    this.router.navigate(['/login'])
    this.name = null;
  }
}