import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../../services/app-state.service';
import { BUILD_DATE, APP_VERSION } from '../../../../admin/version';

@Component({
    selector: 'app-users-home',
    templateUrl: './users-home.component.html',
    styleUrls: ['./users-home.component.css']
})

export class UsersHomeComponent implements OnInit {

    webTitle = 'ServiceO';
    buildDate = BUILD_DATE;
    appVersion = APP_VERSION;
    disableVMS = true;

    constructor(
        private _appState: AppStateService
    ) { }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'partner') {
            this.disableVMS = false;
        } else {
            this.disableVMS = true;
        }
    }
}
