import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { API_URL, cod_cliente, API_KEY } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PoisService {

  constructor(
    public http: HttpClient,
    public _us: UsuariosService
  ) { }

  obtenerPois(idioma: string) {
    const url = API_URL + '/PuntosInteres/todos/' + cod_cliente + '/' + this._us.idioma;
    console.log('S:', url);
    return this.http.get(url, {headers: {'API-KEY': API_KEY}});
  }

  obtenerPoi(id: string, idioma: string) {
    const url = API_URL + '/PuntosInteres/' + cod_cliente + '/' + id + '/' + this._us.idioma;
    console.log('S:', url);
    return this.http.get(url, {headers: {'API-KEY': API_KEY}});
  }

  obtenerPois1(idioma: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (idioma === '' || idioma === 'undefined') {
        idioma = 'es';
      }
      const url = API_URL + '/PuntosInteres/todos/' + cod_cliente + '/' + this._us.idioma;
      fetch(url, { headers: {'API-KEY': API_KEY}})
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        resolve(data.data);
      })
      .catch(err => {
        reject(err);
      });
    });
  }
}
