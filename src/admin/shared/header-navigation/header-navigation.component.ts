import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header-navigation',
    templateUrl: './header-navigation.component.html',
    styleUrls: ['./header-navigation.component.css']
})

export class HeaderNavigationComponent implements OnInit {

    webTitle: 'Hobs&Oven';

    constructor(
        private _router: Router,
    ) { }

    ngOnInit() {

    }

    onHomeClick() {
        this._router.navigate(['/']);
    }

    onSellerEnquiryClick() {
        this._router.navigate(['/seller-enquiry']);
    }

    // logout() {
    //     this.authSerice.logout();
    // }
}
