import {Volunteer} from "../../volunteer/model/volunteer.model";
import { Injectable } from '@angular/core';
import {AnimalService} from "../service/animal.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {Animal} from "../model/animal";
@Injectable({
  providedIn: 'root'
})
export class animalResolver{

  constructor(private service: AnimalService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Animal> {
    if (route.params && route.params['id']) {
      return this.service.getAnimalsById(route.params['id']);
    }
    return of({
      id_animal: parseFloat(''),
      nome_animal: '',
      raca: '',
      idade: '',
      peso_animal: '',
      comprimento_animal: '',
      data_resgate: ''
    });
  }
}
