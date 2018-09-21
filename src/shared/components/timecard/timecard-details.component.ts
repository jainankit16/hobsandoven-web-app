import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { PreloaderService } from '../../services/preloader.service';
import { TimecardApi } from '../../sdk/services/custom/Timecard';

@Component({
    selector: 'app-timecard-list-detail',
    templateUrl: './timecard-details.component.html'
})
export class TimeCardDetailComponent implements OnInit {
    @Input() modelName: string;
    @Input() modelId: string;
    @Output() setTitle: EventEmitter<any> = new EventEmitter<any>();

    timecard: any;
    errorMessage: any;

    constructor(
        private timecardApi: TimecardApi,
        private preloaderService: PreloaderService
    ) { }

    ngOnInit() {
        if (this.modelName === 'undefined' || this.modelName.toLowerCase() === 'timecard') {
            this.getTimeCardDetails({ sfdcId: this.modelId });
        }
    }

    getTimeCardDetails(query: any) {
        this.preloaderService.showPreloader();
        this.timecardApi
            .findOne({
                include: [
                    { relation: 'job', scope: { fields: { Iron_Job_num__c: true } } },
                    { relation: 'vendor', scope: { fields: { Name: true, Timesheet_Offset__c: true } } },
                    { relation: 'worker', scope: { fields: { Name: true } } },
                    { relation: 'purchaseOrder', scope: { fields: { Work_Order_num__c: true } } }
                ],
                where: query
            })
            .subscribe(timecard => {
                this.timecard = timecard;
                this.errorMessage = Object.keys(this.timecard).length > 0 ? '' : 'No timecard details found.';
                this.preloaderService.hidePreloader();
            }, error => {
                this.errorMessage = error.message;
            });
    }
}
