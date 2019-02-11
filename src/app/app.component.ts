import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  animateData = [];
  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.drawMap();
  }

  drawMap() {
    this.mapService.getMapData().subscribe(data => {
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: data[0]['lat'], lng: data[0]['lng'] },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      const mapPath = new google.maps.Polyline({
        path: data,
        geodesic: true,
        strokeColor: '#000000',
        strokeOpacity: 2.0,
        strokeWeight: 4
      });
      mapPath.setMap(map);

      data.forEach(item => {
        const contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h1 id="firstHeading" class="firstHeading"> Time: ' + item.gps_time + '</h1>' +
          '<div id="bodyContent">' +
          '<p><b>Speed: ' + item.speed + ' (KM/H)</b>, <b>Direction: ' + item.direction + '</b></p>' +
          '<p><b>Latitude: ' + item.lat + '</b>, <b>Longitude: ' + item.lng + '</b></p>' +
          '</div>' +
          '</div>';

        const infowindow = new google.maps.InfoWindow({
          content: contentString
        });

      let split_direction = item.direction.split("[");
      if(split_direction[0] === 'West'){
        var icon_symbol = 'assets/w.png'
      } else if(split_direction[0] === 'East'){
        var icon_symbol = 'assets/e.png'
      } else if(split_direction[0] === 'North'){
        var icon_symbol = 'assets/n.png'
      } else if(split_direction[0] === 'Northeast'){
        var icon_symbol = 'assets/ne.png'
      } else if(split_direction[0] === 'Northwest'){
        var icon_symbol = 'assets/nw.png'
      } else if(split_direction[0] === 'South'){
        var icon_symbol = 'assets/s.png'
      } else if(split_direction[0] === 'Southwest'){
        var icon_symbol = 'assets/sw.png'
      } else if(split_direction[0] === 'Southeast'){
        var icon_symbol = 'assets/se.png'
      } 
      let location = item;
      let marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: icon_symbol
      });
      
      google.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
        this.animateRoute(map);
      });

      google.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close(map, marker);
      });
      })
    });
  }

  animateRoute(map) {
    const square = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      strokeColor: '#000',
      fillColor: '#000',
      fillOpacity: 1,
      scale: 5
    };
    const line = new google.maps.Polyline({
      path: this.animateData,
      icons: [{
        icon: square,
        offset: '100%'
      }],
      map: map
    });

    let count = 0;
    const timerId = setInterval(function () {
      count = (count + 1) % 200;
      const icons = line.get('icons');
      const div = count / 2;
      icons[0].offset = div + '%';
      line.set('icons', icons);
      if (div == 99.5) {
        clearInterval(timerId);
      }
    }, 50);
  }

  movement() {
    this.mapService.getMapData().subscribe(data => {
      this.animateData = data.map(item => {
        return { lat: item.lat, lng: item.lng }
      })
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: data[0]['lat'], lng: data[0]['lng'] },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      const mapPath = new google.maps.Polyline({
        path: data,
        geodesic: true,
        strokeColor: '#000000',
        strokeOpacity: 2.0,
        strokeWeight: 4
      });
      mapPath.setMap(map);

      data.forEach(item => {
        const contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h1 id="firstHeading" class="firstHeading"> Time: ' + item.gps_time + '</h1>' +
          '<div id="bodyContent">' +
          '<p><b>Speed: ' + item.speed + ' (KM/H)</b>, <b>Direction: ' + item.direction + '</b></p>' +
          '<p><b>Latitude: ' + item.lat + '</b>, <b>Longitude: ' + item.lng + '</b></p>' +
          '</div>' +
          '</div>';

        const infowindow = new google.maps.InfoWindow({
          content: contentString
        });

      let split_direction = item.direction.split("[");
      if(split_direction[0] === 'West'){
        var icon_symbol = 'assets/se.png'
      } else if(split_direction[0] === 'North'){
        var icon_symbol = 'assets/n.png'
      } else if(split_direction[0] === 'Northeast'){
        var icon_symbol = 'assets/ne.png'
      }
      let location = item;
      let marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: icon_symbol
      });
      
      google.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
        this.animateRoute(map);
      });

      google.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close(map, marker);
      });
      })
      this.animateRoute(map);
    });
  }

}
