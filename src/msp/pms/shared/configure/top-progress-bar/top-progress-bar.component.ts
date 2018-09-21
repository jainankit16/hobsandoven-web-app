import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { SharedService } from 'shared/services/pms/shared.services';
import { AppStateService } from 'shared/services/app-state.service';
import { QuoteService } from 'shared/services/pms/quote.service';
import { jobLocationMapService } from 'shared/services/pms/job-location.service';

import { wizardstep } from 'shared/models/configureinfo.class';

@Component({
    selector: 'top-progress-bar',
    templateUrl: './top-progress-bar.component.html'
})

export class TopProgressBarComponent implements OnInit {

    @Input() headTitle: String = '';
    @Input() isLoadProgressBar: Boolean = true;
    accessType = '';
    active = 1;
    wizardsteparr: wizardstep[];
    userState: any;

    constructor(
        private route: ActivatedRoute,
        private _router: Router,
        private _sharedService: SharedService,
        private _quoteService: QuoteService,
        private _appState: AppStateService,
        private _jobLocationService: jobLocationMapService
    ) {
        this.wizardsteparr = this._sharedService.wizardsteparr;
        this._sharedService.activewizard$.subscribe(res => (this.active = res));
    }

    ngOnInit() {
        this.accessType = this._appState.getAccessType();
        this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
        });
    }

    navigate(path) {
        if (this.accessType && this.accessType !== 'partner') {
            if (path.link !== this._router.url) {
                if (path.name !== 'Confirm Order' && path.link !== '') {
                    this.userState.program = {};
                    this.userState.quote = {};
                    this._quoteService.setQuotes([]);
                    this._jobLocationService.setSelectedLocations([]);
                    this._jobLocationService.setJobLocations([]);
                    this._sharedService.setUserState(this.userState);
                    this._router.navigate([path.link]);
                }
            }
        }
    }


}
