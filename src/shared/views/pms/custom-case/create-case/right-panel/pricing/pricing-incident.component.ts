import { Component, Input, OnInit } from '@angular/core';

import { AppStateService } from '../../../../../../services/app-state.service';

@Component({
    selector: 'app-pricing-incident',
    templateUrl: './pricing-incident.component.html'
})

export class PricingIncidentComponent implements OnInit {

    @Input() data: any;
    isMSP = false;

    constructor(
        private _appState: AppStateService
    ) { }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isMSP = true;
        }
    }
}
