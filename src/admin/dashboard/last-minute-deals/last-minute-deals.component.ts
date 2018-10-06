import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PreloaderService } from '../../../shared/services/preloader.service';

@Component({
    selector: 'app-last-minute-deals',
    templateUrl: './last-minute-deals.component.html',
    styleUrls: ['./last-minute-deals.component.css']
})

export class LastMinuteDealsComponent implements OnInit {

    constructor(
        private _router: Router,
        private _preloaderService: PreloaderService
    ) { }

    ngOnInit() { }
}
