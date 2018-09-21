import { Component, OnInit, Input } from '@angular/core';

import { AppStateService } from '../../../../../services/app-state.service';

@Component({
    selector: 'app-worker-details',
    templateUrl: './worker-details.component.html',
    styleUrls: ['./worker-details.component.css']
})

export class WorkerDetailsComponent implements OnInit {

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
