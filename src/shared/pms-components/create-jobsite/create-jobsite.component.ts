import { UniquePipe } from './../../pipe/unique/unique.pipe';
import { GeoMetroApi } from './../../sdk/services/custom/GeoMetro';
import { FilterServiceApi, MetroVirtualVendorPoolApi } from '../../sdk';
import { PreloaderService } from '../../services/preloader.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'create-jobsite',
    templateUrl: './create-jobsite.component.html'
})

export class CreateJobsiteComponent implements OnInit {

    @Output() changeFilters: EventEmitter<any> = new EventEmitter<any>();
    countryddl = [];
    selectedCountry = 'none';

    stateddl = [];
    selectedState = '';

    newForm: any;
    formErrors: any;
    validationMessages: any;

    constructor(
        private _fb: FormBuilder,
        private _filterService: FilterServiceApi,
        private _geoMetroApi: GeoMetroApi,
        private _preloaderService: PreloaderService,
        private _metroVirtualVendorPool: MetroVirtualVendorPoolApi,
    ) { }

    buildForm(): void {
        this.newForm = {
            countryid: 'none',
            stateid: '',
            ZipCode: '',
            City: '',
            Street: ''
        };
    }

    ngOnInit() {
        this.buildForm();
        this.loadCountries();
        this.formErrors = {
            countryid: '',
            stateid: '',
            ZipCode: '',
            City: '',
            Street: ''
        };

        this.validationMessages = {
            countryid: 'Country is required.',
            stateid: 'State is required.',
            ZipCode: 'ZipCode is required.',
            City: 'City is required.',
            Street: 'Street is required.'
        };
    }

    validateForm() {
        //  console.log('validate called', this.newForm);
        let validationError = false;
        const form = this.newForm;
        // tslint:disable-next-line:forin
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form[field];
            if (control === '') {
                const message = this.validationMessages[field];
                this.formErrors[field] = message;
                validationError = true;
            }
        }
        // console.log('validationError>>', validationError);
        if (validationError) {
            return false;
        }
        return true;
    }

    loadCountries() {
        this._preloaderService.showPreloader();
        const req = { 'models': ['Country'] }
        this._geoMetroApi.find({
            fields: ['Country__c', 'GEO_Country__c', 'GEO_Description__c', 'Region__c', 'Name'],
            order: 'Country__c'
        }).subscribe(
            records => {
                this.countryddl = records;
                let filter = {
                    fields: ['Country__c']
                }
                this._metroVirtualVendorPool.find(filter).subscribe(result => {
                    let metroCountry = new UniquePipe().transform(
                        result,
                        'Country__c'
                    ).map((o) => o['Country__c'])
                    this.countryddl.map(item => {
                        if (metroCountry.indexOf(item.Country__c) === -1) {
                            item.Country__c = item.Country__c + ' (' + item['GEO_Country__c'] + ') ' + '- Special Request'
                        } else {
                            item.Country__c = item.Country__c + ' (' + item['GEO_Country__c'] + ') '

                        }
                    });
                    this._preloaderService.hidePreloader();

                }, err => {
                    console.log('Error in getting Metro Vendor Pool Country List.')
                })

            },
            err => {
                console.log('Error fetching countries>>', err.message);
                this._preloaderService.hidePreloader();
            }
        );
    }

    loadStatesByCountry(country) {
        if (country === 'none') {
            this.stateddl = [];
            this.formErrors.countryid = '';
        } else if (country === '') {
            this.formErrors.countryid = "Selected Country's 'CountryCode' is Missing.";
        } else {
            this._preloaderService.showPreloader();
            const req = {
                'countryId': country,
                'models': ['State'],
            }
            this.stateddl = [];
            this._filterService.getAllFiltersData(req).subscribe(
                data => {
                    if (data.data) {
                        data = data.data;
                        if (data['states']['list']) {
                            data['states']['list'].forEach(item => {
                                if (item['State_Province__c']) {
                                    this.stateddl.push(item);
                                }
                            });
                        }
                    }
                    this._preloaderService.hidePreloader();
                },
                error => {
                    this._preloaderService.hidePreloader();
                    console.log('Error fetching states>>', error.message);
                }
            );
        }
    }


    filterByCountry() {
        this.newForm.stateid = '';
        this.loadStatesByCountry(this.newForm.countryid);
        this.changeFilters.emit({
            data: this.newForm
        });

    }

    searchServiceZone() {
        this.changeFilters.emit({
            data: this.newForm
        });
    }
}
