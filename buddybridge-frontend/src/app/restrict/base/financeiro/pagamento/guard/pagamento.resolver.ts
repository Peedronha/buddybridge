import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Pagamento } from '../model/pagamento';
import { PagamentoService } from '../service/pagamento.service';

@Injectable({
  providedIn: 'root'
})
export class PagamentoResolver implements Resolve<Pagamento> {

  constructor(private pagamentoService: PagamentoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Pagamento> {
    const id = route.params['id'];
    if (id) {
      return this.pagamentoService.getPagamentoById(id);
    }
    return of(new Pagamento());  // returns a new blank instance if there's no ID
  }
}
