import { UniquePipe } from './../../pipe/unique/unique.pipe';
import { GeoMetroApi } from './../../sdk/services/custom/GeoMetro';
import { FilterServiceApi, MetroVirtualVendorPoolApi } from '../../sdk';
import { PreloaderService } from '../../services/preloader.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
    selector: 'upload-jobsite',
    templateUrl: './upload-jobsite.component.html'
})
export class UploadJobsiteComponent implements OnInit {
    form: FormGroup;
    errorMessage = '';
    nextStep = false;
    fieldvalidation = true;
    items: any;
    jobsites = [];
    validationError = [];
    countryValid = [];
    cityValid = [];
    stateValid = [];
    streetValid = [];
    zipcodeValid = [];
    files: FileList;

    constructor(
        private _fb: FormBuilder,
        private _filterService: FilterServiceApi,
        private _geoMetroApi: GeoMetroApi,
        private _preloaderService: PreloaderService,
        private _metroVirtualVendorPool: MetroVirtualVendorPoolApi,
        private _modalService: ModalService
    ) { }


    ngOnInit() {
        this.jobsites = [];
        this.form = this._fb.group({
            items: this._fb.array([this.createItem()])
        });

        for (let index = 0; index < 99; index++) {
            this.items = this.form.get('items') as FormArray;
            this.items.push(this.createItem());
        }
    }

    onSubmit() {
        let count = 0;
        this.fieldvalidation = true;
        this.validationError = [];

        this.form.value.items.forEach((item, index) => {
            let countryValid = true;
            let cityValid = true;
            let stateValid = true;
            let streetValid = true;
            let zipcodeValid = true;

            if (item.city && item.country && item.state && item.street && item.zipcode) {
                count++;
            }
            else {
                let fieldCount = 0;
                if (item.city) {
                    fieldCount++;
                }
                else {
                    cityValid = false;
                }

                if (item.country) {
                    fieldCount++;
                }
                else {
                    countryValid = false;
                }

                if (item.state) {
                    fieldCount++;
                }
                else {
                    stateValid = false;
                }

                if (item.street) {
                    fieldCount++;
                }
                else {
                    streetValid = false;
                }

                if (item.zipcode) {
                    fieldCount++;
                }
                else {
                    zipcodeValid = false;
                }
                if (fieldCount > 0 && fieldCount < 5) {
                    this.fieldvalidation = false;
                    if (!countryValid) {
                        this.countryValid[index] = true
                    }
                    if (!cityValid) {
                        this.cityValid[index] = true
                    }
                    if (!streetValid) {
                        this.streetValid[index] = true
                    }
                    if (!stateValid) {
                        this.stateValid[index] = true
                    }
                    if (!zipcodeValid) {
                        this.zipcodeValid[index] = true
                    }
                }
            }

        })

        this._preloaderService.showPreloader();
        if (count > 0 && this.fieldvalidation == true) {
            const uploaddata = [];
            this.form.value.items.forEach((item, index) => {
                if (item.city) {
                    uploaddata.push(item)
                }
            })
            this.jobsites = uploaddata;
            let duplicateCount = false;
            for (var i = 0; i < this.jobsites.length; i++) {
                for (var j = i; j < this.jobsites.length; j++) {
                    if (i != j && this.jobsites[i].country === this.jobsites[j].country &&
                        this.jobsites[i].state === this.jobsites[j].state &&
                        this.jobsites[i].street === this.jobsites[j].street &&
                        this.jobsites[i].zipcode === this.jobsites[j].zipcode
                        && this.jobsites[i].city === this.jobsites[j].city) {
                        this.countryValid[i] = true;
                        this.countryValid[j] = true;
                        this.cityValid[i] = true
                        this.cityValid[j] = true
                        this.streetValid[i] = true
                        this.streetValid[j] = true
                        this.stateValid[i] = true
                        this.stateValid[j] = true
                        this.zipcodeValid[i] = true
                        this.zipcodeValid[j] = true
                        duplicateCount = true;
                    }
                }

            }

            if (duplicateCount) {
                this.errorMessage = 'Please remove the duplicate entries.'
                this.nextStep = false;
                this._preloaderService.hidePreloader();
            } else {
                this.errorMessage = ''
                this.nextStep = true;
                this.countryValid = [];
                this.cityValid = [];
                this.stateValid = [];
                this.streetValid = [];
                this.zipcodeValid = [];
            }
        } else {
            this.errorMessage = 'Please add all required fields to create jobsite.'
            this.nextStep = false;
            this._preloaderService.hidePreloader();
        }
    }

    onJobChange(index) {
        this.countryValid[index] = false;
        this.cityValid[index] = false;
        this.stateValid[index] = false;
        this.streetValid[index] = false;
        this.zipcodeValid[index] = false;
    }

    preStage(event) {
        if (event.data) {
            this.nextStep = false;
            this.fieldvalidation == false
        }

    }
    createItem(): FormGroup {
        return this._fb.group({
            country: [null, Validators.required],
            state: [null, [Validators.required]],
            street: [null, Validators.required],
            zipcode: [null, Validators.required],
            city: [null, Validators.required]
        });
    }
    closeModel() {
        this._modalService.closed();
    }

    public uploadCsv(files) {
        files = this.files;
        this.errorMessage = '';
        this.form.reset();
        this.countryValid = [];
        this.cityValid = [];
        this.stateValid = [];
        this.streetValid = [];
        this.zipcodeValid = [];
        if (files && files.length > 0) {
            let file: File = files.item(0);
            let reader: FileReader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                let csv: string = reader.result;
                let csvData = csv;
                let allTextLines = csvData.split(/\r\n|\n/);
                let headers = allTextLines[0].split(',');
                if (headers.length !== 5) {
                    this.errorMessage = 'Please put Country, State, Zip, City, Street in first line'
                }
                else if (headers[0] != 'Country' || headers[1] != 'State' || headers[2] != 'Zip' || headers[3] != 'City' || headers[4] != 'Street') {
                    this.errorMessage = 'Please put Country, State, Zip, City, Street in first line'
                }
                else if (allTextLines.length > 102) {
                    this.errorMessage = 'Max no. of jobsites can be uploaded is 100.'
                } else {
                    let duplicateCount = false;
                    for (var k = 0; k < allTextLines.length; k++) {
                        for (var j = k; j < allTextLines.length; j++) {
                            if (k != j && allTextLines[k] === allTextLines[j]) {
                                duplicateCount = true;
                            }
                        }
                    }
                    if (duplicateCount) {
                        this.errorMessage = 'Please remove the duplicate entries.'
                    }
                    else {
                        for (let i = 0; i < allTextLines.length; i++) {
                            // split content based on comma
                            let data = allTextLines[i].split(',');
                            if (data.length == headers.length && data[0] != 'Country') {
                                this.form.controls.items['controls'][i - 1].controls.country.setValue(data[0]);
                                this.form.controls.items['controls'][i - 1].controls.state.setValue(data[1]);
                                this.form.controls.items['controls'][i - 1].controls.zipcode.setValue(data[2]);
                                this.form.controls.items['controls'][i - 1].controls.city.setValue(data[3]);
                                this.form.controls.items['controls'][i - 1].controls.street.setValue(data[4]);
                            }
                        }
                    }
                }
            }
        }
        else {
            this.errorMessage = 'Please upload the file.'
        }
    }

    getFiles(event) {
        this.files = event.target.files;
        this.errorMessage = ''
    }

}
