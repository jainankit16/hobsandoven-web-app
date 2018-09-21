import { Component, OnInit } from '@angular/core';

import { jobLocationMapService } from '../../../../../../shared/services/pms/job-location.service';
import { SharedService } from '../../../../../../shared/services/pms/shared.services';
@Component({
    selector: 'app-jobsite-location-information',
    templateUrl: './jobsite-location-information.component.html'
})

export class JobsiteLocationInformationComponent implements OnInit {
    selectedJobsite: any[] = [];
    programID: string;
    constructor(private _jobLocationMapService: jobLocationMapService,
        public _sharedservice: SharedService) {

    }

    ngOnInit() {
        this.jobSiteLocationInformation();

    }

    jobSiteLocationInformation() {
        this._jobLocationMapService.getSelectedLocations().subscribe(data => {
            this.selectedJobsite = data;
        });

        this._sharedservice.getUserState().subscribe(current => {
            this.programID = (current.program) ? current.program.programReferCode : '';
        });
    }


}
