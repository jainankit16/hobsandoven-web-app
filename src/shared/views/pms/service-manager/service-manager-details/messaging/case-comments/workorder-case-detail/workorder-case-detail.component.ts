import { Component, OnInit, Input } from '@angular/core';
import { CaseApi } from '../../../../../../../sdk';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'workorder-case-detail',
    templateUrl: './workorder-case-detail.component.html',
    styleUrls: ['./workorder-case-detail.component.css']
})
export class WorkorderCaseDetailComponent implements OnInit {

    caseDetail: any;
    constructor(
        private activatedRoute: ActivatedRoute,
        private _caseApi: CaseApi
    ) {
        this.resetData();
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            window.scroll(0, 0);
            if (params && params['id']) {
                this.resetData();
                this._caseApi.getCaseMessagingDetails(params['id']).subscribe(data => {
                    if (data) {
                        this.caseDetail = data;
                    } else {
                        this.resetData();
                    }
                })
            }
        });
    }

    resetData() {
        this.caseDetail = {
            workOrder: {
                Partner_Case_Number__c: '',
                Name: ''
            },
            CaseNumber: '',
            Partner_Case_Number__c: '',
            Case_Summary__c: '',
            Description: ''
        }
    }
}
