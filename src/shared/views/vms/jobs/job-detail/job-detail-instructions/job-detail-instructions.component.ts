import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../../../../../services/alert.service';
import { PreloaderService } from '../../../../../services/preloader.service';
import { JobInstructionApi } from '../../../../../sdk';

@Component({
    selector: 'job-detail-instructions',
    templateUrl: './job-detail-instructions.component.html'
})

export class JobDetailInstructionsComponent implements OnInit {
    @Input() jobId: string;
    jobInstruction: Array<any>;
    errorMessage: string;

    constructor(
        private _jobInstructionApi: JobInstructionApi,
        private _alertService: AlertService,
        private _preloaderService: PreloaderService
    ) { }

    ngOnInit() {
        if (this.jobId) {
            this.getInstructionDetails(this.jobId);
        }
    }

    getInstructionDetails(id) {
        this._preloaderService.showPreloader();
        this._jobInstructionApi.find({
            'where': {
                'Job__c': id,
                'IsDeleted': 0
            }
        }).subscribe(
            jobInstruction => {
                this.jobInstruction = jobInstruction;
                this.errorMessage = (this.jobInstruction.length > 0) ? '' : 'Instruction not available for this job.';
                this._preloaderService.hidePreloader();
            }, error => {
                this._preloaderService.hidePreloader();
                this.errorMessage = error.message;
            }
        );
    }

    // deleteInstruction(id) {
    //     if (confirm('Are you sure to delete #' + id)) {
    //         this._preloaderService.showPreloader();
    //         this._jobInstructionApi.patchAttributes(id, { 'IsDeleted': 1 }).subscribe(
    //             result => {
    //                 this.jobInstruction = this.jobInstruction.filter(instruction => instruction.id !== id);
    //                 this._alertService.success('Instruction has been deleted successfully');
    //                 this.errorMessage = (this.jobInstruction.length > 0) ? '' : 'Instruction not available for this job.';
    //                 this._preloaderService.hidePreloader();
    //             }, err => {
    //                 this._preloaderService.hidePreloader();
    //                 this._alertService.error(err.message);
    //             }
    //         );
    //     }
    // }
}
