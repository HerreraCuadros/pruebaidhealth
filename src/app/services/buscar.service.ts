import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  myAppUrl: string
  myApiurl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint
    this.myApiurl = '/api/buscar'
  }

  searchColeccion(coleccion: string, termino: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiurl + `/${coleccion}`+ `/${termino}`)
   }
}
