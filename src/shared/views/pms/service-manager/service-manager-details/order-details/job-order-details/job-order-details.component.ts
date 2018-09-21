import { Component, OnInit, Input } from '@angular/core';
import { CaseApi } from './../../../../../../sdk';
import { PreloaderService } from './../../../../../../services/preloader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-job-order-details',
    templateUrl: './job-order-details.component.html'
})
export class JobOrderDetailsComponent implements OnInit {
    caseId: any;
    jobData: any;

    constructor(
        private _caseApi: CaseApi,
        private _activatedRoute: ActivatedRoute,
        private _preloader: PreloaderService
    ) {
        this._activatedRoute.params.subscribe(params => {
            window.scroll(0, 0);
            this.caseId = params['id'];
        });
    }

    ngOnInit() {
        this._preloader.showPreloader();
        this.getJobData(this.caseId);

    }

    getJobData(caseId) {
        this.jobData = [];
        if (caseId) {
            this._caseApi.find({
                'where': { id: this.caseId },
                'fields': ['id', 'sfdcId', 'Service_Dispatch__c'],
                'include': [
                    {
                        'relation': 'Job',
                        'scope': {
                            'fields': [
                                'Job_Status_Internal__c', 'Iron_Job_num__c', 'csum__c', 'Work_Order__c',
                                'CKSW_BASE__Description__c', 'Field_Service_Schedule_ETA_Date__c', 'Location_Name__c'
                            ]
                        }
                    }
                ]
            }).subscribe(
                res => {
                    if (res.length > 0) {
                        this.jobData = res[0];
                    }
                    this._preloader.hidePreloader();
                },
                err => {
                    this._preloader.hidePreloader();

                }
            );
        } else {
            this._preloader.hidePreloader();
        }
    }
}
