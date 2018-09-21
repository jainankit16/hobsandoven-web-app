import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardApi } from './../../../shared/sdk';
import { PreloaderService } from 'shared/services/preloader.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    dashboardData: any;
    constructor(
        private _router: Router,
        private _preloaderService: PreloaderService,
        private _dashboardApi: DashboardApi
    ) { }

    ngOnInit() {
        this.getDashboardCount()
    }

    getDashboardCount() {
        this._preloaderService.showPreloader();
        const models = ['Account', 'Users', 'Job', 'Department', 'DocumentCategory', 'DocumentTitle'];
        this._dashboardApi.getDashboardCount({ models: models }).subscribe(
            res => {
                this.dashboardData = res;
                this._preloaderService.hidePreloader();
            },
            err => {
                this._preloaderService.hidePreloader();
            }
        )
    }
}
