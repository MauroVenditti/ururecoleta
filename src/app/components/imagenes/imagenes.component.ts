import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { imgCargando, sinImagen, cod_cliente, API_IMAGENES } from '../../config/config';

@Component({
  selector: 'imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss'],
})
export class ImagenesComponent implements OnInit {

  @Input() Imagen: any[] = [];
  @Input() Titulos = false;
  @Input() Titulo = '';
  @Input() Descripcion = '';
  @Input() Item: any[] = [];
  _imagen: any[] = [ imgCargando ];
  slides: { image: string }[] = [];
  subscription: Subscription;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.cargar();
    }, 1500);
  }

  cargar() {
    console.log('Imagen', this.Imagen);
    console.log('IDR:', this.Item);
    if (this.Imagen === null) {
      this._imagen = [];
      this._imagen.push(sinImagen);
    } else {
      if ( this.Imagen.length === 0 ) {
        this._imagen = [];
        this._imagen.push(sinImagen);
      } else {
        this._imagen = [];
        // this._imagen.push(API_IMAGENES + '/'+ this.Imagen);
        this._imagen.push( API_IMAGENES + '/' + cod_cliente + '/Pois/' + this.Item + '/' + this.Imagen);
        // for (let i = 0; i < this.Imagen.length; i++) {
        //  this._imagen.push( API_IMAGENES + '/'+this.Imagen[i].img);
        // }
      }
    }
    console.log('Imagen_: ', this._imagen);
  }

}
