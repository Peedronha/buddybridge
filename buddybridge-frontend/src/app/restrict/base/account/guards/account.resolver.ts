import { AccountRestrictService } from '../shared/account-restrict.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../../../../open/account/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class accountResolver {

  constructor(private service: AccountRestrictService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({id: undefined, nome: '', login: '', senha: '', role: '', confirmacaoEmail: false, token: '', telefone: '',
       usuarioIdendereco: undefined, usuarioIdvoluntario: undefined});
  }

};
