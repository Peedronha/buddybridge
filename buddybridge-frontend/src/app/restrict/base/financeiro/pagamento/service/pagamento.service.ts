import { TokenService } from '../../../../../open/account/shared/token.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pagamento } from '../model/pagamento';


@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  private apiUrl = 'http://localhost:8080/pagamento';

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

  getAllPagamentos(): Observable<Pagamento[]> {
    return this.http.get<Pagamento[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  getPagamentoById(id: number): Observable<Pagamento> {
    return this.http.get<Pagamento>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  savePagamento(pagamento: Pagamento): Observable<Pagamento> {
    return this.http.post<Pagamento>(this.apiUrl, pagamento, { headers: this.getHeaders() });
  }

  updatePagamento(pagamento: Pagamento): Observable<Pagamento> {
    return this.http.put<Pagamento>(this.apiUrl, pagamento, { headers: this.getHeaders() });
  }

  deletePagamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
