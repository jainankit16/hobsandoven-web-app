import { Component, OnInit, Input } from '@angular/core';
import { JobApi } from '../../../../../sdk';

@Component({
    selector: 'job-detail-billing',
    templateUrl: './job-detail-billing.component.html',
    styleUrls: ['./job-detail-billing.component.css']
})

export class JobDetailBillingComponent implements OnInit {

    @Input() jobId: string;
    errorMessage = '';
    job: any;

    constructor(
        private _jobApi: JobApi,
    ) {
    }

    ngOnInit() {
        if (this.jobId) {
            this.loadData(this.jobId);
        } else {
            this.errorMessage = 'No details to display.';
        }
    }

    loadData(jobId) {
        this.errorMessage = '';
        const reqObj = {
            'where': { 'sfdcId': jobId },
            'fields': ['id', 'sfdcId'],
        };
        this._jobApi.getJobDetailsById(reqObj).subscribe(
            result => {
                if (result && Object.keys(result).length > 0) {
                    this.job = result;
                } else {
                    this.errorMessage = 'No details to display.';
                }
            },
            error => {
                this.errorMessage = error.message;
            }
        );
    }
}
