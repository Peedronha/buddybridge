import { VolunteerService } from '../service/volunteer.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../../../../open/account/model/user.model';
import {Volunteer} from "../model/volunteer.model";

@Injectable({
  providedIn: 'root'
})
export class volunteerResolver {

  constructor(private service: VolunteerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Volunteer> {
    if (route.params && route.params['id']) {
      return this.service.getVolunteersById(route.params['id']);
    }
    return of({
      idvoluntario: parseFloat(''),
      nome_voluntario: '',
      cpf_voluntario: '',
      cnpj_voluntario:'',
      cargo_voluntario: '',
      descricao_atividades_voluntario: '',
      email: '',
      pf_pj_voluntario: ''
    });
  }
}
