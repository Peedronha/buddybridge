import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../../../../open/account/shared/token.service";
import {map, Observable} from "rxjs";
import {AnimalModel} from "../../animal/model/animal.model";
import {AdoptionModel} from "../model/AdoptionModel";

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  private getAuthorizationToken() {
    const token = this.tokenService.getToken();
    return token;
  }

  private apiUrl = 'http://localhost:8080/adocao';

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }


  getAdoptions() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<any>(this.apiUrl,{headers: reqHeader})
  }

  deleteAdoption(idUser: number) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.delete<any>(this.apiUrl,{headers: reqHeader})
  }

  updateAdoption(adoption: AdoptionModel): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.put<any>(this.apiUrl, adoption, {headers: reqHeader});
  }

  registerAdoption(adoption: AdoptionModel): Observable<any> {
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getAuthorizationToken()
      });
      return this.http.post<any>(this.apiUrl, adoption,{headers: reqHeader}).pipe(
        map((response) =>{
            if (response)
              return response;
          },
          (error:any) =>{
            return error;
          }
        ))
  }

  getAdoptionsById(param: number) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<any>(this.apiUrl+'/'+param,{headers: reqHeader})  }
}
