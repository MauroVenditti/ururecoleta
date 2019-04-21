import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSelect, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsuariosService } from '../../services/usuarios.service';
import { MenuService } from '../../services/menu.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() Titulo: any = 'Uru Recoleta';
  deferredPrompt: any;
  showInstallBtn = true;
  pwa_features: any;

  translate: any;
  ocultar = true;
  idiomaapp: string;
  idiomas: any[] = [];
  idRecibido = '0';
  cod_cliente = '0';
  share = {
    displayNames: true,
    config: [{
          facebook: {
            socialShareUrl: 'https://www.ururecoleta.com.ar'
          }
        }, {
          twitter: {
            socialShareUrl: 'https://www.ururecoleta.com.ar'
          }
    }]
  };
  @ViewChild('sectionSelect') sectionSelect: IonSelect;
  @ViewChild('sectionSelectArea') sectionSelectArea: any;

  constructor(
    private http: HttpClient,
    private platform: Platform,
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    // private socialSharing: SocialSharing,
    public _us: UsuariosService,
    public _menu: MenuService,
    public _storage: StorageService
  ) {
    this.idiomas = [
      {
        value: 'es',
        label: 'Español'
      },
      {
        value: 'en',
        label: 'Ingles'
      },
      {
        value: 'pt',
        label: 'Portugués'
      },
      {
        value: 'fr',
        label: 'Francés'
      }
    ];

    if (this.route.snapshot.params['cod_guia']) {
      this.idRecibido = this.route.snapshot.params['cod_guia'];
    }
    if (this.route.snapshot.params['cod_cliente']) {
      this.cod_cliente = this.route.snapshot.params['cod_cliente'];
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt Event fired');
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      this.showInstallBtn = true;
    });
   }

  ngOnInit() {
    this.ocultar = true;
    this.http.get('/assets/data.json')
    .subscribe(
      res => this.pwa_features = res['pwa_features']
    );

    if (this.deferredPrompt === undefined) {
      this.showInstallBtn = false;
    }

    if (this.cod_cliente !== '0') {
      if (this.idRecibido !== '0') {
        this._us.cod_guia = this.idRecibido;
        this._us.cod_cliente = this.cod_cliente;
        this._storage.guardar('cod_guia', this.idRecibido);
        this._storage.guardar('cod_cliente', this.cod_cliente);
      }
    }
  }

  showInstallBanner() {
    if (this.deferredPrompt !== undefined && this.deferredPrompt !== null) {
      // Show the prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        // We no longer need the prompt.  Clear it up.
        this.deferredPrompt = null;
      });
    }
  }

  choose(lang) {
    this.ocultar = false;
    this.sectionSelect.open();
    this.ocultar = true;

    if (lang.type === 'ionChange') {
      this.translateService.use(lang.detail.value);
      this.idiomaapp = lang.detail.value;
      this._us.idioma = lang.detail.value;
      this._storage.guardar('idioma', this._us.idioma);
      this.sendMenu();
    }
  }

  sendMenu() {
    this._menu.sendMenu();
  }

  clearMenu() {
      this._menu.clearMenu();
  }

  close() {
    console.log('Cerrar');
  }

}
