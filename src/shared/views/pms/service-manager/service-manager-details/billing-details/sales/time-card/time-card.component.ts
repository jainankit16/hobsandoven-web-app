import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PreloaderService } from './../../../../../../../services/preloader.service';
import { AppStateService } from '../../../../../../../services/app-state.service';

import { CaseApi, TimecardApi } from './../../../../../../../sdk';

@Component({
    selector: 'app-time-card',
    templateUrl: './time-card.component.html',
    styleUrls: ['./time-card.component.css']
})

export class TimeCardComponent implements OnInit {

    isInternalUser = false;
    caseId: any;
    timeCardData: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _preloaderService: PreloaderService,
        private _appState: AppStateService,
        private _caseApi: CaseApi,
        private _timecardApi: TimecardApi
    ) {
        this._activatedRoute.params.subscribe(params => {
            this.caseId = params['id'];
            window.scroll(0, 0);
            this.getWorkerId();
        });
    }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
    }

    getWorkerId() {
        this._preloaderService.showPreloader();
        this._caseApi.find({ where: { id: this.caseId }, fields: ['id', 'Dispatch_Worker__c'] }).subscribe(
            caseRes => {
                if (caseRes.length && caseRes[0]['Dispatch_Worker__c']) {
                    this.getTimeCard(caseRes[0]['Dispatch_Worker__c'])
                } else {
                    this._preloaderService.hidePreloader();
                }
            },
            caseErr => {
                this._preloaderService.hidePreloader();
            })
    }

    getTimeCard(workerId) {
        const filterObj = {
            where: { Worker__c: workerId },
            fields: [
                'Status__c', 'sfdcId',
                'Total_Worked_Hours__c',
                'Worker__c', 'Vendor__c',
                'Customer_Approval_Status__c',
                'Timesheet_Week_Number_ISO_Auto__c',
                'Total_Worked_Hours_Without_Offset__c'
            ],
            include: [
                {
                    relation: 'vendor', scope: {
                        fields: ['Name']
                    }
                },
                {
                    relation: 'worker', scope: {
                        fields: ['Name']
                    }
                },
            ],
            limit: 1
        }
        this._timecardApi.find(filterObj).subscribe(
            timeCardRes => {
                if (timeCardRes.length) {
                    this.timeCardData = timeCardRes[0];
                }
                this._preloaderService.hidePreloader();
            },
            timeCardErr => {
                this._preloaderService.hidePreloader();
            })
    }
}
