import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UniquePipe } from '../../../pipe/unique/unique.pipe';
import { OrderBy } from '../../../pipe/order/orderby.pipe';

import { PreloaderService } from '../../../services/preloader.service';
import { AppStateService } from '../../../services/app-state.service';
import { SharedService } from '../../../services/pms/shared.services';
import { MapService } from '../../../services/map.service';

import { MetroVirtualVendorPoolApi, GeoMetroApi } from '../../../sdk';

@Component({
    selector: 'coverage-map',
    templateUrl: './coverage-map.component.html',
    styleUrls: ['./coverage-map.component.css'],
    providers: [MapService]
})

export class CoverageMapComponent implements OnInit, OnDestroy {

    selectedAccountId: string;
    private sub: any;
    programParamsSFDCID: any;
    errorMessage = 'Loading...';
    zoomm = 2;
    private userType: any;
    tabActiveId = '3PS';
    type = false;
    positions: any ;
    showProviderCost = false;
    compliancesData: any;
    cloneCompliancesData: any;
    accountMarkerLocation: any;
    markerInstance: any;
    subscription: Subscription;
    headTitle = 'Programs: IRON Global Service Locator';
    // coverage hours list
    coverageHours = [
        {
            'sfdcId': '9H5D',
            'Name': 'Next Business Day, Business Hours (9H5D)'
        },
        {
            'sfdcId': 'Day',
            'Name': 'Same Day, Business Hours (Day)'
        },
        {
            'sfdcId': 'AFTH',
            'Name': 'Same Day, After Hours (AFTH)'
        },
        {
            'sfdcId': 'WKND',
            'Name': 'Weekend Coverage (WKND)'
        },
        {
            'sfdcId': 'HLDY',
            'Name': 'Holiday Coverage (HLDY)'
        }
    ];
    isInternalUser = false;
    threePsLabel: string;
    threePlLabel: string;

