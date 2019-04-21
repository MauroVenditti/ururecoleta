import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(
    private _ls: LoginService,
    // private _us: UsuariosService,
    // private nativeStorage: NativeStorage,
    // private platform: Platform,
    private router: Router
  ) { }

  ngOnInit() {
    if (this._ls.estaLogeado()) {
      this.router.navigateByUrl('promociones');
    }
  }

  login(proveedor: string) {
    this._ls.login(proveedor).then(res => {
      console.log(res);
      if (res) {
        this.router.navigateByUrl('promociones');
      } else {
        // Cartel de error
      }
    });
  }

}
