import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
    conatcs: any;
    pageTitle: string;
    pageSubTitle: string;
    errorMessage: string;

    constructor() {
        this.pageTitle = 'Workers';
        this.pageSubTitle = 'Workers';
    }

    ngOnInit() {

    }

}
