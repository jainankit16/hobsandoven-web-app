import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../../../../services/pms/shared.services';
import { PreloaderService } from '../../../../../../services/preloader.service';
import { CaseApi } from '../../../../../../sdk/services/custom/Case';

@Component({
    selector: 'summary-jobsite',
    templateUrl: './summary-jobsite.component.html'
})
export class SummaryJobsiteComponent implements OnInit {
    errorMessage: string;
    @Input() jobsiteData: string;

    constructor(
        private _sharedService: SharedService,
        private _caseApi: CaseApi,
        private _preloaderService: PreloaderService) {

    }

    ngOnInit() { }
}
