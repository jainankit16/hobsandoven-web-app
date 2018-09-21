import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../../../services/pms/shared.services';

@Component({
    selector: 'regions-list',
    templateUrl: './regions-list.component.html',
    styleUrls: ['./regions-list.component.css']
})

export class RegionsListComponent implements OnInit, OnDestroy {

    @Input() page: string;
    regions = [
        { 'sfdcId': 'All Regions', 'Name': 'All Regions' },
        { 'sfdcId': 'Africa', 'Name': 'Africa' },
        { 'sfdcId': 'APAC', 'Name': 'APAC' },
        { 'sfdcId': 'EU', 'Name': 'EU' },
        { 'sfdcId': 'LATAM', 'Name': 'LATAM' },
        { 'sfdcId': 'Middle-East', 'Name': 'Middle-East' },
        { 'sfdcId': 'Rest Of Europe', 'Name': 'Rest Of Europe' },
        { 'sfdcId': 'USCA', 'Name': 'USCA' },
    ];
    selectedRegionId = 'All Regions';
    private subscription: Subscription;
    userState = {};

    constructor(
        private _sharedService: SharedService,
    ) { }

    ngOnInit() {
        // read shared service for service manager
        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
        });
        // set selected region
        if (this.userState['servicemanager']['region']) {
            this.selectedRegionId = this.userState['servicemanager']['region']['regionId'];
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    selectRegion(region) {
        this.selectedRegionId = region['sfdcId'];
        // set shared service
        this.userState['servicemanager']['region'] = {
            'regionId': region['sfdcId'],
            'regionName': region['Name']
        };
        if (this.page && this.page === 'service-manager-details') {
            delete this.userState['servicemanager']['page'];
            this.userState['servicemanager']['isCompleted'] = false;
        }
        this._sharedService.setUserState(this.userState);
    }

}
