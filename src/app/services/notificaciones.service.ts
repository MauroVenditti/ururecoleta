import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { StorageService } from './storage.service';
import { Suscripcion } from '../models/suscripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  isEnabled = this.swPush.isEnabled;
  isGranted = Notification.permission === 'granted';
  urlNotificaciones = 'https://urusockets.herokuapp.com/';
  public VAPID_PUBLIC_KEY = 'BCmJ95iDQscNWEYcOlcbQkWGMmJliXSqfDpovg_pUg2DQfF1wj90pfHAYTAGqWfFIWWRjM9Wfbs1QYNFF71mvy8';
  private VAPID_PUBLIC_KEY_U8: Uint8Array = null;

  constructor(
    private http: HttpClient,
    private swPush: SwPush,
    private storage: StorageService
  ) {
    // this.verificar_key();
   }

  verificar_key() {
    this.storage.obtener('PUSHKEY').then( pushkey => {
      console.log('Key Storage: ', pushkey);
      if ( pushkey === null ) {
        this.getKey().then( key => {
          console.log('GeyKey: ', key);
          this.VAPID_PUBLIC_KEY_U8 = key;
          this.VAPID_PUBLIC_KEY = this.VAPID_PUBLIC_KEY_U8.toString();
          console.log('V8: ', this.VAPID_PUBLIC_KEY_U8);
          console.log('V: ', this.VAPID_PUBLIC_KEY);
        })
        .catch( err => {
          console.log('Error GeyKey: ', err);
        });
      } else {
        this.VAPID_PUBLIC_KEY = pushkey;
      }
    })
    .catch( err => {
      console.log('Error Key Storage: ', err);
    });
  }

  getKey() {
    return fetch(this.urlNotificaciones + 'api/key')
          .then( res => res.arrayBuffer())
          .then( key => new Uint8Array(key) );
  }

  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  subscribeToNotifications() {
    const suscripcion: Suscripcion = {};
    return this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then( sub => {
      console.log('SUB: ', sub);
      suscripcion.cliente = '9999';
      suscripcion.suscripcion = sub;
      suscripcion.usuario = 'Mauro';
      suscripcion.guia = '1';
      suscripcion.esguia = false;
      suscripcion.esadm = true;
      this.addPushSubscriber(suscripcion).subscribe( respuesta => {
        console.log('RESPUESTA: ', respuesta);
      });
    })
    .catch( err => console.log('No se puede hacer subscripcion: ', err) );
  }

  addPushSubscriber(sub: any) {
    return this.http.post(this.urlNotificaciones + 'api/subscribe', sub);
  }

  send() {
    return this.http.post(this.urlNotificaciones + 'api/push', null);
  }

}
