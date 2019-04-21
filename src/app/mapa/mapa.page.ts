import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, featureGroup, GeoJSON, icon, DomUtil, DomEvent } from 'leaflet';
import { PoisService } from '../services/pois.service';
import { API_IMAGENES } from '../config/config';
import { MapaService } from '../services/mapa.service';
declare var L: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: Map;
  lat: any = '';
  lng: any = '';
  template: any = '';

  constructor(
    public _pois: PoisService,
    private mapaService: MapaService
  ) { }

  ngOnInit() {
    this.loadmap();
  }

  loadmap() {
    setTimeout(() => {
      this.map = new Map('map').setView([this.lat, this.lng], 8);

      this.template = '<form id="popup-form">\
                      New speed:\
                      <input id="input-speed" class="popup-input" type="number" />\
                      <table class="popup-table">\
                        <tr class="popup-table-row">\
                          <th class="popup-table-header">Arc numer:</th>\
                          <td id="value-arc" class="popup-table-data"></td>\
                        </tr>\
                        <tr class="popup-table-row">\
                          <th class="popup-table-header">Current speed:</th>\
                          <td id="value-speed" class="popup-table-data"></td>\
                        </tr>\
                      </table>\
                      <button id="button-submit" type="button">Save Changes</button>\
                    </form>';

      const greenIcon = icon({
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      });

      tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        // tslint:disable-next-line:max-line-length
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18
      }).addTo(this.map);

      this.map.locate({
        setView: true,
        maxZoom: 15
      }).on('locationfound', (e) => {
        const markerGroup = featureGroup();
        const marcador: any = marker([e.latitude, e.longitude], {icon: greenIcon}).on('click', () => {
          alert('Marker clicked');
        });
        markerGroup.addLayer(marcador);
        this.map.addLayer(markerGroup);
        }).on('locationerror', (err) => {
          alert(err.message);
      });

      // Puntos de Interes
    // let geoJson_uri = 'assets/mapas/map.geojson';

    const geoJson_uri = '';
    this.mapaService.getMarkers().subscribe((resultado: any) => {
      // geoJson_uri = resultado;
      console.log('Mapa:', resultado);
      const geojsonlayer = new GeoJSON(resultado.data, {
        pointToLayer: function (feature, latlng) {
          return marker(latlng, {icon: greenIcon} );
        },
        onEachFeature: function(feature, layer) {
          console.log('Feature', feature.properties.img);
          let imagen = '';
          if (feature.properties.img !== null) {
            if (feature.properties.img.length > 0) {
              imagen = API_IMAGENES + '/' + feature.properties.img[0].img;
            } else {
              imagen = API_IMAGENES + '/' + feature.properties.img;
            }
          }
          // layer.bindPopup(feature.properties['titulo'])
          let cuerpoPopUp = '';
          cuerpoPopUp += '<b>' + feature.properties['titulo'] + '</b>';
          cuerpoPopUp += '<div><img style="width:100%" src="' + imagen + '" alt="image" /></div>';
          cuerpoPopUp += '<p>' + feature.properties['descripcion'] + '</p>';
          cuerpoPopUp += '<button ion-button id="btn-mas" ><ion-icon name="menu"></ion-icon>Leer Más</button>';
                  // <button ion-button (click)="itemTapped($event, item)">Leer Más</button>';
          layer.bindPopup( cuerpoPopUp, {minWidth : 256} );

        }
      })
      .addTo(this.map);
      geojsonlayer.on('click', function(e) {
        // console.log(e.layer);
        console.log(e.layer._popup);
      });
    });

    }, 50);
  }

  layerClickHandler(e) {
  console.log('ClickHandler:', e);
  // tslint:disable-next-line:no-shadowed-variable
  const marker = e.target,
        properties = e.target.feature.properties;

   // Check if a popup was previously set if so, unbind
    if (marker.hasOwnProperty('_popup')) {
      marker.unbindPopup();
    }

   // Create new popup from template and open it
    marker.bindPopup(this.template);
    marker.openPopup();

   // Now that the popup is open and the template converted to HTML and
   // attached to the DOM you can query for elements by their ID

    L.DomUtil.get('value-arc').textContent = properties.arc;
    L.DomUtil.get('value-speed').textContent = properties.speed;

    const inputSpeed = L.DomUtil.get('input-speed');
    inputSpeed.value = properties.speed;
    // tslint:disable-next-line:no-shadowed-variable
    L.DomEvent.addListener(inputSpeed, 'change', function (e) {
      properties.speed = e.target.value;
    });

    const buttonSubmit = L.DomUtil.get('button-submit');
    // tslint:disable-next-line:no-shadowed-variable
    L.DomEvent.addListener(buttonSubmit, 'click', function (e) {
     // Do fancy ajax stuff then close popup
      marker.closePopup();
    });

  }

  itemTapped(item) {
    alert(item);
    console.log(item);
    // this.navCtrl.push(DetallePage, item);
  }

}
