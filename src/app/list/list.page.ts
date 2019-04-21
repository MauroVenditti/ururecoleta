import { Component, OnInit } from '@angular/core';
import { sinImagen } from '../config/config';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PoisService } from '../services/pois.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  selectedItem: any;
  items: any = [];
  imagen: any = sinImagen;

  constructor(
    public _pois: PoisService,
    public _us: UsuariosService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.selectedItem = this.route.snapshot.params['item'];
  }

  ngOnInit() {
    this.obtenerPois();
  }

  obtenerPois() {
    this._pois.obtenerPois(this._us.idioma)
        .subscribe( (resp: any) => {
          console.log(resp);
          const features = resp.data['features'];
          this.items.push(features);
          // this.items.push(features);
          console.log(this.items);
        });
  }

  itemTapped(event, item) {
    // console.log(item);
    this.router.navigate(['/detalle', item ]);
  }

}
