import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Classificacao } from '../model/classificacao';
import { ClassificacaoService } from '../service/classificacao.service';

@Injectable({
  providedIn: 'root'
})
export class ClassificacaoResolver implements Resolve<Classificacao> {

  constructor(private service: ClassificacaoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Classificacao> {
    if (route.params && route.params['id']) {
      return this.service.getClassificacaoById(route.params['id']);
    }
    return of({
      idClassificacao: undefined,
      descricaoClassificacao: '',
      ativoClassificacao: true,
      tipo: ''
    });
  }
}
