import { GrupoacessoserviceService } from './../service/grupoacessoservice.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GrupoAcessoDTO } from '../model/grupoacessoDTO';

@Injectable({
  providedIn: 'root'
})
export class grupoacessoResolver {

  constructor(private service: GrupoacessoserviceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GrupoAcessoDTO> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({
      idGrupoAcesso: undefined,
      descricaoGrupoAcesso: '',
      ativoGrupoAcesso: true,
      acessos: []
    });
  }

}
