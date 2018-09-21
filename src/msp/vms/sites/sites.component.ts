import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-sites',
    templateUrl: './sites.component.html',
    styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
    sites: any;
    pageTitle: string;
    pageSubTitle: string;
    errorMessage: string;

    constructor() {
        this.pageTitle = 'Projects';
        this.pageSubTitle = 'Projects';

    }

    ngOnInit() {

    }

}
