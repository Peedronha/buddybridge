import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TokenService } from '../../../open/account/shared/token.service';

export interface MenuItem {
  idacesso: number;
  descricaoAcesso: string;
  iconeAcesso: string;
  moduloAcesso: string;
  telaAcesso: string;
  tipoAcesso: string;
  urlAcesso: string;
}


@Injectable({
  providedIn: 'root'
})
export class MenuService {

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

  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/menus`, { headers: this.createHeaders() });
  }
}
