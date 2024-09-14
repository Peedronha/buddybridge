import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../../open/account/model/user.model';
import { Observable } from 'rxjs';
import { TokenService } from './../../../../open/account/shared/token.service';
@Injectable({
  providedIn: 'root'
})
export class AccountRestrictService {

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  public getAuthorizationToken() {
    const token = this.tokenService.getToken();
    return token;
  }

  salvar(usuarioModel : User){
    return this.httpClient.post<User>("http://localhost:8080/auth/salvar",usuarioModel);
  }

  listar(){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.httpClient.get<User[]>("http://localhost:8080/usuario/listarAll", { headers: reqHeader });
  }

  getUsers(): Observable<User[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.httpClient.get<User[]>("http://localhost:8080/usuario/listarAll", { headers: reqHeader });
  }

  update(usuarioModel : User){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.httpClient.put<User[]>("http://localhost:8080/usuario", usuarioModel, { headers: reqHeader });
  }

  deletar(usuarioid:number):Observable<number>{
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.httpClient.delete<number>("http://localhost:8080/usuario"+ "/" + usuarioid, { headers: reqHeader });
  }

  loadById(id: string) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.httpClient.get<User>("http://localhost:8080/usuario/" + id, { headers: reqHeader });
  }

  loadUserById(id: string): Observable<User> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthorizationToken()
    });
    return this.httpClient.get<User>("http://localhost:8080/usuario/" + id, { headers: reqHeader });
  }

  getUsuarioLogado(): Observable<User> {
    const id = localStorage.getItem('idUser');
    if (id) {
      return this.loadUserById(id);
    } else {
      throw new Error('User ID not found in local storage');
    }
  }

}
