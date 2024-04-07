import { Login } from './../model/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  async login(autenticacao: Login) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    let login = autenticacao.login;
    let senha = autenticacao.senha;
    let body = `login=${login}&senha=${senha}`;

    const result = await this.httpClient.post<any>("http://localhost:8080/public/buddybridge/autenticacao",body,  httpOptions).toPromise();
    if(result && result.token){
      window.localStorage.setItem('token', result.token);
      return true;
    }
    return false;
  }

  salvar(usuarioModel : User){
    return this.httpClient.post<User>("http://localhost:8080/usuario/salvar",usuarioModel);
  }

  listar(){
    return this.httpClient.get<User[]>("http://localhost:8080/usuario/listarAll");
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  deletar(usuarioid:number):Observable<number>{
    let httpheaders=new HttpHeaders()
    .set('Content-type','application/Json');
    let options={
      headers:httpheaders
    };
    return this.httpClient.delete<number>("http://localhost:8080/usuario"+ "/" + usuarioid);
  }
}
