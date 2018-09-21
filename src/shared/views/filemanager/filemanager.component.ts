import { Component, OnInit } from '@angular/core';

import { AppStateService } from '../../services/app-state.service';

@Component({
    selector: 'app-file-manager',
    templateUrl: './filemanager.component.html'
})

export class FileManagerComponent implements OnInit {

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
