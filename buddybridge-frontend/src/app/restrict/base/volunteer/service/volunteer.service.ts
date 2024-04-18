import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Volunteer} from "../../../../restrict/base/volunteer/model/volunteer.model";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  private apiUrl = 'http://localhost:8080/volunteer';

  constructor(private http: HttpClient) {
  }

  getVolunteers(): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get(this.apiUrl,{headers: reqHeader});
  }

  deleteVolunteer(idvoluntario: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.delete(this.apiUrl + '/' + idvoluntario, {headers: reqHeader});
  }

  registerVolunteer(postData1: Volunteer): Observable<any> {
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
  updateVolunteer(postData1: Volunteer): Observable<any> {
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
