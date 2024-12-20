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

  private apiUrl = 'http://localhost:8080/medical';

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  getMedicalReportById(id: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<any>(this.apiUrl+'/medical-profiles' + '/' + id,{headers: reqHeader})
  }

  getMedicalReport() {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<any>(this.apiUrl+'/medical-profiles',{headers: reqHeader})
  }

  deleteMedicalReport(idUser: any) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.delete<any>(this.apiUrl+'/medical-profiles' + '/' +idUser,{headers: reqHeader})
  }

  updateMedical(medicalReport: HistoricoMedico){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.put<any>(this.apiUrl+'/update', medicalReport, {headers: reqHeader});
  }

  registerMedicalReport(postData1: HistoricoMedico): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.post<any>(this.apiUrl+'/register', postData1,{headers: reqHeader}).pipe(
      map((response) =>{
          if (response)
            return response;
        },
        (error:any) =>{
          return error;
        }
      ))
  }

  // Novo método para buscar o histórico médico pelo ID do animal
  getMedicalReportByAnimalId(animalId: number): Observable<HistoricoMedico[]> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.http.get<HistoricoMedico[]>(`${this.apiUrl}/animal/${animalId}`, { headers: reqHeader });
  }

}
