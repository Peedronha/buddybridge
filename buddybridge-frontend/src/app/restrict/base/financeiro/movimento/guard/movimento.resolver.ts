import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Movimentacao } from '../model/movimentacao';
import { MovimentacaoService } from '../service/movimento.service';


@Injectable({
  providedIn: 'root'
})
export class MovimentacaoResolver implements Resolve<Movimentacao> {

  constructor(private service: MovimentacaoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Movimentacao> {
    if (route.params && route.params['id']) {
      return this.service.getMovimentacaoById(route.params['id']);
    }
    return of({
      idMovimentacao: undefined,
      historico: '',
      dataLancamento: new Date(),
      classificacao: undefined,
      valor: 0,
      observacoes: '',
      valorPendente: 0
    });
  }
}
