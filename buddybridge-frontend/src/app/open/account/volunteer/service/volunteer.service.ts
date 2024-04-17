import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Volunteer} from "../../../../restrict/base/volunteer/model/volunteer.model";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private apiUrl = 'http://localhost:8080/volunteer';

  constructor(private http: HttpClient) {
  }

  getVolunteers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteVolunteer(idvoluntario: any): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + idvoluntario);
  }

  registerVolunteer(postData1: Volunteer): Observable<any> {
    return this.http.post<any>(this.apiUrl, postData1).pipe(
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
