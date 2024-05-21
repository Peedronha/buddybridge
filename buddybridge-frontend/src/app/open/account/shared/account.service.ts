import { Login } from './../model/login.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { Auth } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  async login(autenticacao: Login) {
    const result = await this.httpClient.post<any>("http://localhost:8080/auth/login",autenticacao).toPromise();
    if(result && result.token && result.valid){
      if(result.validarEmail){
        window.localStorage.setItem('email', result.validarEmail);
        window.localStorage.setItem('idUser', result.idUser);
        window.localStorage.setItem('login', result.login);
        return false;
      } else {
        window.localStorage.setItem('email', result.validarEmail);
        window.localStorage.setItem('idUser', result.idUser);
        window.localStorage.setItem('login', result.login);
        window.localStorage.setItem('token', result.token);
      }
      return true;
    }
    return false;
  }

  salvar(usuarioModel : User){
    return this.httpClient.post<User>("http://localhost:8080/auth/salvar",usuarioModel);
  }

  async validarSessao() {
    const tokenOld = window.localStorage.getItem('token');
    const idOld = window.localStorage.getItem('idUser');
    const loginOld = window.localStorage.getItem('login');
    if(!tokenOld && !idOld && !loginOld){
      return false;
    }
    console.log('validando a sessão')
    let auth = new Auth();
    auth.token = tokenOld +'';
    auth.idUser = idOld +'';
    auth.login = loginOld +'';
    const result = await this.httpClient.post<any>("http://localhost:8080/auth/validarToken",auth).toPromise();
    if(result && result.valid){
      window.localStorage.setItem('token', result.token);
      window.localStorage.setItem('idUser', result.idUser);
      window.localStorage.setItem('login', result.login);
      return true;
    } else {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('idUser');
      window.localStorage.removeItem('login');
    }
    return false;
  }

  async enviarTokenRecuperacao(autenticacao: Login){
    const result = await this.httpClient.post<any>("http://localhost:8080/auth/enviarTokenRecuperacao",autenticacao).toPromise();

  }

}
