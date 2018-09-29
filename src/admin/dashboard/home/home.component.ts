import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PreloaderService } from '../../../shared/services/preloader.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    dashboardData: any;

    constructor(
        private _router: Router,
        private _preloaderService: PreloaderService
    ) { }

    ngOnInit() {
        this.dashboardData = [
            {
                'count': '1',
                'title': 'Test'
            }
        ];
    }
}
