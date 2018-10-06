import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '../../../shared/services/modal.service';

@Component({
    selector: 'app-header-navigation',
    templateUrl: './header-navigation.component.html',
    styleUrls: ['./header-navigation.component.css']
})

export class HeaderNavigationComponent implements OnInit {

    webTitle: 'Hobs&Oven';

    constructor(
        private _router: Router,
        private _modalService: ModalService
    ) { }

    ngOnInit() {

    }

    onHomeClick() {
        this._router.navigate(['/']);
    }

    onSellerEnquiryClick() {
        this._router.navigate(['/seller-enquiry']);
    }

    onLoginClick(modal, size) {
        this._modalService.open(modal, size);
    }

    // logout() {
    //     this.authSerice.logout();
    // }
}
