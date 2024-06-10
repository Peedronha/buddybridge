import { Observable, Subscription } from 'rxjs';
import { AccountService } from './account.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

import { audit } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.accountService.validarSessao();
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
