import { Injectable, Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { DirectionsRenderer } from '@ngui/map';
import { Subject } from 'rxjs'

@Injectable()
export class MapService {
    @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;


    directionsRenderer: google.maps.DirectionsRenderer;
    directionsResult: google.maps.DirectionsResult;

    public direction = new Subject<any>();
    direction$ = this.direction.asObservable();

    //    public direction: any = {
    //        origin: 'Kolbotn, Rosenholmveien 25, 1414 Kolbotn, Norway',
    //        destination: 'Quality Hotel Entry, Lienga 11, 1414 Trollåsen, Norway',
    //        travelMode: 'WALKING'
    //    };

    public marker: any = { display: true };

    constructor(private cdr: ChangeDetectorRef) {

    }

    setLocation(origin: string, destination: string) {
        this.direction.next({ origin: origin, destination: destination, travelMode: 'DRIVING' });
    }

    directionsChanged() {
        if (this.directionsRenderer.getDirections()) {
            this.directionsResult = this.directionsRenderer.getDirections(), this.cdr.detectChanges();
        }

    }

    showDirection(direction) {
        // this.directionsRendererDirective['showDirections'](this.direction);
        this.directionsRendererDirective.showDirections(direction);
    }

    clicked(t) {
        var e = t.target;
        this.marker.lat = e.getPosition().lat(), this.marker.lng = e.getPosition().lng(), e.nguiMapComponent.openInfoWindow("iw", e)
    }

    log(t) {
        if (t instanceof MouseEvent) {return !1}
    }


}

