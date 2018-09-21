import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { jobLocationMapService } from '../../services/pms/job-location.service';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'jobsite-location-map',
    templateUrl: './jobsite-location-map.component.html',
    providers: [MapService],
    styleUrls: ['./jobsite-location-map.component.css']
})

export class JobsiteLocationComponent implements OnInit, OnDestroy {
    @Input() modal = false;
    @Input() zoom = 1;
    type = false;
    positions: any = [];
    centerPoint = '0, 0';
    private subscription: Subscription;
    constructor(
        private _jobLocationMapService: jobLocationMapService,
        private cd: ChangeDetectorRef
    ) {

    }

    ngOnInit() {
        if (this.modal) {
            this._jobLocationMapService.setJobLocations([])
        }
        this.subscription = this._jobLocationMapService.getJobLocations().subscribe(data => {
            if (data.length > 0) {
                this.setMapMarkers(data);
            } else {
                this.positions = [];
            }
            this.detectChanges();
        });
    }
    detectChanges() {
        if (!this.cd['destroyed']) {
            this.cd.detectChanges();
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    markerZoom(event) {
        event.target.map.panTo(event.latLng);
        event.target.map.setZoom(12);
    }

    setMapMarkers(data) {
        this.positions = [];
        if (data && data.length === 1) {
            this.centerPoint = data[0].geolocation__Latitude__s + ', ' + data[0].geolocation__Longitude__s
        }
        data.forEach(item => {
            if (item.geolocation__Latitude__s != null && item.geolocation__Longitude__s != null) {
                const obj = {};
                const marker = {
                    lat: item.geolocation__Latitude__s,
                    lng: item.geolocation__Longitude__s
                };
                obj['position'] = [marker['lat'], marker['lng']];
                obj['icon'] = '/assets/img/map/default-icon.png';
                this.positions.push(obj);
            }
        });
    }
}
