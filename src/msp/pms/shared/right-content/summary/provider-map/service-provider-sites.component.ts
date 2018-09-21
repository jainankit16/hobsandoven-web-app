import { Component, OnInit } from '@angular/core'
import { SharedService } from '../../../../../../shared/services/pms/shared.services';
import { AccountApi } from '../../../../../../shared/sdk/services/custom/Account';
import { MapService } from '../../../../../../shared/services/map.service';

@Component({
    selector: 'service-provider-sites',
    templateUrl: './service-provider-sites.component.html',
    providers: [MapService]
})

@Component({
    selector: 'service-provider-sites',
    templateUrl: './service-provider-sites.component.html',
    providers: [MapService]
})

export class ServiceProviderComponent implements OnInit {
    providersMap: any;
    zoomm = 1;
    type = false;
    positions: any = [];

    constructor(private _sharedService: SharedService, private _accountApi: AccountApi) { }

    ngOnInit() {
        this._sharedService.getAllProviders().subscribe(data => {
            if (data && data.length > 0) {
                this.setMapMarkers(data);
            }
        })
    }
    setMapMarkers(accounts) {
        this.positions = [];
        if (accounts.length > 0) {
            accounts.forEach(item => {
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
}
