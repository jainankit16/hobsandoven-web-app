import { Component } from '@angular/core';

@Component({
    selector: 'app-timecardlist',
    templateUrl: './timecardlist.component.html',

})
export class TimeCardListComponent {
    pageTitle: string;
    pageSubTitle: string;

    constructor() {
        this.pageTitle = 'TimeCard List';
        this.pageSubTitle = 'Listing all TimeCard';
    }

}
