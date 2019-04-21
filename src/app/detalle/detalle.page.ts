import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { imgCargando } from '../config/config';
import { Router, ActivatedRoute } from '@angular/router';
import { PoisService } from '../services/pois.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  selectedItem: any = {
    properties: {
      img: [imgCargando],
      titulo: '',
      direccion: '',
      descripcion: ''
    }
  };
  parametros: any;
  idRecibido = '';
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _pois: PoisService,
    private _us: UsuariosService
  ) {
    this.idRecibido = this.route.snapshot.params['id'];
    console.log(this.idRecibido);
  }

  ngOnInit() {
    this.obtener_detalle();
  }

  itemTapped(event, item) {
    this.router.navigate(['/ruta', item ]);
  }

  obtener_detalle() {
    console.log(this._us.idioma);
    this._pois.obtenerPoi(this.idRecibido, this._us.idioma)
        .subscribe( (resp: any) => {
          console.log(resp.data);
          this.selectedItem = resp.data.features[0];
        });
  }

}
