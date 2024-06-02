import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {TipoService} from "../service/tipo.service";
import {Tipo} from "../model/tipo.model";
import {Raca} from "../../raca/model/raca.model";
export const racaResolverGuard: CanActivateFn = (route, state) => {
  return true;
};

@Injectable({
  providedIn: 'root'
})
export class tipoResolver{

  constructor(private service: TipoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tipo> {
    if (route.params && route.params['id']) {
      return this.service.getTiposById(route.params['id']);
    }
    return of({
      id: parseInt(''),
      name: '',
      // races: [],
    });
  }
}
