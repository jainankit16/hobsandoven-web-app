import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PreloaderService } from '../../../shared/services/preloader.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    constructor(
        private _router: Router,
        private _preloaderService: PreloaderService
    ) { }

    ngOnInit() { }

    lastMinuteDeals() {
        this._router.navigate(['/last-minute-deals']);
    }
}
