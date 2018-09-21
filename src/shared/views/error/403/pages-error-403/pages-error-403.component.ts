import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PreloaderService } from '../../../../services/preloader.service';
import { AppStateService } from '../../../../services/app-state.service';

@Component({
    selector: 'app-pages-error-403',
    templateUrl: './pages-error-403.component.html',
    styleUrls: ['./pages-error-403.component.css']
})

export class PagesError403Component implements OnInit {

    webTitle = 'ServiceO';

    constructor(
        private _router: Router,
        private _preloaderService: PreloaderService,
        private _appState: AppStateService
    ) { }

    ngOnInit() { }

    goHome() {
        this._preloaderService.showPreloader();
        const accessType = this._appState.getAccessType();
        if (accessType === 'vendor' || accessType === 'customer') {
            this._router.navigate(['/vms']);
        } else {
            this._router.navigateByUrl('/pms');
        }
    }
}
