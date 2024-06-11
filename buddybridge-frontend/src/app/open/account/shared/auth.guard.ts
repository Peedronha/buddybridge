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

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const result = await this.accountService.validarSessao();
    if (result) {
      return true;
    } else {
      var solicitarToken = window.localStorage.getItem('validarEmail') + '';
      if(solicitarToken == 'true'){
        this.router.navigate(['/validatelogin']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }
  }

}
