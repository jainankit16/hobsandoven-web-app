import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../../../../services/pms/shared.services';
import { PreloaderService } from '../../../../../../services/preloader.service';
import { CaseApi } from '../../../../../../sdk/services/custom/Case';

@Component({
    selector: 'case-information',
    templateUrl: './case-information.component.html'
})
export class CaseInformationComponent implements OnInit {
    errorMessage: string;
    @Input() caseData: any;

    constructor(
        private _sharedService: SharedService,
        private _caseApi: CaseApi,
        private _preloaderService: PreloaderService) {

    }

    ngOnInit() { }
}
