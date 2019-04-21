import { Component, OnInit, Input } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-mispromos',
  templateUrl: './mispromos.component.html',
  styleUrls: ['./mispromos.component.scss'],
})
export class MispromosComponent implements OnInit {

  @Input() Promocion: any;
  qrData = null;
  generated = '';
  imagenes: any[] = [];
  _titulos = true;
  _imagen: any[] = [];

  constructor() { }

  ngOnInit() {}

  displayQrCode() {
    return this.generated !== '';
  }

  verqr(cod_promo: string) {
    const qrcode = QRCode;
    const self = this;
    qrcode.toDataURL(cod_promo, { errorCorrectionLevel: 'H' }, function (err, url) {
      self.generated = url;
    });
  }

  eliminar(id: string) {

  }

}
