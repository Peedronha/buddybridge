import { VolunteerService } from '../service/volunteer.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Colaborador } from '../model/colaborador';

@Injectable({
  providedIn: 'root'
})
export class volunteerResolver {

  constructor(private service: VolunteerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Colaborador> {
    if (route.params && route.params['id']) {
      return this.service.getVolunteersById(route.params['id']);
    }
    return of({
      idcolaborador: undefined,
      nome_colaborador: '',
      cpf_colaborador: '',
      cnpj_colaborador: '',
      cargo_colaborador: '',
      descricao_atividades_colaborador: '',
      pf_pj_colaborador: '',
      usuarioColaborador: undefined // Adicionando o campo para alinhar com o model
    });
  }
}
