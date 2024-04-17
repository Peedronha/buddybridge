import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AccountRestrictService } from '../../account/shared/account-restrict.service';
import { Volunteer } from '../model/volunteer.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private apiUrl = 'http://localhost:8080/volunteer';

  constructor(private http: HttpClient,private accountService : AccountRestrictService) {
  }

  getVolunteers(): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accountService.getAuthorizationToken()
    });
    return this.http.get(this.apiUrl, { headers: reqHeader });
  }

  getVolunteer(idvoluntario: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accountService.getAuthorizationToken()
    });
    return this.http.get(this.apiUrl + '/' + idvoluntario, { headers: reqHeader });
  }

  deleteVolunteer(idvoluntario: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accountService.getAuthorizationToken()
    });
    return this.http.delete(this.apiUrl + '/' + idvoluntario, { headers: reqHeader });
  }

  registerVolunteer(postData1: Volunteer): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accountService.getAuthorizationToken()
    });
    return this.http.post<any>(this.apiUrl, postData1, { headers: reqHeader }).pipe(
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
