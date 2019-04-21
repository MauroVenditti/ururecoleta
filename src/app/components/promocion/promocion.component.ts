import { Component, OnInit } from '@angular/core';
import { cod_cliente } from '../../config/config';
import { PromocionesService } from '../../services/promociones.service';

@Component({
  selector: 'promocion',
  templateUrl: './promocion.component.html',
  styleUrls: ['./promocion.component.scss'],
})
export class PromocionComponent implements OnInit {

  promociones: any[] = [];

  constructor(
    public _ps: PromocionesService
  ) { }

  ngOnInit() {
    this.obtener_promociones();
  }

  obtener_promociones() {
    this._ps.obtener_todos(cod_cliente).subscribe( (promociones: any) => {
      console.log(promociones);
      this.promociones = promociones.data;
    });
  }

}
