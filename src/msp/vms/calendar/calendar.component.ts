import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
    calendar: any;
    pageTitle: string;
    pageSubTitle: string;
    errorMessage: string;

    constructor() {
        this.pageTitle = 'Calendar';
        this.pageSubTitle = 'Calendar';
    }

    ngOnInit() {

    }

}
