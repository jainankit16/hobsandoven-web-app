import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { WorkerApi } from '../../../../shared/sdk/services/custom/Worker';
import { PreloaderService } from '../../../../shared/services/preloader.service';

@Component({
    selector: 'app-worker-detail',
    templateUrl: './worker-detail.component.html',
    styleUrls: ['./worker-detail.component.css']
})
export class WorkerDetailComponent implements OnInit, OnDestroy {
    @Input() modelId: any;
    @Input() embeddedView = false;
    sub: any;
    sfdcId: string;
    worker: any;
    title: any;
    errorMessage: string;

    constructor(
        private _workerapi: WorkerApi,
        private _preloaderService: PreloaderService
    ) { }

    ngOnInit() {
        this.getWorkDetails(this.modelId);
    }
    ngOnDestroy() {

    }
    getWorkDetails(workerId) {
        this._preloaderService.showPreloader();
        this._workerapi.findOne({
            'where': { 'sfdcId': workerId },
            'fields': ['Available__c', 'sfdcId', 'Contact__c', 'CreatedById', 'CreatedDate', 'Dispatch_Worker_num__c', 'Name', 'id',
                'Primary_Worker_Skilling_Profile__c', 'RecordTypeId', 'Vendorsite__c', 'Worker_Type__c', 'Worker_Rating__c',
                'Work_Phone_Number__c'],
            'include': [
                {
                    'relation': 'contact',
                    'scope': {
                        'fields': ['sfdcId', 'Email', 'FirstName', 'LastName']
                    }
                },
                {
                    'relation': 'vendorsite',
                    'scope': {
                        'fields': ['sfdcId', 'Contact_Email__c', 'Name', 'Contact_Phone__c']
                    }
                },
                {
                    'relation': 'user',
                    'scope': {
                        'fields': ['sfdcId', 'email', 'firstname', 'lastname']
                    }
                },
                {
                    'relation': 'skilling',
                    'scope': {
                        'fields': ['sfdcId', 'Name']
                    }
                },
            ]

        }).subscribe(worker => {
            this.worker = worker;
            this.title = this.worker.Name;
            if (this.worker.contact) {
                this.worker.contact.FullName = (this.worker.contact.FirstName) ? this.worker.contact.FirstName + ' ' : '';
                this.worker.contact.FullName += this.worker.contact.LastName;
            }
            if (this.worker.user) {
                this.worker.user.FullName = (this.worker.user.firstname) ? this.worker.user.firstname + ' ' : '';
                this.worker.user.FullName += this.worker.user.lastname;
            }
            this.errorMessage = Object.keys(this.worker).length > 0 ? '' : 'No payment details found.';
            this._preloaderService.hidePreloader();
        },
            error => {
                this.errorMessage = error.message
                this._preloaderService.hidePreloader();
            });
    }
}
