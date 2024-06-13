import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Colaborador} from "../model/colaborador";
import {error} from "@angular/compiler-cli/src/transformers/util";
import { TokenService } from './../../../../open/account/shared/token.service';
@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private getAuthorizationToken() {
    const token = this.tokenService.getToken();
    return token;
  }

  private apiUrl = 'http://localhost:8080/colaborador';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
  }

  getVolunteers(): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get(this.apiUrl,{headers: reqHeader});
  }

  inativarVolunteer(idvoluntario: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.delete(this.apiUrl + '/' + idvoluntario, {headers: reqHeader});
  }

  registerVolunteer(postData1: Colaborador): Observable<any> {
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

  updateVolunteer(postData1: Colaborador): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.put<any>(this.apiUrl, postData1, {headers: reqHeader}).pipe(
      map((response) =>{
          if (response)
            return response;
        },
        (error:any) =>{
          return error;
        }
      ))
  }

  getVolunteersById(id: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<any>(this.apiUrl + '/' + id,{headers: reqHeader})
  }
}
