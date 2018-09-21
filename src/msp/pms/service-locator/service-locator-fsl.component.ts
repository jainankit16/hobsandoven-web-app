import { Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MetroVirtualVendorPoolApi, GeoMetroApi, AssetGroupApi } from './../../../shared/sdk';

import { UniquePipe } from './../../../shared/pipe/unique/unique.pipe';
import { OrderBy } from './../../../shared/pipe/order/orderby.pipe';

import { PreloaderService } from './../../../shared/services/preloader.service';
import { SharedService } from './../../../shared/services/pms/shared.services';
import { AppStateService } from './../../../shared/services/app-state.service';
import { MapService } from './../../../shared/services/map.service';

import { MapUtility } from './../../../shared/libs/utils';

@Component({
    selector: 'app-service-locator-fsl',
    templateUrl: './service-locator-fsl.component.html',
    styleUrls: ['./service-locator-fsl.component.css'],
    providers: [MapService, MapUtility]
})

export class ServiceLocatorFslComponent implements OnInit, OnDestroy {

    selectedAccountId: string;
    programSFDCID: any;
    formSearch: FormGroup;
    errorMessage = 'Loading...';
    filterCondition = {}
    zoomm = 2;
    isSearch = false;
    searchLatLog = [];
    positions: any = [];
    compliancesData = [];
    dllAssestModel: any;
    cloneCompliancesData: any;
    accountMarkerLocation: any;
    markerInstance: any;
    subscription: Subscription;
    /*Filter Condition*/
    radius_kms = 50; // for selected radius ddl in Search form
    active = true;   // for checked active in Search form
    passive = true;  // for checked passive in Search form
    radius = '1';    // for selected InMiles radius in Search form.

    constructor(
        private _fb: FormBuilder,
        private _uniquePipe: UniquePipe,
        private _mapUtility: MapUtility,
        private _sharedservice: SharedService,
        private _preloaderService: PreloaderService,
        private _mapService: MapService,
        private _appState: AppStateService,
        private _metroVirtualVendorPoolApi: MetroVirtualVendorPoolApi,
        private _geoMetroApi: GeoMetroApi,
        private _assetGroupApi: AssetGroupApi,
    ) { }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.initialLoad();
        this.creatForms();
        this.getAssestModel();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    initialLoad() {
        this.subscription = this._sharedservice.getUserState().subscribe(current => {
            this._preloaderService.showPreloader();
            this.errorMessage = 'Loading...';
            let accountId  = (current.partner) ? current.partner.sfdcId : '';
            if (accountId) {
                this._appState.setSelectedAccount(accountId);
            } else if (this.selectedAccountId) {
                accountId = this.selectedAccountId;
            }
            this.isSearch = false;
            this.searchLatLog = [];
            this.cloneCompliancesData = [];
            this.compliancesData = [];
            this.getServiceLocator(accountId);
        });
    }

    creatForms() {
        this.formSearch = this._fb.group({
            Location_Name: [''],
            Asset_models: [''],
            Phantom: [''],
            Radius: new FormControl(this.radius),
            Radius_kms: new FormControl(this.radius_kms),
            Active: new FormControl(this.active),
            Passive: new FormControl(this.passive)
        });
    }

    getAssestModel() {
        this._assetGroupApi.find({ order: 'Name' }).subscribe(res => {
            if (res.length) {
                this.dllAssestModel = res;
            }
        }, err => {
            console.log(err);
        })
    }

