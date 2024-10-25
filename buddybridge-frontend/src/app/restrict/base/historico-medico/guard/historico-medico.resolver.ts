// import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
// import {Observable, of} from "rxjs";
// import {HistoricoMedicoService} from "../service/historico-medico.service";
// import {HistoricoMedico} from "../model/historico-medico";
// import {Injectable} from "@angular/core";
// @Injectable({
//   providedIn: 'root'
// })
// export class historicoMedicoResolver {
//
//   constructor(private service: HistoricoMedicoService) {
//   }
//
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HistoricoMedico[]> {
//     if (route.params && route.params['id']) {
//       return this.service.getMedicalReportById(route.params['id']);
//     }
//
//     // return of({
//     //   id: parseInt(''),
//     //   animalId: parseInt(''),
//     //   date: '',
//     //   description: '',
//     //   type: '',
//     //   doctor: '',
//     //   notes: '',
//     //   returnDate: ''
//     // });
//   }
// }
