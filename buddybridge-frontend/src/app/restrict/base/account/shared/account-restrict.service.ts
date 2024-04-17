import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../../open/account/model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountRestrictService {

  constructor(private httpClient: HttpClient) { }

  public getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
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

}