    getServiceLocator(accountId) {
        this._metroVirtualVendorPoolApi.getServiceLocatorFSL({ 'accountId': accountId }).subscribe(
            res => {
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
                        this.compliancesData.push(element);
                    }
                });
                this.compliancesData = new UniquePipe().transform(this.compliancesData, 'GEODescriptionc', null, null);
                this.compliancesData = new OrderBy().transform(this.compliancesData, ['GEODescriptionc']);
                this.compliancesData = this.compliancesData.filter(data =>
                    (data.account.Vendor_Type__c && data.account.Vendor_Type__c.indexOf('3PS') !== -1));
                this.cloneCompliancesData = this.compliancesData;
                this.setMapMarkers();
                this.errorMessage = this.cloneCompliancesData.length ? '' : 'No record Found';
                this._preloaderService.hidePreloader()
            },
            err => {
                this.errorMessage = err.message;
                this._preloaderService.hidePreloader()
            })
    }

    Search() {
        this._preloaderService.showPreloader();
        let LatLong;
        const location_Name = this.formSearch.value['Location_Name'].trim();
        const radius_kms = Number(this.formSearch.value['Radius_kms'])
        const radius = parseInt(this.formSearch.value['Radius'], 10);
        const asset_models = this.formSearch.value['Asset_models']
        const active = this.formSearch.value['Active']
        const passive = this.formSearch.value['Passive']
        const Phantom = this.formSearch.value['Phantom']
        const searchFilter = { 'radius': radius };
        searchFilter['radius_kms'] = radius_kms;
        if (location_Name) {
            searchFilter['location_Name'] = location_Name;
        }
        if (active) {
            searchFilter['FSL_Location_Active'] = 'Active';
        }
        if (passive) {
            searchFilter['FSL_Location_Passive'] = 'Passive';
        }
        if (Phantom) {
            searchFilter['FSL_Location_Phantom'] = 'Phantom';
        }
        if (asset_models) {
            searchFilter['asset_models'] = asset_models;
        }
        if (location_Name) {
            LatLong = this.getGeoMetroLatLon(searchFilter);
        } else {
            this.filterCompliancesData(searchFilter, LatLong);
            this.errorMessage = this.cloneCompliancesData.length ? '' : 'There are no FSLs nearby'
        }
    }

    GlobalSearch() {
        this.isSearch = false;
        this.searchLatLog = [];
        this.creatForms();
        this.cloneCompliancesData = this.compliancesData;
        this.setMapMarkers();
    }

    filterCompliancesData(searchFilter, LatLong) {
        const filtedobject = this.compliancesData;
        this.cloneCompliancesData = [];
        filtedobject.map(data => {
            let result = false;
            let isActive = false;
            let isPassive = false;
            let isPhantom = false;
            if (searchFilter.FSL_Location_Active &&
                (data.FSL_Location_Status__c && data.FSL_Location_Status__c.indexOf(searchFilter.FSL_Location_Active) !== -1)) {
                isActive = true;
            }
            if (searchFilter.FSL_Location_Passive &&
                (data.FSL_Location_Status__c && data.FSL_Location_Status__c.indexOf(searchFilter.FSL_Location_Passive) !== -1)) {
                isPassive = true;
            }
            if (searchFilter.FSL_Location_Phantom &&
                (data.FSL_Location_Status__c && data.FSL_Location_Status__c.indexOf(searchFilter.FSL_Location_Phantom) !== -1)) {
                isPhantom = true;
            }
            if (isActive || isPassive || isPhantom) {
                result = true;
            } else if (!searchFilter.FSL_Location_Active &&
                !searchFilter.FSL_Location_Passive && !searchFilter.FSL_Location_Phantom) {
                result = true;
            }
            if (searchFilter.location_Name && result) {
                if (LatLong && LatLong.Geo_Location__Latitude__s &&
                    LatLong.Geo_Location__Longitude__s &&
                    data.Geo_Location_Latitude__c &&
                    data.Geo_Location_Longitude__c) {
                    const distance = this._mapUtility.calculateDistance(LatLong.Geo_Location__Latitude__s,
                        LatLong.Geo_Location__Longitude__s,
                        data.Geo_Location_Latitude__c,
                        data.Geo_Location_Longitude__c,
                        searchFilter['radius']);
                    if (distance >= 0) {
                        result = (distance <= searchFilter.radius_kms) ? true : false;
                        data['distance'] = searchFilter['radius'] ? distance + ' mi' : distance + ' km';
                        data['status'] = data['FSL_Location_Status__c'].toLowerCase() === 'passive' ? true : false;
                        data['time'] = this._mapUtility.calculateTime(distance, searchFilter['radius']);
                        data['directionsUrl'] = 'https://www.google.com/maps/dir/' +
                            LatLong.Geo_Location__Latitude__s + ',' + LatLong.Geo_Location__Longitude__s + '/' +
                            data.Geo_Location_Latitude__c + ',' + data.Geo_Location_Longitude__c;
                    }
                } else {
                    result = false;
                }
            }
            if (searchFilter.asset_models && result) {
                if (data.Vendor__c && data.Vendor__c.indexOf(searchFilter.asset_models) !== -1) {
                    result = true;
                } else {
                    result = false;
                }
            }
            if (result) {
                this.cloneCompliancesData.push(data);
            }
        })
        if (searchFilter.location_Name && LatLong) {
            this.searchLatLog = [LatLong.Geo_Location__Latitude__s, LatLong.Geo_Location__Longitude__s]
        }
        this.isSearch = this.cloneCompliancesData.length ? true : false;
        this.setMapMarkers();
        this.errorMessage = this.cloneCompliancesData.length ? '' : 'There are no FSLs nearby'
    }

    setMapMarkers() {
        this.positions = [];
        let mapObject = {};
        let currentLocation;
        this.cloneCompliancesData.forEach(element => {
            if (element.Geo_Location_Latitude__c && element.Geo_Location_Longitude__c) {
                const accountLocation = {
                    'GEO_Description__c': element['GeoMetro']['GEO_Description__c'],
                    'Country__c': element['Country__c'],
                    'Street__c': element['Street__c'],
                    'City__c': element['City__c'],
                    'State__c': element['State__c'],
                    'Postal_Zip_Code__c': element['Postal_Zip_Code__c'],
                    'distance': element['distance'] ? element['distance'] : '',
                    'directionsUrl': element['directionsUrl'] ? element['directionsUrl'] : '',
                    'time': element['time'] ? element['time'] : '',
                    'status': element['status']
                };
                if (this.isSearch && this.searchLatLog.length && element.Geo_Location_Latitude__c == this.searchLatLog[0]) {
                    currentLocation = accountLocation;
                }
                mapObject = {};
                const marker = {
                    lat: element.Geo_Location_Latitude__c,
                    lng: element.Geo_Location_Longitude__c
                };
                mapObject['accountLocation'] = accountLocation;
                mapObject['id'] = element['id'];
                mapObject['position'] = [marker['lat'], marker['lng']];
                if (element.FSL_Location_Status__c && element.FSL_Location_Status__c.toLowerCase() === 'active') {
                    mapObject['icon'] = '/assets/img/map/default-icon.png';
                } else if (element.FSL_Location_Status__c && element.FSL_Location_Status__c.toLowerCase() === 'passive') {
                    mapObject['icon'] = '/assets/img/map/blue-icon.png';
                } else {
                    mapObject['icon'] = '/assets/img/map/cross-icon.png';
                }
                this.positions.push(mapObject)
            }
        });
        if (this.isSearch && this.searchLatLog.length) {
            mapObject = {};
            mapObject['accountLocation'] = currentLocation;
            mapObject['position'] = this.searchLatLog;
            mapObject['icon'] = '/assets/img/map/current-location-icon.png';
            this.positions.push(mapObject);
        }
        this._preloaderService.hidePreloader();
    }

    getGeoMetroLatLon(searchFilter) {
        const searchAddress = searchFilter.location_Name.trim();
        this._geoMetroApi.find({
            where:
                {
                    or: [
                        { City__c: searchAddress },
                        { Street__c: searchAddress },
                        { State_Province__c: searchAddress },
                        { Postal_Zip_Code__c: searchAddress },
                        { GEO_Description__c: { like: '%' + searchAddress + '%' } },
                    ]
                },
            limit: 1,
            fields: ['Geo_Location__Latitude__s', 'Geo_Location__Longitude__s']
        }).subscribe(res => {
            if (res.length) {
                this.filterCompliancesData(searchFilter, res[0]);
                this.errorMessage = this.cloneCompliancesData.length ? '' : 'There are no FSLs nearby'
            } else {
                this.cloneCompliancesData = [];
                this.positions = [];
                this.errorMessage = 'There are no FSLs nearby';
            }
            this._preloaderService.hidePreloader();

        }, err => {
            this._preloaderService.hidePreloader();
        })
    }

    openMapInfo({ target: marker }, obj) {
        if (obj) {
            this.markerInstance = marker;
            marker.nguiMapComponent.closeInfoWindow('Infowindow', marker);
            this.accountMarkerLocation = obj;
            marker.nguiMapComponent.openInfoWindow('Infowindow', marker);
        }
    }

    closeMapInfo() {
        if (this.markerInstance && this.markerInstance.nguiMapComponent) {
            this.markerInstance.nguiMapComponent.closeInfoWindow('Infowindow', this.markerInstance);
        }
    }
}