    constructor(
        private _route: ActivatedRoute,
        private _uniquePipe: UniquePipe,
        private mapService: MapService,
        private _sharedservice: SharedService,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _metroVirtualVendorPoolApi: MetroVirtualVendorPoolApi,
        private _geoMetroApi: GeoMetroApi
    ) { }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
        this.initialLoad();
    }

    initialLoad() {
        this.userType = this._appState.getAccessType();
        if (this.userType === 'partner') {
            this.headTitle = 'Global Service Locator';
        }
        this.sub = this._route.params.subscribe(params => {
            this.programParamsSFDCID = params['programId'];
        });
        this.getCoverageMap();
        this.threePsLabel = this.isInternalUser ? '3PS' : 'Smarthand Dispatch <br/> (3PS/FSE) Locations';
        this.threePlLabel = this.isInternalUser ? '3PL' : 'Parts Depots (3PL/FSL) <br> Locations';
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    getCoverageMap() {
        this.subscription = this._sharedservice.getUserState().subscribe(current => {
            this._preloaderService.showPreloader();
            this.compliancesData = [];
            this.errorMessage = 'Loading...';
            let accountId;
            accountId = (current.partner) ? current.partner.sfdcId : '';
            if (accountId) {
                this._appState.setSelectedAccount(accountId);
            } else if (this.selectedAccountId) {
                accountId = this.selectedAccountId;
            }
            this.showProviderCost = false;
            this.tabActiveId = '3PS';
            this.setServiceLocator(accountId)
        });
    }

    setServiceLocator(accountId) {
        const reqObject = {};
        if (this.programParamsSFDCID) {
            reqObject['programId'] = this.programParamsSFDCID;
        } else {
            reqObject['accountId'] = accountId;
        }
        this._metroVirtualVendorPoolApi.getServiceLocatorFSL(reqObject).subscribe(
            res => {
                this.compliancesData = [];
                res.forEach(element => {
                    if (element['account'] && element['GeoMetro']) {
                        element['GeoMetroName'] = element['GeoMetro']['Name'];
                        element['GEODescriptionc'] = element['GeoMetro']['GEO_Description__c'];
                        element['City__c'] = element['GeoMetro']['City__c'];
                        element['State_Province__c'] = element['GeoMetro']['State_Province__c'];
                        element['Postal_Zip_Code__c'] = element['GeoMetro']['Postal_Zip_Code__c'];
                        element['Country__c'] = element['GeoMetro']['Country__c'];
                        element['FSL_Location_Status__c'] = element['account']['FSL_Location_Status__c'];
                        element['Vendor_Type__c'] = element['account']['Vendor_Type__c'];
                        element['Coverage_Hours__c'] = this.setCoverageHoursForCompliance(element['Coverage_Hours__c']);
                        this.compliancesData.push(element);
                    }
                });
                this.filterCompliancesData(this.tabActiveId);
                this._preloaderService.hidePreloader()
            },
            err => {
                this.errorMessage = err.message;
                this._preloaderService.hidePreloader()
            })
    }
    setCoverageHoursForCompliance(coverageHour) {
        if (coverageHour && coverageHour !== '') {
            const covrghrs = coverageHour.split(';');
            covrghrs.forEach((chs, i) => {
                for (let index = 0; index < this.coverageHours.length; index++) {
                    if (chs === this.coverageHours[index].sfdcId) {
                        covrghrs[i] = this.coverageHours[index].Name;
                        break;
                    }
                }
            });
            return covrghrs.join(';');
        } else {
            return '';
        }
    }
    filterCompliancesData(vendor_Type) {
        if (vendor_Type === '3PS') {
            this.tabActiveId = '3PS';
        } else {
            this.tabActiveId = '3PL/FSL';
            this.showProviderCost = false;
        }
        this.compliancesData = new UniquePipe().transform(this.compliancesData, 'GeoMetroName', null, null);
        if (vendor_Type === '3PS') {
            this.compliancesData = new OrderBy().transform(this.compliancesData, ['GeoMetroName']);
        } else {
            this.compliancesData = new OrderBy().transform(this.compliancesData, ['GEODescriptionc']);
        }
        this.cloneCompliancesData = this.compliancesData.filter(data =>
            (data.account.Vendor_Type__c && data.account.Vendor_Type__c.indexOf(this.tabActiveId) !== -1));
        this.setMapMarkers();
        this.errorMessage = this.cloneCompliancesData.length ? '' : 'No record Found';
    }

    setMapMarkers() {
        this.positions = [];
        const filterdata = this.cloneCompliancesData;
        filterdata.forEach(element => {
            if (element.Geo_Location_Latitude__c && element.Geo_Location_Longitude__c) {
                const accountLocation = {
                    'GEO_Description__c': element['GeoMetro']['GEO_Description__c'],
                    'Country__c': element['Country__c'],
                    'Street__c': element['Street__c'],
                    'City__c': element['City__c'],
                    'State__c': element['State__c'],
                    'Postal_Zip_Code__c': element['Postal_Zip_Code__c']
                };
                const obj = {};
                const marker = {
                    lat: element.Geo_Location_Latitude__c,
                    lng: element.Geo_Location_Longitude__c
                };
                obj['accountLocation'] = accountLocation;
                obj['id'] = element['id'];
                obj['position'] = [marker['lat'], marker['lng']];
                if (element.Vendor_Type__c && element.Vendor_Type__c.toLowerCase() === '3ps') {
                    obj['icon'] = '/assets/img/map/blue-icon.png';
                } else {
                    obj['icon'] = '/assets/img/map/default-icon.png';
                }
                this.positions.push(obj)
            }
        });
        this._preloaderService.hidePreloader();
    }

    togglePriceList(type?: string) {
        this.showProviderCost = !this.showProviderCost;
        if (type === '3PL') {
            this.showProviderCost = false;
        }
    }
    openMapInfo({ target: marker }, obj) {
        this.markerInstance = marker;
        marker.nguiMapComponent.closeInfoWindow('Infowindow', marker);
        this.accountMarkerLocation = obj;
        marker.nguiMapComponent.openInfoWindow('Infowindow', marker);
    }
    closeMapInfo() {
        if (this.markerInstance && this.markerInstance.nguiMapComponent) {
            this.markerInstance.nguiMapComponent.closeInfoWindow('Infowindow', this.markerInstance);
        }
    }
}
