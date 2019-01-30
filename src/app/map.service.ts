import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LatLng } from './data';
import { LatLngs } from './map-lat-lng-data';


@Injectable({
    providedIn: 'root',
})
export class MapService {

    getMapData(): Observable<LatLng[]> {
        return of(LatLngs);
    }
}