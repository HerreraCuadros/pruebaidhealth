import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  //nombreCategoria: string
  myAppUrl: string
  myApiurl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiurl = '/api/categorias'
   }

   saveCategoria(categoria: Categoria): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiurl, categoria)
   }

   getListCategoria(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiurl)
   }

   editCategoria(id: string, categoria: Categoria): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiurl + `/${id}`, categoria)
   }

   deleteCategoria(id: string): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiurl + `/${id}`)
   }
}
