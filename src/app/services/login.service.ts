import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { UsuarioLogin } from '../models/usuarioLogin';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  myAppUrl: string
  myApiurl: string
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiurl = '/api/auth/login'
   }

   login(usuario: UsuarioLogin): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiurl, usuario)
   }

   setLocalStorage(data: string): void {
    localStorage.setItem('token', data)
  }

  getTokenDecoded(): any {
    const helper = new JwtHelperService()
    const decodedToken = helper.decodeToken(localStorage.getItem('token')!)
    return decodedToken
  }

  getToken(): string {
    return localStorage.getItem('token')!
  }

  // getNombreUser(): string {
  //   return localStorage.getItem('nombre')!
  // }

  removeLocalStorage(): void {
    localStorage.removeItem('token')
  }
}
