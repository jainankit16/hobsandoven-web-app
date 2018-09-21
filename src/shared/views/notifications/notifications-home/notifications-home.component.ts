import { Component, OnInit } from '@angular/core';

import { AppStateService } from '../../../services/app-state.service';

@Component({
    selector: 'app-notifications-home',
    templateUrl: './notifications-home.component.html',
    styleUrls: ['./notifications-home.component.css']
})

export class NotificationsHomeComponent implements OnInit {

    disableVMS = true;

    constructor(
        private _appState: AppStateService
    ) { }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'partner') {
            this.disableVMS = false
        } else {
            this.disableVMS = true;
        }
    }

}
