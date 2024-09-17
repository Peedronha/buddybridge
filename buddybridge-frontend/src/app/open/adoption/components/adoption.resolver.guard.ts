import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {AdoptionService} from "../../../restrict/base/adoption-profile/shared/adoption.service";
import {Observable, of} from "rxjs";
import {AdoptionProfileModel} from "../../../restrict/base/adoption-profile/model/AdoptionProfileModel";
import {AdoptionFormModel} from "../models/AdoptionFormModel";
import {booleanAttribute, Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class AdoptionManagementResolver{

  constructor(private service: AdoptionService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdoptionFormModel> {
    if (route.params && route.params['id']) {
      return this.service.getAdoptionsById(route.params['id']);
    }
    return of({
      id_perfil_adocao: parseInt(''),
      id_adocao: parseInt(''),
      id_animal: '',
      nome_adotante:'',
      data_nascimento:'',
      telefone:'',
      email:'',
      idade: '',
      data_criacao: '',
      status_adocao: '',
      data_submissao: '',
      priority: '',
      medical_necessities: '',
      image: '',
      endereco: '',
      CEP: '',
      numero: '',
      Complemento: '',
      Bairro: '',
      Estado: '',
      Cidade: '',
      CPF: '',
      observacoes:'',
      alergias: booleanAttribute(''),
      animaisAntes: booleanAttribute(''),
      horasFora: parseInt(''),
      quintalSeguro: booleanAttribute(''),
      cuidadosMedicos: booleanAttribute(''),
      motivoAdocao: '',
    });
  }
}
