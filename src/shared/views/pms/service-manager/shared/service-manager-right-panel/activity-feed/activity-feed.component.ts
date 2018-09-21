import { Component, Input, OnInit } from '@angular/core';
import { PreloaderService } from '../../../../../../services/preloader.service';
import { CaseApi } from '../../../../../../sdk/services/custom/Case';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'activity-feed',
    templateUrl: './activity-feed.component.html'
})
export class ActivityFeedComponent implements OnInit {
    caseId: any;
    allActivityData: any;
    jobActivityData: any;
    pmsCaseActivityData: any;
    iccCaseActivityData: any;
    workOrderActivityData: any;
    caseRelatedData: any;
    countData: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _caseApi: CaseApi,
        private _preloaderService: PreloaderService) {
        this.activatedRoute.params.subscribe(params => {
            this.caseId = params['id'];
            if (this.caseId) {
                this.activityDetails(this.caseId);
            }
        });

    }
    ngOnInit() {
    }
    activityDetails(caseId) {
        this._preloaderService.showPreloader();
        this._caseApi.fetchCaseFeed({ id: caseId })
            .subscribe(activityLists => {
                this.allActivityData = (activityLists['AllActivityList']) ? activityLists['AllActivityList'] : [];
                this.jobActivityData = (activityLists['jobData']) ? activityLists['jobData'] : [];
                this.workOrderActivityData = (activityLists['workOrderData']) ? activityLists['workOrderData'] : [];
                this.pmsCaseActivityData = (activityLists['caseData']) ? activityLists['caseData'] : [];
                this.iccCaseActivityData = (activityLists['iccCaseData']) ? activityLists['iccCaseData'] : [];
                this.caseRelatedData = {
                    jobId: (activityLists['jobNumber']) ? activityLists['jobNumber'] : '',
                    workOrderNo: (activityLists['workOrderName']) ? activityLists['workOrderName'] : '',
                    pmsCaseNumber: (activityLists['pmsCaseNumber']) ? activityLists['pmsCaseNumber'] : '',
                    iccCaseNumber: (activityLists['iccCaseNumber']) ? activityLists['iccCaseNumber'] : ''
                }
                this.countData = {
                    allActivityCount: (activityLists['AllActivityList'] && activityLists['AllActivityList'].length) ? activityLists['AllActivityList'].length : 0,
                    allJobCount: (activityLists['jobData'] && activityLists['jobData'].length) ? activityLists['jobData'].length : 0,
                    allworkOrderCount: (activityLists['workOrderData'] && activityLists['workOrderData'].length) ? activityLists['workOrderData'].length : 0,
                    allPmsCaseCount: (activityLists['caseData'] && activityLists['caseData'].length) ? activityLists['caseData'].length : 0,
                    allIccCaseCount: (activityLists['iccCaseData'] && activityLists['iccCaseData'].length) ? activityLists['iccCaseData'].length : 0
                }

                this._preloaderService.hidePreloader();
            }, error => {
                console.log(error);
                this._preloaderService.hidePreloader();

            });
    }
}
