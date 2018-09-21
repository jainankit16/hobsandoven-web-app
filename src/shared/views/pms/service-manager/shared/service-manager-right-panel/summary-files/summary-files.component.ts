import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../../../../../services/pms/shared.services';
import { PreloaderService } from '../../../../../../services/preloader.service';
import { CaseApi } from '../../../../../../sdk/services/custom/Case';

@Component({
    selector: 'summary-files',
    templateUrl: './summary-files.component.html'
})

export class SummaryFilesComponent implements OnInit {

    errorMessage: string;

    constructor(
        private _sharedService: SharedService,
        private _caseApi: CaseApi,
        private _preloaderService: PreloaderService
    ) { }

    ngOnInit() { }
}
