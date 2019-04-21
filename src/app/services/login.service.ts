import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { StorageService } from './storage.service';
import { Credenciales } from '../models/credenciales.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {

  public plataforma: any;
  estadoLogin = new BehaviorSubject(false);

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

  constructor(
    private platform: Platform,
    private storage: StorageService,
    private afAuth: AngularFireAuth,
  ) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  ngOnInit() {
    this.plataforma = this.platform.platforms();
    console.log(this.plataforma);
  }

  estaLogeado() {
    return this.estadoLogin.value;
  }

  checkToken() {
    return this.storage.obtener('usuario').then(res => {
      if (res) {
        this.estadoLogin.next(true);
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.storage.borrar('usuario').then(() => {
      this.estadoLogin.next(false);
    });
  }

  login(proveedor: string): Promise<any> {
      // Login web
      return this.login_proveedor(proveedor).then( (data: any) => {
        console.log(data);
        // this.usuario = data;
        const usuario = data.user.providerData[0];
        const adicional = data.additionalUserInfo;
        console.log(adicional);
        this.usuario.email = adicional.profile.email;
        this.usuario.nombre = adicional.profile.name;

        this.usuario.provider = adicional.providerId;
        this.usuario.sexo = adicional.profile.gender;
        this.usuario.locale = adicional.profile.locale;
        if (proveedor.toUpperCase() === 'GOOGLE') {
          this.usuario.imagen = adicional.profile.picture;
        } else {
          this.usuario.imagen = adicional.profile.picture.data.url;
        }
        console.log(this.usuario);

        this.storage.guardar('usuario', this.usuario, 'JSON').then(res => {
          this.estadoLogin.next(true);
        });
        return Promise.resolve(true);
      })
      .catch(err => {
        console.log(err);
        return Promise.resolve(false);
      });
    }

  login_proveedor(proveedor: string) {
    switch (proveedor.toUpperCase()) {
      case 'GOOGLE':
        return this.afAuth.auth.signInWithPopup( new auth.GoogleAuthProvider());
        break;
      case 'FACEBOOK':
        return this.afAuth.auth.signInWithPopup( new auth.FacebookAuthProvider());
        break;
      case 'TWITTER':
        return this.afAuth.auth.signInWithPopup( new auth.TwitterAuthProvider());
        break;
    }
  }

}
