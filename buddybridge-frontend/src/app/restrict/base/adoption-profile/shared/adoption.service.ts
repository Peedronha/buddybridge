import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../../../../open/account/shared/token.service";
import {map, Observable} from "rxjs";
import {AnimalModel} from "../../animal/model/animal.model";
import {AdoptionProfileModel} from "../model/AdoptionProfileModel";
import {AdoptionFormModel} from "../../../../open/adoption/models/AdoptionFormModel";
import {AdoptionIntention} from "../../../../open/adoption/models/AdoptionIntention";

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

  // updateAdoption(adoption: AdoptionModel): Observable<any> {
  //   var reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + this.getAuthorizationToken()
  //   });
  //   return this.http.put<any>(this.apiUrl, adoption, {headers: reqHeader});
  // }
  // updateAdoptionProfile(profile: AdoptionProfileModel): Observable<any> {
  //   var reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + this.getAuthorizationToken()
  //   });
  //   return this.http.put<any>(this.apiUrl+'/adocao', profile, {headers: reqHeader});
  // }
  //
  // registerAdoption(adoption: AdoptionModel): Observable<any> {
  //     var reqHeader = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + this.getAuthorizationToken()
  //     });
  //     return this.http.post<any>(this.apiUrl, adoption,{headers: reqHeader}).pipe(
  //       map((response) =>{
  //           if (response)
  //             return response;
  //         },
  //         (error:any) =>{
  //           return error;
  //         }
  //       ))
  // }
  registerAdoptionProfile(adoption: AdoptionProfileModel): Observable<any> {
      var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getAuthorizationToken()
      });
      return this.http.post<any>(this.apiUrl+'/profiles', adoption,{headers: reqHeader}).pipe(
        map((response) =>{
            if (response)
              return response;
          },
          (error:any) =>{
            return error;
          }
        ))
  }
  registerAdoptionIntention(adoption: AdoptionFormModel): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.post<any>('http://localhost:8080/adocao/add', adoption,{headers: reqHeader}).pipe(
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

  getAdoptionsProfiles() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<any>(this.apiUrl+'/profiles',{headers: reqHeader})  }


  getAdoptionsProfileById(param: any) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<any>(this.apiUrl+'/profiles/'+param,{headers: reqHeader})  }

  updateAdoptionProfile(adoption: AdoptionProfileModel) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.put<any>(this.apiUrl+'/profiles', adoption,{headers: reqHeader}).pipe(
      map((response) =>{
          if (response)
            return response;
        },
        (error:any) =>{
          return error;
        }
      ))
  }

  getAnimalsByProfileStatus() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<any>(this.apiUrl+'/profiles/PENDING',{headers: reqHeader})  }

  deleteAdoptionProfile(idUser: any) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.delete<any>(this.apiUrl+'/profiles/'+ idUser,{headers: reqHeader})  }

  updateAdoptionIntention(formModel: AdoptionIntention, id_adocao: number) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.put<any>(this.apiUrl+'/change/'+ id_adocao, formModel,{headers: reqHeader}).pipe(
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
