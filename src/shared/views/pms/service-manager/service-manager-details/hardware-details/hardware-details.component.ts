import { Component, OnInit, Input } from '@angular/core';

import { AppStateService } from '../../../../../services/app-state.service';

@Component({
    selector: 'app-hardware-details',
    templateUrl: './hardware-details.component.html',
    styleUrls: ['./hardware-details.component.css']
})

export class HardwareDetailsComponent implements OnInit {

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
