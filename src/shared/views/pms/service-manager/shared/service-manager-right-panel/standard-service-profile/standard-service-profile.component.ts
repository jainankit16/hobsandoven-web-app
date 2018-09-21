import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedService } from '../../../../../../services/pms/shared.services';
import { PreloaderService } from '../../../../../../services/preloader.service';
import { ModalService } from '../../../../../../services/modal.service';

@Component({
    selector: 'standard-service-profile',
    templateUrl: './standard-service-profile.component.html'
})
export class StandardServiceProfileComponent implements OnInit {
    errorMessage: string;
    case: any;
    contentData: any;
    @Input() profileData: any;

    constructor(
        private _sharedService: SharedService,
        private _preloaderService: PreloaderService,
        private _modalService: ModalService) {

    }

    ngOnInit() {

    }
}
