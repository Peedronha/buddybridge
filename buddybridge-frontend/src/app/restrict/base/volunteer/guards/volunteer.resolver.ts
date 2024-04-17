import { VolunteerService } from '../shared/volunteer.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../../../../open/account/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class volunteerResolver {

  constructor(private service: VolunteerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    if (route.params && route.params['id']) {
      return this.service.getVolunteer(route.params['id']);
    }
    return of({id: undefined, nome: '', login: '', senha: '', role: '', confirmacaoEmail: false, token: '', telefone: '', usuarioIdendereco: undefined, usuarioIdvoluntario: undefined});
  }

};
