import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.drawMap();
  }

  drawMap() {

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: { lat: 23.777176, lng: 90.399452 },
      mapTypeId: 'terrain'
    });

    this.mapService.getMapData().subscribe(data => {
      let mapPath = new google.maps.Polyline({
        path: data,
        geodesic: true,
        strokeColor: '#000000',
        strokeOpacity: 2.0,
        strokeWeight: 4
      });
      mapPath.setMap(map);

      data.forEach(item => {
        let location = item;
        let marker = new google.maps.Marker({
          position: location,
          map: map,
          title: item.time !== '0' ? item.time : ''
        });
      })
    });
  }


}
