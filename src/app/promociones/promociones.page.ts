import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit {

  constructor(
    private router: Router,
    private _ls: LoginService
  ) { }

  ngOnInit() {
    this._ls.estadoLogin.subscribe(estado => {
      console.log('Estado Login:', estado);
      if (estado) {

      } else {
        this.router.navigate(['registro']);
      }
    });
  }

  salir() {
    this._ls.logout();
  }

  mispromos() {
    this.router.navigate(['mispromociones']);
  }

}
