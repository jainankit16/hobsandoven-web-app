import { Component, OnInit, Input } from '@angular/core';

import { AppStateService } from '../../../../../services/app-state.service';

@Component({
    selector: 'app-service-contract',
    templateUrl: './service-contract.component.html',
    styleUrls: ['./service-contract.component.css']
})

export class ServiceContractComponent implements OnInit {

    @Input() page: string;
    @Input() caseId: string;
    isInternalUser = false;

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
