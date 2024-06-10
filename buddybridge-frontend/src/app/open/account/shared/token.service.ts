import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) {
  }

  getToken(): any {
    const token = localStorage.getItem('token')+'';
    return JSON.parse(token);
  }

  setToken(token: any): void {
    this.clearToken();
    localStorage.setItem('token', JSON.stringify(token));
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  getJwtDecoded(): any {
    try {
      return jwtDecode(this.getToken());
    }
    catch (error) {
      //
    }
  }

}
