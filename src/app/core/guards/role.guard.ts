// src/app/core/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserRoles } from '../constants/user-roles';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('currentUser');
    if (!token) {
      this.redirectByRole('');
      return false;
    }

    const user = JSON.parse(token);
    const decodedToken = this.decodeJWT(user.token);
    const role = decodedToken?.role;

    if (this.isValidRole(role)) {
      return true;
    }

    this.redirectByRole(role);
    return false;
  }

  private isValidRole(role: any): boolean {
    return Object.values(UserRoles).includes(role);
  }

  private redirectByRole(role: string) {
    switch(role) {
      case UserRoles.ADMIN:
        this.router.navigate(['/admin/login']);
        break;
      case UserRoles.DRIVER:
        this.router.navigate(['/driver/login']);
        break;
      case UserRoles.COMPANY:
        this.router.navigate(['/company/login']);
        break;
      case UserRoles.ADVERTISE:
        this.router.navigate(['/advertise/login']);
        break;
      default:
        this.router.navigate(['/login']);
    }
  }

  private decodeJWT(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
}