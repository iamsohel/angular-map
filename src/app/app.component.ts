import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private mapService: MapService) {
    // this.mapService.getFileData()
    //     .subscribe(data => console.log(data));
   }

  ngOnInit() {
    this.drawMap();
  }

  drawMap() {

    this.mapService.getMapData().subscribe(data => {
  
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: data[0]['lat'], lng: data[0]['lng'] },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      let mapPath = new google.maps.Polyline({
        path: data,
        geodesic: true,
        strokeColor: '#000000',
        strokeOpacity: 2.0,
        strokeWeight: 4
      });
      mapPath.setMap(map);

      data.forEach(item => {

        var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading"> Time: '+item.gps_time+'</h1>'+
        '<div id="bodyContent">'+
        '<p><b>Speed: '+item.speed+' (KM/H)</b>, <b>Direction: '+item.direction+'</b></p>' +
        '<p><b>Latitude: '+item.lat+'</b>, <b>Longitude: '+item.lng+'</b></p>'+
        '</div>'+
        '</div>';
      
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

        let location = item;
        let marker = new google.maps.Marker({
          position: location,
          map: map,
          //title: item.gps_time !== '0' ? item.gps_time : '',
         icon: 'assets/car.png'
        });
        // marker.addListener('click', function() {
        //   infowindow.open(map, marker);
        // });

        google.maps.event.addListener(marker, 'mouseover', function () {
          infowindow.open(map, marker);
        });
        
        google.maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close(map, marker);
        });

        this.animateRoute(map);

      })
    });
  }

  animateRoute(map) {
    let  square = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,//'M -2,-2 2,-2 2,2 -2,2 z', // 'M -2,0 0,-2 2,0 0,2 z',
      strokeColor: '#000',
      fillColor: '#000',
      fillOpacity: 1,
      scale: 5
    };
  
    let line = new google.maps.Polyline({
      path: [{lat: 24.853998, lng: 89.349743}, {lat: 24.864243, lng: 89.351716}],
      icons: [{
        icon: square,
        offset: '100%'
      }],
      map: map
    });

    let count = 0;
    window.setInterval(function() {
        count = (count + 1) % 200;
        let icons = line.get('icons');
        icons[0].offset = (count / 2) + '%';
        line.set('icons', icons);
    }, 50);
  }

}
