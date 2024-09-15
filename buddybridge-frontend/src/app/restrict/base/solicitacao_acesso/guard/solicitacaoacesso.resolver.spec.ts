import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SolicitacaoacessoService } from './../service/solicitacaoacesso.service';
import { Solicitacaoacesso } from '../model/solicitacaoacesso';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoacessoResolver implements Resolve<Solicitacaoacesso> {

  constructor(private service: SolicitacaoacessoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Solicitacaoacesso> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({
      idsolicitacaoAcesso: undefined,
      grupoAcessoAcessoObejto: {
        idGrupoAcesso: undefined,
        descricaoGrupoAcesso: '',
        ativoGrupoAcesso: true,
        acessos: []
      },
      acessoAcessoObjeto: {
        idAcesso: 0,
        moduloAcesso: '',
        telaAcesso: '',
        descricaoAcesso: '',
        ativoAcesso: true
      },
      delegadoSolicitacaoAcesso: false // Novo campo adicionado com valor padrão
    });
  }
}
