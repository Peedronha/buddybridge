import { TokenService } from './../../../../../open/account/shared/token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContaCaixa } from '../model/contacaixa';


@Injectable({
  providedIn: 'root'
})
export class ContaCaixaService {
  private apiUrl = 'http://localhost:8080/contacaixa';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return reqHeader;
  }

  getAllContasCaixa(): Observable<ContaCaixa[]> {
    return this.http.get<ContaCaixa[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  getContaCaixaById(id: number): Observable<ContaCaixa> {
    return this.http.get<ContaCaixa>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  saveContaCaixa(contaCaixa: ContaCaixa): Observable<ContaCaixa> {
    return this.http.post<ContaCaixa>(this.apiUrl, contaCaixa, { headers: this.getHeaders() });
  }

  updateContaCaixa(contaCaixa: ContaCaixa): Observable<ContaCaixa> {
    return this.http.put<ContaCaixa>(this.apiUrl, contaCaixa, { headers: this.getHeaders() });
  }

  deleteContaCaixa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
