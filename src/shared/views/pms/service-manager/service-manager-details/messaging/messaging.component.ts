import { Component, OnInit } from '@angular/core';

import { AppStateService } from '../../../../../services/app-state.service';

@Component({
    selector: 'messaging',
    templateUrl: './messaging.component.html',
    styleUrls: ['./messaging.component.css']
})

export class MessagingComponent implements OnInit {

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
