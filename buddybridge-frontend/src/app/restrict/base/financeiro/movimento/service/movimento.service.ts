import { TokenService } from './../../../../../open/account/shared/token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimentacao } from '../model/movimentacao';


@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {
  private apiUrl = 'http://localhost:8080/movimentacao';

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

  getAllMovimentacoes(): Observable<Movimentacao[]> {
    return this.http.get<Movimentacao[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  getMovimentacaoById(id: number): Observable<Movimentacao> {
    return this.http.get<Movimentacao>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  saveMovimentacao(movimentacao: Movimentacao): Observable<Movimentacao> {
    return this.http.post<Movimentacao>(this.apiUrl, movimentacao, { headers: this.getHeaders() });
  }

  updateMovimentacao(movimentacao: Movimentacao): Observable<Movimentacao> {
    return this.http.put<Movimentacao>(this.apiUrl, movimentacao, { headers: this.getHeaders() });
  }

  deleteMovimentacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getValoresRelatorioMensal(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/relatorio-mensal`, { headers: this.getHeaders() });
  }

  getMovimentacoesPendentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/resumo-pendentes`, { headers: this.getHeaders() });
  }

  getReceitasDespesasAnual(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/receitas-despesas-anual`, { headers: this.getHeaders() });
  }

  getReceitasPorContaCaixa(ano: number, mes: number, filtro: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/receitas`, { params: { ano, mes, filtro }, headers: this.getHeaders() });
  }

  getDespesasPorContaCaixa(ano: number, mes: number, filtro: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/despesas`, { params: { ano, mes, filtro }, headers: this.getHeaders() });
  }

  getMovimentacoesPendentesToRecieve(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pendentes`, { headers: this.getHeaders() });
  }

}
