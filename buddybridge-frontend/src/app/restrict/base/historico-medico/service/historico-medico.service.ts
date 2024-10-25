import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../../../../open/account/shared/token.service";
import {map, Observable} from "rxjs";
import {AnimalModel} from "../../animal/model/animal.model";
import {Raca} from "../../raca/model/raca.model";
import {HistoricoMedico} from "../model/historico-medico";

@Injectable({
  providedIn: 'root'
})
export class HistoricoMedicoService {

  private getAuthorizationToken() {
    const token = this.tokenService.getToken();
    return token;
  }

  private apiUrl = 'http://localhost:8080/animal';

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  getAnimalsById(id: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<any>(this.apiUrl + '/' + id,{headers: reqHeader})
  }

  getAnimals() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<any>(this.apiUrl,{headers: reqHeader})
  }

  deleteAnimal(idUser: any) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.delete<any>(this.apiUrl + '/' +idUser,{headers: reqHeader})
  }

  updateanimal(animal: AnimalModel){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.put<any>(this.apiUrl, animal, {headers: reqHeader});
  }

  registerAnimal(postData1: AnimalModel): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.post<any>(this.apiUrl, postData1,{headers: reqHeader}).pipe(
      map((response) =>{
          if (response)
            return response;
        },
        (error:any) =>{
          return error;
        }
      ))
  }

  getRacesByType(type: string):Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<Raca[]>(`http://localhost:8080/raca/type/` + type);
  }

  getMedicalReportById(param: any) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<HistoricoMedico[]>(`http://localhost:8080/medical/` + param);  }
}
