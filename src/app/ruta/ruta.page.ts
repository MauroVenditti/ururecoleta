import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeoJson } from '../models/mapa.interface';
import { ActivatedRoute } from '@angular/router';
import { PoisService } from '../services/pois.service';
import { UsuariosService } from '../services/usuarios.service';
// import leaflet from 'leaflet';
declare var L: any;

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
})
export class RutaPage implements OnInit {

  @ViewChild('mapa') mapContainer: ElementRef;
  selectedItem: GeoJson;
  mapa: any;
  idRecibido = '';

  constructor(
    private route: ActivatedRoute,
    private _pois: PoisService,
    private _us: UsuariosService
  ) { }

  ngOnInit() {
    this.idRecibido = this.route.snapshot.paramMap.get('id');
    console.log(this.idRecibido);
    this.obtener_detalle();
  }

  obtener_detalle() {
    console.log(this._us.idioma);
    this._pois.obtenerPoi(this.idRecibido, this._us.idioma)
        .subscribe( (resp: any) => {
          console.log(resp.data);
          this.selectedItem = resp.data.features[0];
          this.ruta();
        });
  }

  ruta() {
    this.mapa = L.map('mapa');

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        // tslint:disable-next-line:max-line-length
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18
      }).addTo(this.mapa);

    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    // tslint:disable-next-line:max-line-length
    //  attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //  maxZoom: 18,
    //  id: 'mapbox.streets',
    //  accessToken: 'pk.eyJ1IjoibXRjc2lzdGVtYXMiLCJhIjoiY2ptd2tqZHJjMGFwcjNwdG5qZDdvODNzaSJ9.hNsR6bT_HlQVWFTRurX8-g'
    // }).addTo(this.mapa);

    const latlng_hasta = this.selectedItem.geometry.coordinates;
    this.mapa.locate().on('locationfound', (e) => {
      console.log(latlng_hasta);
      const x1 = latlng_hasta[0];
      const x2 = latlng_hasta[1];
       console.log(x1, x2);
      L.Routing.control({
        waypoints: [
          L.latLng(e.latitude, e.longitude),
          L.latLng(x2, x1)
        ],
        language: 'es',
        routeWhileDragging: true
      }).addTo(this.mapa);

    });
  }

}
