import { UniquePipe } from './../../pipe/unique/unique.pipe';
import { GeoMetroApi } from './../../sdk/services/custom/GeoMetro';
import { FilterServiceApi, MetroVirtualVendorPoolApi, JobsiteApi } from '../../sdk';
import { PreloaderService } from '../../services/preloader.service';
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/pms/shared.services';
import { ModalService } from '../../../shared/services/modal.service';
import { AlertService } from '../../services/alert.service';
import { AppStateService } from '../../services/app-state.service';

@Component({
    selector: 'upload-finaljobsite',
    templateUrl: './upload-finaljobsite.component.html',
    styleUrls: ['./upload-finaljobsite.component.css']
})

export class UploadFinalJobsiteComponent implements OnInit {

    selectedAccountId: string;
    @Output() previousStage: EventEmitter<any> = new EventEmitter<any>();
    newForm: any;
    formErrors: any;
    validationMessages: any;
    uploadform: FormGroup;
    errorMessage = '';
    successMsg = '';
    nextStep = false;
    items: any;
    item = null
    private jobsite = new Array(10);
    @Input() jobsites: any[];
    serviceZones = [];
    filteredServiceZones = [];
    userState: any = {};

    constructor(
        private _appState: AppStateService,
        private _sharedService: SharedService,
        private _fb: FormBuilder,
        private _filterService: FilterServiceApi,
        private _geoMetroApi: GeoMetroApi,
        private _preloaderService: PreloaderService,
        private _metroVirtualVendorPool: MetroVirtualVendorPoolApi,
        private _jobsiteApi: JobsiteApi,
        private _modalService: ModalService,
        private _alertService: AlertService,
    ) {
        this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
        });
    }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.serviceZones = [];
        this._preloaderService.hidePreloader();
        const uploaddata = [];
        this.jobsites.forEach((item, index) => {
            if (item.city) {
                uploaddata.push(item)
            }
        })

        this.uploadform = this._fb.group({
            items: this._fb.array([this.createItem(uploaddata[0])])
        });

        uploaddata.forEach((item, index) => {
            this.loadServiceZones(item, index)
        });
    }

    loadServiceZones(item, index) {
        this.filteredServiceZones = [];
        this.serviceZones = [];
        this._geoMetroApi.find(
            {
                where:
                    {
                        and: [
                            { GEO_Country__c: item.country },
                            { or: [{ State_Province__c: item.state }, { Name_of_State_Province__c: item.state }] }
                        ]
                    }
            }
        ).subscribe(
            data => {
                if (data) {
                    data.forEach(item => {
                        let serviceZone = '';
                        if (item['City__c']) {
                            serviceZone += item['City__c'];
                        }
                        if (item['State_Province__c']) {
                            serviceZone += ', ' + item['State_Province__c'];
                        }
                        if (item['Postal_Zip_Code__c']) {
                            serviceZone += ', ' + item['Postal_Zip_Code__c'];
                        }
                        if (item['Name']) {
                            serviceZone += ' (' + item['Name'] + ')';
                        }
                        item['serviceZone'] = serviceZone;
                        //  item['sfdcId'] = "a2q1a0000005hRHAAY";
                    });
                }

                this.filteredServiceZones[index] = data;
                this.items = this.uploadform.get('items') as FormArray;
                if (index !== 0) {
                    this.items.push(this.createItem(item));
                }
            },
            err => {
                console.log('Error loading service zones>>', err.message);
                // this._preloaderService.hidePreloader();
            }
        );
    }

    submitJobsite() {
        this.errorMessage = ''
        if (this.userState.program.programSFId) {
            this.uploadform.value.items.forEach(item => {
                item['Account__c'] = this.selectedAccountId;
                // item['sfdcId'] = "a2q1a0000005hRHAAY";
            });
            for (let propName in this.uploadform.value) {
                if (this.uploadform.value[propName] === null || this.uploadform.value[propName] === undefined) {
                    delete this.uploadform.value[propName];
                }
            }
            let reqObj = this.uploadform.value;
            reqObj['masterProgram'] = this.userState.program.programSFId;
            this._preloaderService.showPreloader();
            this._jobsiteApi.uploadJobsite(reqObj).subscribe(
                result => {

                    if (result.data && result.data.status == 200) {
                        this._modalService.closed();
                        this._alertService.success('Jobsite uploaded successfully. Latest creation will be available after 5 minutes.');
                    }
                    this._preloaderService.hidePreloader();
                },
                err => {
                    console.log(err);
                    this.errorMessage = 'Jobsite uploadation failed. Please try again later.';
                    this._preloaderService.hidePreloader();
                }
            );
        }
    }

    preStage(step) {
        if (step) {
            this.nextStep = false;
            this.uploadform.enable();
            this.errorMessage = ''
        } else {
            this.previousStage.emit({
                data: 'previous'
            });
        }
    }

    nextReview() {
        this.nextStep = true;
        this.uploadform.disable();
    }

    createItem(item): FormGroup {
        return this._fb.group({
            Country__c: [(item && item.country) ? item.country : null, Validators.required],
            State__c: [(item && item.state) ? item.state : null, Validators.required],
            Street__c: [(item && item.street) ? item.street : null, Validators.required],
            Zip__c: [(item && item.zipcode) ? item.zipcode : null, Validators.required],
            City__c: [(item && item.city) ? item.city : null, Validators.required],
            GEO_Metro__c: ['', Validators.required],
        });
    }

    closeModel() {
        this._modalService.closed();
    }

}
