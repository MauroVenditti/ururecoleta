import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private platform: Platform,
    private storage: Storage
  ) { }

  guardar(llave: string, valor: any, formato: string = ''): Promise<any> {
    if (this.platform.is('cordova')) {
      if (formato.toUpperCase() === 'JSON') {
        return Promise.resolve( this.storage.set(llave, JSON.stringify( valor) ) );
      } else {
        return Promise.resolve( this.storage.set(llave, valor) );
      }
    } else {
      if (formato.toUpperCase() === 'JSON') {
        return Promise.resolve( localStorage.setItem(llave, JSON.stringify( valor) ) );
      } else {
        return Promise.resolve( localStorage.setItem(llave, valor) );
      }
    }
  }

  obtener(llave: string, formato: string = ''): Promise<any> {
    if (this.platform.is('cordova')) {
      if (formato.toUpperCase() === 'JSON') {
        this.storage.get(llave).then((respuesta: any) => {
          return Promise.resolve( JSON.parse(respuesta) );
        });
      } else {
        return Promise.resolve( this.storage.get(llave) );
      }
    } else {
      if (formato.toUpperCase() === 'JSON') {
        const respuesta = localStorage.getItem(llave);
          return Promise.resolve( JSON.parse(respuesta) );
      } else {
        return Promise.resolve( localStorage.getItem(llave) );
      }
    }
  }

  borrar(llave: string): Promise<any> {
    if (this.platform.is('cordova')) {
      return Promise.resolve( this.storage.remove(llave) );
    } else {
      return Promise.resolve( localStorage.removeItem(llave) );
    }
  }
}
