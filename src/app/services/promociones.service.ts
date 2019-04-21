import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, cod_cliente, HEADER } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  constructor(
    private http: HttpClient
  ) { }

  nuevo_codigo() {
    const url = API_URL + '/Codigos/nuevocodigo';
    return this.http.get(url).toPromise();
  }
  nuevoCodigo(cod_promocion: string) {
    const cod_guia = localStorage.getItem('cod_guia');
    const url = API_URL + '/Codigos/' + cod_cliente + '/' + cod_promocion + '/' + cod_guia;
    return this.http.put(url, { headers: HEADER }).toPromise();
  }

  // tslint:disable-next-line:no-shadowed-variable
  obtener_todos(cod_cliente: string) {
    const url = API_URL + '/Promociones/todos/' + cod_cliente;
    return this.http.get(url);
  }

  // tslint:disable-next-line:no-shadowed-variable
  obtener(cod_cliente: string, id: string) {
    const url = API_URL + '/Promociones/' + cod_cliente + '/' + id;
    return this.http.get(url);
  }
}
