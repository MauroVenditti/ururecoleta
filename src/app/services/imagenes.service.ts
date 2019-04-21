import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, HEADER } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(
    private http: HttpClient
  ) { }

  obtener(cod_cliente: string, tipo: string, id: string) {
    const url = API_URL + '/Imagenes/' + cod_cliente + '/' + tipo + '/' + id;
    return this.http.get(url, { headers: HEADER });
  }

  obtener_convertido(cod_cliente: string, cod_guia: string) {
    const url = API_URL + '/Imagenes/convertir/' + cod_cliente + '/' + cod_guia;
    return this.http.get(url, { headers: HEADER });
  }
}
