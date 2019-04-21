import { Component, OnInit, Input } from '@angular/core';
import { API_IMAGENES, cod_cliente, sinImagen } from '../../config/config';

@Component({
  selector: 'item-lista',
  templateUrl: './item-lista.component.html',
  styleUrls: ['./item-lista.component.scss'],
})
export class ItemListaComponent implements OnInit {

  @Input() Imagen: any[] = [];
  @Input() Item: any[] = [];
  _imagen: any[] = [ sinImagen ];

  constructor() { }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    setTimeout(() => {
      console.log('Imagen:', this.Imagen);
      console.log('Item: ', this.Item);
      if (this.Imagen !== null) {
        if ( this.Imagen.length === 0 ) {
          this._imagen = [];
          this._imagen.push( sinImagen );
        } else {
          this._imagen = [];
          this._imagen.push( API_IMAGENES + '/' + cod_cliente + '/Pois/' + this.Item['id'] + '/' + this.Imagen);
        }
      } else {

      }
      console.log('Img', this._imagen);
    }, 1500);
  }

}
