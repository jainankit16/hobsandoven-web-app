import { Component, OnInit, Input } from '@angular/core';
import { JobApi } from '../../../../../sdk';
import { PreloaderService } from '../../../../../services/preloader.service';

@Component({
    selector: 'job-detail-worker',
    templateUrl: './job-detail-worker.component.html',
    styleUrls: ['./job-detail-worker.component.css']
})
export class JobDetailWorkerComponent implements OnInit {
    @Input() jobId: string;
    job: any;
    errorMessage = '';

    constructor(
        private _preloaderService: PreloaderService,
        private _jobApi: JobApi,
    ) { }

    ngOnInit() {
        if (this.jobId) {
            this.loadData(this.jobId);
        } else {
            this.errorMessage = 'No details to display.';
        }
    }

    loadData(jobId) {
        const reqObj = {
            'where': { 'sfdcId': jobId },
            'fields': ['id', 'sfdcId', 'Dispatch_Worker_Name__c'],
            'include': [
                {
                    'relation': 'worker',
                    'scope': {
                        'fields': ['sfdcId', 'Name', 'Dispatch_Worker_num__c', 'Work_Phone_Number__c', 'Primary_Worker_Skilling_Profile__c',
                        'Worker_Type__c', 'Worker_Rating__c']
                    }
                }
            ]
        };
        this._jobApi.getJobDetailsById(reqObj).subscribe(
            result => {
                if (result && Object.keys(result).length > 0) {
                    this.job = result;
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                this._preloaderService.hidePreloader();
                console.log(error);
            }
        );
    }

}
