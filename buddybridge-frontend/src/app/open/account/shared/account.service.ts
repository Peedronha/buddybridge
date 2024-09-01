import { TokenService } from './token.service';
import { Login } from './../model/login.model';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import {catchError, Observable, of} from 'rxjs';
import { AuthResponse } from '../model/authResponse.model';
import { pipe } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) { }

  //Salva um usuário no sistema
  salvar(usuarioModel : User){
    return this.httpClient.post<User>("http://localhost:8080/auth/salvar",usuarioModel);
  }

  //Realiza o login
  async login(autenticacao: Login) {
    const result = await this.httpClient.post<any>("http://localhost:8080/auth/login",autenticacao).toPromise();
    if(result && result.token && result.valid){
      this.tokenService.setToken(result.token);
      localStorage.setItem('idUser', result.idUser + '');
      localStorage.setItem('login', result.login + '');
      localStorage.setItem('valid', result.valid + '');
      localStorage.setItem('validarEmail', result.validarEmail + '');
      if(result.validarEmail){
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  //Solicita uma nova senha
  async enviarTokenRecuperacao(autenticacao: Login){
    const result = await this.httpClient.post<any>("http://localhost:8080/auth/enviarTokenRecuperacao",autenticacao).toPromise();
  }

  async getPermissao(id : any, token : any) {
    try {
      return await this.httpClient.get<AuthResponse>("http://localhost:8080/auth/validarToken/"+id+"/"+token).toPromise();
    } catch (error) {
      this.clearToken();
      console.error('Erro ao validar permissão:', error);
      return null;
    }
  }

  async isBackEndOn(){
    return await this.httpClient.get<any>("http://localhost:8080/auth/isBackEndOn").toPromise();
  }

  //valida a sessão no sistema.
  async validarSessao() {
    const tokenOld = this.tokenService.getToken();
    const idOld = window.localStorage.getItem('idUser');

    if(tokenOld != null && idOld != null){
      const result = await this.getPermissao(idOld, tokenOld); //preciso inserir uma tratativa de erro aqui para quando não permitido acessar o metodo
      if(result && result.valid && !result.validarEmail){
        this.tokenService.setToken(result.token);
        window.localStorage.setItem('idUser', result.idUser);
        window.localStorage.setItem('login', result.login);
        window.localStorage.setItem('valid', result.valid + '');
        window.localStorage.setItem('validarEmail', result.validarEmail + '');
        return true;
      } else {
        this.clearToken();
        return false;
      }
    }

    let serverOut: boolean = false;
    try {
      await this.isBackEndOn();
      console.log("Backend is running");
    } catch (error) {
      serverOut = true;
      console.log("server out " + serverOut);
    }
    if (serverOut) {
      this.clearToken();
      window.location.href = '/errorBuddyBridge';
    }

    return false;
  }

  clearToken(){
    this.tokenService.clearToken();
    window.localStorage.removeItem('idUser');
    window.localStorage.removeItem('login');
    window.localStorage.removeItem('valid');
    //window.localStorage.removeItem('validarEmail');
  }

  private apiUrl = 'https://viacep.com.br/ws/';
  getAddress(cep: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}${cep}/json/`);
  }

}
