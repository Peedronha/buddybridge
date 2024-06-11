import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Tipo} from "../model/tipo.model";
import {TokenService} from "../../../../open/account/shared/token.service";

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  private getAuthorizationToken() {
    const token = this.tokenService.getToken();
    return token;
  }

  private apiUrl = 'http://localhost:8080/tipo';
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getTiposById(id: any) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<any>(this.apiUrl + '/' + id,{headers: reqHeader})
  }

  getTipos() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<Tipo[]>(this.apiUrl,{headers: reqHeader})
  }

  deleteTipo(idUser: any) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.delete<any>(this.apiUrl + '/' +idUser,{headers: reqHeader})
  }

  updateTipo(tipo: Tipo){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.put<any>(this.apiUrl, tipo, {headers: reqHeader});
  }

  registerTipo(postData1: Tipo): Observable<any> {
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
}
