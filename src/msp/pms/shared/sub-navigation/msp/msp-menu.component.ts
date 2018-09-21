import { Component, AfterContentChecked } from '@angular/core';
import { AppStateService } from './../../../../../shared/services/app-state.service';

@Component({
    selector: 'msp-menu',
    templateUrl: './msp-menu.component.html',
    styleUrls: ['./msp-menu.component.css']
})

export class MSPMenuComponent implements AfterContentChecked {
    adminAccessPermission = false;
    constructor(private _appState: AppStateService) {

    }
    ngAfterContentChecked() {
        this.adminAccessPermission = this._appState.getAdminAccessPermission();
    }
}
