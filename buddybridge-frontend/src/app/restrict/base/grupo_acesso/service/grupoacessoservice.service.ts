import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenService } from "../../../../open/account/shared/token.service";
import { GrupoAcessoDTO } from '../model/grupoacessoDTO';
import { AcessoDTO } from '../model/acessoDTO';
import { GrupoAcesso } from '../model/grupoAcesso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoacessoserviceService {

  private apiUrl = 'http://localhost:8080/grupoacesso';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  // Método para obter o token de autorização
  private getAuthorizationToken() {
    return this.tokenService.getToken();
  }

  // Método para gerar cabeçalho de requisição
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
  }

  // Carregar grupo de acesso por ID
  loadById(id: string): Observable<GrupoAcessoDTO> {
    return this.http.get<GrupoAcessoDTO>(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }

  // Obter todos os grupos de acesso
  getGruposAcesso(): Observable<GrupoAcessoDTO[]> {
    return this.http.get<GrupoAcessoDTO[]>(this.apiUrl, { headers: this.createHeaders() });
  }

  // Obter grupos de acesso ativos
  getGruposAcessoAtivo(): Observable<GrupoAcesso[]> {
    return this.http.get<GrupoAcesso[]>(`${this.apiUrl}/ativos`, { headers: this.createHeaders() });
  }

  // Obter todos os acessos
  getAcessos(): Observable<AcessoDTO[]> {
    return this.http.get<AcessoDTO[]>(`${this.apiUrl}/acessos`, { headers: this.createHeaders() });
  }

  // Obter acessos por ID de grupo de acesso
  getAcesso(id: any): Observable<AcessoDTO[]> {
    return this.http.get<AcessoDTO[]>(`${this.apiUrl}/acesso/${id}`, { headers: this.createHeaders() });
  }

  // Deletar grupo de acesso por ID
  deleteGrupoAcesso(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.createHeaders() });
  }

  // Criar novo grupo de acesso
  createGrupoAcesso(grupoAcesso: GrupoAcessoDTO): Observable<GrupoAcessoDTO> {
    return this.http.post<GrupoAcessoDTO>(this.apiUrl, grupoAcesso, { headers: this.createHeaders() });
  }

  // Atualizar grupo de acesso existente
  updateGrupoAcesso(grupoAcesso: GrupoAcessoDTO): Observable<GrupoAcessoDTO> {
    return this.http.put<GrupoAcessoDTO>(this.apiUrl, grupoAcesso, { headers: this.createHeaders() });
  }

  // Obter acessos disponíveis para uma tela específica
  getAcessosParaTela(tela: string): Observable<AcessoDTO[]> {
    return this.http.get<AcessoDTO[]>(`${this.apiUrl}/acessostela/${tela}`, { headers: this.createHeaders() });
  }

  // Solicitar acesso a um recurso específico
  solicitarAcesso(idAcesso: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/solicitaracesso/${idAcesso}`, null, { headers: this.createHeaders() });
  }
}
