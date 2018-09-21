import { Component, OnInit, Input } from '@angular/core';

import { AppStateService } from '../../../../../../services/app-state.service';

@Component({
    selector: 'app-pms-hardware-asset-returns',
    templateUrl: './pms-hardware-asset-returns.component.html',
    styleUrls: ['./pms-hardware-asset-returns.component.css']
})

export class PmsHardwareAssetReturnsComponent implements OnInit {

    @Input() page: string;
    @Input() caseId: string;
    caseData: any;
    isInternalUser = false

    constructor(
        private _appState: AppStateService
    ) { }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
    }
}
