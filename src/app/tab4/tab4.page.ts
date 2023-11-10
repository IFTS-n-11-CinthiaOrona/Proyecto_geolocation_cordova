import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  localizacion: string[] = [];

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
  }

  geoLocalizar() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.localizacion.push("Longitud: " + resp.coords.longitude + " - Latitud: " + resp.coords.latitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


}
