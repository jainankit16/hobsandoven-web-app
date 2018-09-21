import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { AppStateService } from '../../../shared/services/app-state.service';

@Component({
    selector: 'app-nav-sidebar',
    templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit, AfterContentChecked {

    adminAccessPermission = false;
    accessType: any;

    constructor(private _appState: AppStateService) { }

    ngOnInit() {
        this.accessType = this._appState.getAccessType();
    }

    ngAfterContentChecked() {
        this.adminAccessPermission = this._appState.getAdminAccessPermission();
    }
}
