import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../services/notificaciones.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  notificaciones = false;
  actualizaciones = false;

  constructor(
    private _notificaciones: NotificacionesService
  ) { }

  ngOnInit() {
    this.verificaPush();
  }

  verificaPush() {
    console.log('VAPID: ', this._notificaciones.VAPID_PUBLIC_KEY);
    if (this._notificaciones.VAPID_PUBLIC_KEY !== null) {
      this.notificaciones = true;
    }
  }

  requestPushNotificacionesPermission(e) {
    console.log('VAPID: ', this._notificaciones.VAPID_PUBLIC_KEY);
    if (e.detail.checked) {
      this._notificaciones.subscribeToNotifications()
          .then(res => {
            console.log('Res Conf:', res);
          })
          .catch(err => {
            console.log(err);
          });
    } else {
      // Eliminar suscripcion
    }
  }

  requestActualizaciones(e) {
    if (e.detail.checked) {
      // this.update.verifica_actualizacion();
    }
  }

}
