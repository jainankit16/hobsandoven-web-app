import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PreloaderService } from '../../../../services/preloader.service';
import { AlertService } from '../../../../services/alert.service';

import { JobApi } from '../../../../sdk';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    dashboardData: any;

    constructor(
        private _router: Router,
        private _alertService: AlertService,
        private _preloaderService: PreloaderService,
        private _jobApi: JobApi
    ) { }

    ngOnInit() {
        this.getDashboardData();
    }

    getDashboardData() {
        this.dashboardData = [];
        this._preloaderService.showPreloader();
        const param = {};
        if (localStorage.getItem('ImpersonationId')) {
            param['Vendor__c'] = localStorage.getItem('ImpersonationId');
        }
        this._jobApi.getVendorDashboardData(param).subscribe(
            results => {
                if (results && Object.keys(results).length) {
                    for (const key in results) {
                        if (key) {
                            this.dashboardData.push({ 'key': key, 'value': results[key] });
                        }
                    }
                } else {
                    this._alertService.error('No records found !');
                }
                this._preloaderService.hidePreloader();
            },
            err => {
                this._alertService.error(err.message);
                this._preloaderService.hidePreloader();
            }
        );
    }

    // openPage(data) {
    //     let url = '';
    //     if (data['key'] === 'Open') {
    //         url = 'accepted';
    //     } else if (data['key'] === 'Completed') {
    //         url = 'closed';
    //     } else if (data['key'] === 'Invited') {
    //         url = 'invited';
    //     }
    //     this._router.navigate(['/vms/jobs', url]);
    // }
}
