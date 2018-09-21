import { Component, OnInit, Input } from '@angular/core';

import { AppStateService } from '../../../../../services/app-state.service';

@Component({
    selector: 'order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css']
})

export class OrderDetailsComponent implements OnInit {

    @Input() page: string;
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
