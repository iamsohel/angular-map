import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { LatLng } from './data';
import { LatLngs } from './map-lat-lng-data';


@Injectable({
    providedIn: 'root',
})
export class MapService {

    constructor(private http: HttpClient){

    }

    getMapData(): Observable<LatLng[]> {
        return of(LatLngs);
    }

    getFileData():any{
        return this.http.get('assets/vehicle_data.txt', {responseType: 'text'});
    }
}