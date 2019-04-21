import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UsuariosService } from './usuarios.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnInit {

  private subject = new Subject<any>();

  public navItems: any[] = [];

  constructor(
    public translate: TranslateService,
    public _us: UsuariosService
  ) {
    this.genera_menu();
  }

  ngOnInit() {
    this.genera_menu();
  }

  genera_menu(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.translate.getTranslation(this._us.idioma);
      this.translate.get('PAGINAS').subscribe( (data: any) => {
        this.navItems = [
          {
            title: data.INICIO,
            url: '/home',
            icon: 'home'
          },
          {
            title: data.LISTA,
            url: '/list',
            icon: 'list'
          },
          {
            title: data.MAPA,
            url: '/mapa',
            icon: 'map'
          },
          {
            title: data.PROMOCIONES,
            url: '/promociones',
            icon: 'list'
          },
          {
            title: 'Settings',
            url: '/settings',
            icon: 'settings'
          }
        ];
        resolve(this.navItems);
      });
    });
  }

  sendMenu() {
    this.genera_menu().then((data: any) => {
      this.subject.next(data);
    });
  }

  clearMenu() {
      this.subject.next();
  }

  getMenu(): Observable<any> {
      return this.subject.asObservable();
  }

}
