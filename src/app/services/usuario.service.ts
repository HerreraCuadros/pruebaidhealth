import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  myAppUrl: string
  myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiUrl = '/api/usuarios'
   }

  saveUser(usuario: Usuario): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, usuario)
  }

  getListUsuario(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl)
   }

   editUsuario(id: string, usuario: Usuario): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + `/${id}`, usuario)
   }

   deleteUsuario(id: string): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + `/${id}`)
   }

  // editUser(editUser: any): Observable<any>{
  //   return this.http.put(this.myAppUrl + this.myApiUrl +, editUser)
  // }
}
