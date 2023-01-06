import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  myAppUrl: string
  myApiurl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiurl = '/api/productos'
   }

   saveProducto(categoria: Producto): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiurl, categoria)
   }

   getListProducto(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiurl)
   }

   editProducto(id: string, categoria: Producto): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiurl + `/${id}`, categoria)
   }

   deleteProducto(id: string): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiurl + `/${id}`)
   }
}
