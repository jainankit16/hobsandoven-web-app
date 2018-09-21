import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewTypes } from '../../../../../../shared/models/static-list-data.service'
import { AppStateService } from '../../../../../services/app-state.service';


@Component({
    selector: 'department-view',
    templateUrl: 'department-view.component.html'
})

export class DepartmentViewComponent implements OnInit {
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
        // let s = this._router.routeReuseStrategy;
        // s.shouldReuseRoute = () => false;

        this.modelName = _route.snapshot.params['modelType'];
        this.sfdcId = _route.snapshot.params['sfdcId'];
        this.viewType = _route.snapshot.params['viewType'];
        // console.log('this.from parent>>>>', this.modelName)

    }

    ngOnInit() {
        this.viewTypes = ViewTypes;  // Fetched from static data list service
        this.userAccessType = this._appState.getAccessType();
        const currentViewType = this.viewTypes.find(obj => obj.value === this.viewType)
        const currentLevelObj = currentViewType ? currentViewType.folderHiearchy.find(obj => obj.model === this.modelName) : ''
        this.currentLevel = currentLevelObj ? currentLevelObj.level : '';
        // console.log(this.currentLevel)

        if (this.userAccessType !== 'internal' && !this.sfdcId) {
            this._router.navigate(['/pages-error-403']); // when navigated url not allowed
        }

        if (this.userAccessType === 'internal' && this.modelName !== 'Account' && !this.sfdcId) {
            this._router.navigate(['/pages-error-403']); // when navigated url not allowed
        }

        if (this.currentLevel === '') {
            // Case for unknown models in the flow
          //  this.loadDefaultView(currentViewType);
          this._router.navigate(['/pages-error-404']);
        }
    }

    loadDefaultView(currentViewType) {
        // console.log('loading default page for >>>', this.viewType)
        const navigationArray = ['app', 'file-manager', 'browser', this.viewType, currentViewType.folderHiearchy[0].model]
        this._router.navigate(navigationArray);
    }

}