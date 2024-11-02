import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classificacao } from '../model/classificacao';
import { TokenService } from '../../../../../open/account/shared/token.service';


@Injectable({
  providedIn: 'root'
})
export class ClassificacaoService {
  private apiUrl = 'http://localhost:8080/classificacao';

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

  getAllClassificacoes(): Observable<Classificacao[]> {
    return this.http.get<Classificacao[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  getClassificacaoById(id: number): Observable<Classificacao> {
    return this.http.get<Classificacao>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  saveClassificacao(classificacao: Classificacao): Observable<Classificacao> {
    return this.http.post<Classificacao>(this.apiUrl, classificacao, { headers: this.getHeaders() });
  }

  updateClassificacao(classificacao: Classificacao): Observable<Classificacao> {
    return this.http.put<Classificacao>(this.apiUrl, classificacao, { headers: this.getHeaders() });
  }

  deleteClassificacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
