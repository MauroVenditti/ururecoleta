import { Injectable } from '@angular/core';
import { Credenciales } from '../models/credenciales.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public idioma = 'es';
  public cod_cliente = '';
  public cod_guia = '';

  usuario: Credenciales = {
    nombre: null,
    email: null,
    imagen: null,
    sexo: null,
    edad: null,
    locale: null,
    pais: null,
    uid: null,
    provider: null
  };

  constructor() { }

  // tslint:disable-next-line:max-line-length
  cargarUsuario(nombre: string, email: string, imagen: string, sexo: string, edad: string, locale: string, pais: string, uid: string, provider: string) {

    this.usuario.nombre = nombre;
    this.usuario.email = email;
    this.usuario.imagen = imagen;
    this.usuario.sexo = sexo;
    this.usuario.edad = edad;
    this.usuario.locale = locale;
    this.usuario.pais = pais;
    this.usuario.uid = uid;
    this.usuario.provider = provider;
  }

  registrar_usuario() {

  }
}
