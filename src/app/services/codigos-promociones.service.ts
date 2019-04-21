import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CodigosPromocionesService {

  promocionesLocal: any[] = [];

  constructor(
    private _storage: StorageService
  ) { }

  promocionesGuardadas() {
    this.promocionesLocal = [];
    this._storage.obtener('Promociones')
        .then((resp: any) => {
          this.promocionesLocal.push(resp);
        });
  }

  guardarPromocion(promocion: any) {
    this.promocionesLocal.push(promocion);
    this._storage.guardar('Promociones', this.promocionesLocal, 'JSON');
  }

  obtenerPromociones() {
    return this.promocionesLocal;
  }

  eliminarPromocion() {

  }

  eliminarPromociones() {

  }
}
