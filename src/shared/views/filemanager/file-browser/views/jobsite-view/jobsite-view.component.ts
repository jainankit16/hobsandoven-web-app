import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewTypes } from '../../../../../../shared/models/static-list-data.service'
import { AppStateService } from '../../../../../services/app-state.service';
@Component({
    selector: 'jobsite-view',
    templateUrl: 'jobsite-view.component.html'
})

export class JobsiteViewComponent implements OnInit {
    modelName;
    sfdcId;
    viewType = ''
    viewTypes: any;
    currentLevel: string;
    folderHiearchy: any;
    userAccessType: string;


    constructor(
        private _appState: AppStateService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.userAccessType = this._appState.getAccessType();
        this.modelName = _route.snapshot.params['modelType'];
        this.sfdcId = _route.snapshot.params['sfdcId'];
        this.viewType = _route.snapshot.params['viewType'];
    }

    ngOnInit() {
        this.viewTypes = ViewTypes;  // Fetched from static data list service
        const currentViewType = this.viewTypes.find(obj => obj.value === this.viewType)
        const currentLevelObj = currentViewType ? currentViewType.folderHiearchy.find(obj => obj.model === this.modelName) : ''
        this.currentLevel = currentLevelObj ? currentLevelObj.level : '';

        if (this.userAccessType !== 'internal' && !this.sfdcId) {
            this._router.navigate(['/pages-error-403']); // when navigated url not allowed
        }

        if (this.userAccessType === 'internal' && this.modelName !== 'Account' && !this.sfdcId) {
            this._router.navigate(['/pages-error-403']); // when navigated url not allowed
        }

        if (this.currentLevel === '') {
            // Case for unknown models in the flow
            this._router.navigate(['/pages-error-404']);
        }
    }

}