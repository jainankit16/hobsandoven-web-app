import { SharedService } from '../../../services/pms/shared.services';
import { JobsiteApi } from './../../../sdk/services/custom/Jobsite';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jobsite-setup',
    templateUrl: './jobsite-setup.component.html',
    styleUrls: ['./jobsite-setup.component.css']
})
export class JobsiteSetupComponent implements OnInit {
    isServiceSetup = false;
    jobsiteCount = 0;
    public showContent = false;
    headTitle = 'Setup: Manage Jobsite (PMS)';
    ngOnInit() {
        this._sharedService.getIsProgramLoad().subscribe(isAccoundLoad => {
            this.showContent = isAccoundLoad;
        })
    }
    constructor(
        private _sharedService: SharedService,
        private modalService: NgbModal,
        private _jobsiteApi: JobsiteApi,
    ) {
        this._sharedService.activewizard$.subscribe(res => {
            this.isFirstStep(res)
        })
    }

    isFirstStep(step: number) {
        if (step === 1) {
            this.isServiceSetup = true;
        } else {
            this.isServiceSetup = false;
        }
    }
    /* Function that set type of creation Jobsite */
    updateJobsiteCount(value) {
        this.jobsiteCount = value
    }

    openDetailPage(content, _size) {
        this.modalService.open(content, { size: _size });
    }

}