// src/app/core/guards/admin.guard.ts
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

// src/app/core/guards/admin.guard.ts
@Injectable({
    providedIn: 'root'
  })
  export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
      const token = localStorage.getItem('currentUser');
      if (!token) {
        this.router.navigate(['/admin/login']);
        return false;
      }
  
      const user = JSON.parse(token);
      const decodedToken = this.decodeJWT(user.token);
  
      if (decodedToken?.role === 'ADMIN') {
        return true;
      }
  
      this.router.navigate(['/admin/login']);
      return false;
    }
  
    private decodeJWT(token: string): any {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch {
        return null;
      }
    }
  }