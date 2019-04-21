import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-mispromociones',
  templateUrl: './mispromociones.page.html',
  styleUrls: ['./mispromociones.page.scss'],
})
export class MispromocionesPage implements OnInit {

  public promocionesLocales: any[];

  constructor(
    private router: Router,
    private _ls: LoginService,
    private _storage: StorageService
  ) { }

  ngOnInit() {
    this._ls.estadoLogin.subscribe(estado => {
      console.log('Estado Login:', estado);
      if (estado) {
        this.obtenerPromociones()
            .then((resp: any) => {
              console.log('Ya esta');
            });
      } else {
        this.router.navigate(['registro']);
      }
    });
  }

  obtenerPromociones(): Promise<any> {
    this.promocionesLocales = [];
    return this._storage.obtener('Promociones', 'JSON')
        .then((resp: any) => {
          console.log('MIS', resp);
          return this.promocionesLocales.push(resp);
        });
  }

  promociones() {
    this.router.navigate(['promociones']);
  }

  salir() {
    this._ls.logout();
  }

}
