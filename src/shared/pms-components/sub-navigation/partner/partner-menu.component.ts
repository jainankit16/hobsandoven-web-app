import { Component, AfterContentChecked } from '@angular/core';
import { AppStateService } from 'shared/services/app-state.service';

@Component({
    selector: 'pmsa-menu',
    templateUrl: './partner-menu.component.html',
    styleUrls: ['./partner-menu.component.css']
})

export class PartnerMenuComponent implements AfterContentChecked {
    adminAccessPermission: boolean;
    constructor(private _appState: AppStateService) { }

    ngAfterContentChecked() {
        this.adminAccessPermission = this._appState.getAdminAccessPermission();
    }
}
