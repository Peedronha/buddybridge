import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContaCaixa } from '../model/contacaixa';
import { ContaCaixaService } from '../service/contacaixa.service';


@Injectable({
  providedIn: 'root'
})
export class ContaCaixaResolver implements Resolve<ContaCaixa> {

  constructor(private service: ContaCaixaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContaCaixa> {
    if (route.params && route.params['id']) {
      return this.service.getContaCaixaById(route.params['id']);
    }
    return of({
      idContaCaixa: undefined,
      descricaoContaCaixa: '',
      tipoContaCaixa: '',
      ativoContaCaixa: true
    });
  }
}
