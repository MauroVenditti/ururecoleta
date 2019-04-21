import { Component, OnInit, Input } from '@angular/core';
import { PromocionesService } from '../../services/promociones.service';
import { cod_cliente } from '../../config/config';
import * as QRCode from 'qrcode';
import { ImagenesService } from '../../services/imagenes.service';
import { CodigosPromocionesService } from '../../services/codigos-promociones.service';

@Component({
  selector: 'promo-individual',
  templateUrl: './promo-individual.component.html',
  styleUrls: ['./promo-individual.component.scss'],
})
export class PromoIndividualComponent implements OnInit {

  @Input() Promocion: any;
  qrData = null;
  codigoCreado = null;
  codigoEscanedo = null;
  promociones: any[] = [];

  code = '';
  generated = '';

  imagenes: any;
  _imagenes: any;
  _titulos = true;

  constructor(
    public _ps: PromocionesService,
    public _imagenesService: ImagenesService,
    public _codigosPro: CodigosPromocionesService
  ) { }

  ngOnInit() {
    this.getImagenes();
  }

  getImagenes() {
    this._imagenesService.obtener(cod_cliente, 'Promociones', this.Promocion.id)
        .subscribe((respuesta: any) => {
          this.imagenes = respuesta.data;
          // this.cargar();
        });
  }

  process(promocion: any) {
    const qrcode = QRCode;
    const self = this;
    this._ps.nuevoCodigo(promocion.id).then((data: any) => {
      this.code = data.data;
      console.log('Data de Promo', data);
      const promo = promocion;
      promo.cod_promo = this.code;
      this._codigosPro.guardarPromocion(promo);
      qrcode.toDataURL(data.data, { errorCorrectionLevel: 'H' }, function (err, url) {
        self.generated = url;
      });
    });
  }

  displayQrCode() {
    return this.generated !== '';
  }

  crearCodigo() {
    this.codigoCreado = this.qrData;
  }

}
