import { Auth } from './../model/auth.model';
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
    console.log('validando sessão');
    this.accountService.validarSessao();
    const token = window.localStorage.getItem('token');
    if (token) {
      console.log('true');
      return true;
    } else {
      console.log('not true');
      return false;
    }
  }

}
