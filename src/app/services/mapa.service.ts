import { Injectable } from '@angular/core';
import { API_URL, cod_cliente, API_KEY } from '../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  constructor(
    public http: HttpClient
  ) { }

  getMarkers() {
    const url = API_URL + '/PuntosInteres/todos/' + cod_cliente + '/es';
    console.log('S:', url);
    return this.http.get(url, {headers: {'API-KEY': API_KEY}});
    // return this.db.list('/markers')
  }
}
