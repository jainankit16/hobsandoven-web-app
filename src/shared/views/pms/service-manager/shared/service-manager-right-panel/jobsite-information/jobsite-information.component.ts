import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SharedService } from '../../../../../../services/pms/shared.services';
import { PreloaderService } from '../../../../../../services/preloader.service';
import { ModalService } from '../../../../../../services/modal.service';

@Component({
    selector: 'jobsite-information',
    templateUrl: './jobsite-information.component.html'
})
export class JobsiteInformationComponent implements OnInit {
    errorMessage: string;
    case: any;
    contentData: any;
    @Input() jobsiteData: any;

    constructor(
        private _sharedService: SharedService,
        private _preloaderService: PreloaderService,
        private _modalService: ModalService) {

    }

    ngOnInit() { }

    openDetailPage(content, _size, dataRow) {
        this._modalService.open(content, _size);
        this.contentData = dataRow;
    }


}
