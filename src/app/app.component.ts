import { Component, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';
import { UsuariosService } from './services/usuarios.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy {

  public appPages; // = navItems //navItems;
  idRecibido = '';
  cod_cliente = '';
  message: any;
  subscription: Subscription;

  constructor(
    public _menu: MenuService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translateService: TranslateService,
    private _us: UsuariosService,
    private _storage: StorageService
  ) {
    this.initializeApp();
    this.subscription = this._menu.getMenu()
        .subscribe(data => {
          this.appPages = data;
        });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Genera Menu
      this._menu.genera_menu().then((data: any) => {
        this.appPages = data;
      });

      // Seteo Idioma de la app
      this.translateService.setDefaultLang('es');
      this.translateService.use('es');
      this.translateService.setDefaultLang(this._us.idioma);
      this.translateService.use(this._us.idioma);
      this._storage.guardar('idioma', this._us.idioma);

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
