import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {RacaService} from "../service/raca.service";
import {Raca} from "../model/raca.model";
import {Tipo} from "../../tipo_animal/model/tipo.model";

export const racaResolverGuard: CanActivateFn = (route, state) => {
  return true;
};

@Injectable({
  providedIn: 'root'
})
export class racaResolver{

  constructor(private service: RacaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Raca> {
    if (route.params && route.params['id']) {
      return this.service.getRacasById(route.params['id']);
    }
    return of({
      id: parseInt(''),
      name: '',
      id_tipo: '',
    });
  }
}
