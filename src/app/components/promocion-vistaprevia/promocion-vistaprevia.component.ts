import { Component, OnInit, Input } from '@angular/core';
import { API_IMAGENES_PROMOS, sinImagen } from '../../config/config';

@Component({
  selector: 'app-promocion-vistaprevia',
  templateUrl: './promocion-vistaprevia.component.html',
  styleUrls: ['./promocion-vistaprevia.component.scss'],
})
export class PromocionVistapreviaComponent implements OnInit {

  @Input() Imagen: any[] = [];
  @Input() Titulos: boolean;
  @Input() Titulo = '';
  @Input() Descripcion = '';
  _imagen: any[] = [];

  constructor() { }

  ngOnInit() {
    console.log('Titulo', this.Titulo);
    setTimeout(() => {
      this.cargar();
      // this.escuchar();
    }, 1500);
  }

  cargar() {
    console.log('Imagen', this.Imagen);
    if (this.Imagen === null) {
      this._imagen = [];
      this._imagen.push(sinImagen);
    } else {
      if ( this.Imagen.length === 0 ) {
        this._imagen = [];
        this._imagen.push(sinImagen);
      } else {
        this._imagen = [];
        // this._imagen = this.Imagen;
        for (let i = 0; i < this.Imagen.length; i++) {
          this._imagen.push( API_IMAGENES_PROMOS + '/' + this.Imagen[i].img);
        }
      }
    }
  }

}
