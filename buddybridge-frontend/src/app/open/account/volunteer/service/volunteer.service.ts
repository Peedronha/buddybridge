import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Volunteer} from "../../model/volunteer.model";
@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private apiUrl = 'https://localhost:8080/volunteer';

  constructor(private http: HttpClient) { }

  getVolunteers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteVolunteer(idvoluntario: any): Observable<any> {
    return this.http.delete(this.apiUrl+ '/' + idvoluntario);
  }

  registerVolunteer(postData1: Volunteer): Observable<any> {
    return this.http.post<any>(this.apiUrl,{body: postData1})
  }
}
