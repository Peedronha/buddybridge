import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {AdoptionService} from "../shared/adoption.service";
import {AdoptionModel} from "../model/AdoptionModel";

@Injectable({
  providedIn: 'root'
})
export class adoptionResolver {

  constructor(private service: AdoptionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdoptionModel> {
    if (route.params && route.params['id']) {
      return this.service.getAdoptionsById(route.params['id']);
    }
    return of({
      id_adocao: parseInt(''),
      id_animal: parseInt(''),
      nome_adotante: '',
      endereco: '',
      telefone: '',
      email: '',
      descricao_experiencia: '',
      status_adocao: '',
      data_submissao: '',
    });
  }
}
