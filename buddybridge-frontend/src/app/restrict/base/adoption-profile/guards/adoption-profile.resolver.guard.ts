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
      id_adocao: parseInt(''), // This would result in NaN, likely needs correction
      id_animal: parseInt(''),
      nome_adotante: '',
      endereco: '',
      telefone: '',
      email: '',
      descricao_experiencia: '',
      status: '' as AdoptionStatus, // You can cast an empty string to AdoptionStatus, but this needs correction
      data_submissao: '',
      priority: '', // Assuming priority is a string
      medical_necessities: '', // Assuming medical_necessities is a string
      image: '', // Assuming image is a string (URL or path)
    });
  }
}
