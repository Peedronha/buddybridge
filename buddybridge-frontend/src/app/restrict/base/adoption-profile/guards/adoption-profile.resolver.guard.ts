import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {AdoptionService} from "../shared/adoption.service";
import {AdoptionProfileModel, AdoptionStatus} from "../model/AdoptionProfileModel";

@Injectable({
  providedIn: 'root'
})
export class adoptionProfileResolver {

  constructor(private service: AdoptionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdoptionProfileModel> {
    if (route.params && route.params['id']) {
      return this.service.getAdoptionsProfileById(route.params['id']);
    }
    return of({
      id_perfil_adocao: '',
      id_adocao: '',
      id_animal: '',
      idade: '',
      data_criacao: '',
      status_adocao: '',
      data_submissao: '',
      priority: '',
      medical_necessities: '',
      image: '',
    });
  }

}
