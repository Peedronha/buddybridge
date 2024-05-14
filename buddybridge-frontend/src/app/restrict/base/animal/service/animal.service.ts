import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Animal} from "../model/animal";
import {Volunteer} from "../../volunteer/model/volunteer.model";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  private apiUrl = 'http://localhost:8080/animal';

  constructor(private http: HttpClient) {
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

  updateanimal(animal: Animal){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.put<any>(this.apiUrl, animal, {headers: reqHeader}).pipe(
      map((response) =>{
          if (response)
            return response;
        },
        (error:any) =>{
          return error;
        }
      ))
  }

  registerAnimal(postData1: Animal): Observable<any> {
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
