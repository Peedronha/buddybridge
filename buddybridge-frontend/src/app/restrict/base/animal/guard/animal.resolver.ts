import { Injectable } from '@angular/core';
import {AnimalService} from "../service/animal.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {AnimalModel} from "../model/animal.model";
@Injectable({
  providedIn: 'root'
})
export class animalResolver{

  constructor(private service: AnimalService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AnimalModel> {
    if (route.params && route.params['id']) {
      return this.service.getAnimalsById(route.params['id']);
    }
    return of({
      id_animal: parseInt(''),
      nome_animal: '',
      raca: '',
      idade: '',
      peso_animal: '',
      comprimento_animal: '',
      data_resgate: '',
      data_nascimento: '',
      tipo_animal: '',
      raca_animal: '',
      caracteristicas_animal: '',
      localizacao_animal:'',
      genero:'',
    });
  }
}
