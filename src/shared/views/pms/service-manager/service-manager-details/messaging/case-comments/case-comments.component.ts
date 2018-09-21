import { Component, OnInit } from '@angular/core';

import { AppStateService } from '../../../../../../services/app-state.service';

@Component({
    selector: 'case-comments',
    templateUrl: './case-comments.component.html',
    styleUrls: ['./case-comments.component.css']
})

export class CaseCommentsComponent implements OnInit {

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
