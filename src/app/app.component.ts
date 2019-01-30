import { Component, OnInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
   ngOnInit() {
      this.initMap();
   }

  initMap() {

    let marker;
    const mirpur = {lat:23.7998, lng: 90.352};
    const dhanmondi = {lat:23.746466, lng: 90.376015};

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 23.777176, lng: 90.399452},
      mapTypeId: 'terrain'
    });

    let flightPlanCoordinates = [
      {lat: 23.7998, lng: 90.352},
      {lat: 23.746466, lng: 90.376015},
      {lat: 23.759739, lng: 90.392418},
      {lat: 23.797911, lng: 90.414391},
    ];
    let flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });

    flightPath.setMap(map);

    marker = new google.maps.Marker({
      position: mirpur,
      map: map,
      title: 'Mirpur-12'
    });
    marker = new google.maps.Marker({
      position: dhanmondi,
      map: map,
      title: 'Dhanmondi'
    });
  }


}
