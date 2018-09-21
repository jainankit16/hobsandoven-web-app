import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SharedService } from '../../../services/pms/shared.services';
@Component({
    templateUrl: './program-manager.component.html',
    styleUrls: ['./program-manager.component.css']
})

export class ProgramManagerComponent {
    isServiceSetup = false;
    headTitle = 'Programs: Programs Profile';
    private sub: any;
    private parentRouteId: number;
    constructor(private _sharedService: SharedService,
        private _router: Router) {
        this._sharedService.activewizard$.subscribe(res => {
            this.isFirstStep(res)
        });

        this._router.events.subscribe(event => {
            if (event.constructor.name === 'NavigationStart') {
                this.setPageTitle(event['url']);
            }
            // default
            if (event['url'] !== undefined) {
                this.setPageTitle(event['url']);
            }


        });

    }

    isFirstStep(step: number) {
        if (step === 1) {
            this.isServiceSetup = true;
        } else {
            this.isServiceSetup = false;
        }
    }

    setPageTitle(currentUrl) {
        if (currentUrl.indexOf('pricelist') !== -1) {
            this.headTitle = 'Programs: Service Catalog (Price List)';
        } else if (currentUrl.indexOf('programs') !== -1) {
            this.headTitle = 'Programs: Programs Profile';
        }
    }
}
