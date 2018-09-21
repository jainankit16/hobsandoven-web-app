import { Component } from '@angular/core';

@Component({
    selector: 'app-invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent {
    pageTitle: string;
    constructor() {
        this.pageTitle = 'Purchase Invoice List';
    }
}
