import { Component, } from '@angular/core';

@Component({
    selector: 'app-payments-list',
    templateUrl: './payments-list.component.html',
    styleUrls: ['./payments-list.component.css']
})

export class PaymentsListComponent {
    pageTitle: string;
    pageSubTitle: string;

    constructor() {
        this.pageTitle = 'Payments List';
        this.pageSubTitle = 'Listing all Payments';
    }

}
