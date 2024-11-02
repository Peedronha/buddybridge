import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenService } from "../../../../open/account/shared/token.service";
import { Observable } from 'rxjs';
import { Solicitacaoacesso } from '../model/solicitacaoacesso';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoacessoService {

  // URL base da API
  private apiUrl = 'http://localhost:8080/grupoacesso';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  // Método para obter o token de autorização
  private getAuthorizationToken(): string | null {
    return this.tokenService.getToken();
  }

  // Método para gerar os cabeçalhos da requisição HTTP
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
  }

  // Carregar solicitação de acesso por ID
  loadById(id: string): Observable<Solicitacaoacesso> {
    return this.http.get<Solicitacaoacesso>(`${this.apiUrl}/solicitacaoAcesso/${id}`, { headers: this.createHeaders() });
  }

  // Obter todas as solicitações de acesso
  getSolicitacoesAcesso(): Observable<Solicitacaoacesso[]> {
    return this.http.get<Solicitacaoacesso[]>(`${this.apiUrl}/solicitacoesAcesso`, { headers: this.createHeaders() });
  }

  // Habilitar ou desabilitar um acesso (liberar ou negar)
  enableDisableAcesso(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/solicitacaoAcesso/${id}`, {}, { headers: this.createHeaders() });
  }

  // Deletar solicitação de acesso por ID
  deleteSolicitacaoAcesso(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/solicitacaoAcesso/${id}`, { headers: this.createHeaders() });
  }

}
