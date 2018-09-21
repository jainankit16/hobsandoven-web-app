import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../../../../services/pms/shared.services';
import { PreloaderService } from '../../../../../../services/preloader.service';
import { CaseApi } from '../../../../../../sdk/services/custom/Case';

@Component({
    selector: 'governance-detail',
    templateUrl: './governance-detail.component.html',
    styleUrls: ['./governance-detail.component.css'],
})
export class GovernanceDetailComponent implements OnInit {
    errorMessage: string;
    @Input() governanceDetail: any;

    constructor(
        private _sharedService: SharedService,
        private _caseApi: CaseApi,
        private _preloaderService: PreloaderService) {

    }

    ngOnInit() { }
}
