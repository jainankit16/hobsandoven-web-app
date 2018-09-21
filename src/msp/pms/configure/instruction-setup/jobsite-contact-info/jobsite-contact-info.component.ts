import { SharedService } from './../../../../../shared/services/pms/shared.services';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'jobsite-contact-info',
    templateUrl: './jobsite-contact-info.component.html',
    styleUrls: ['./jobsite-contact-info.component.css']
})
export class JobsiteContactInfoComponent {
    @Input() jobsiteContacts: any[];
    programID: string

    constructor(public _sharedservice: SharedService) {
        this._sharedservice.getUserState().subscribe(current => {
            if (current && current['program'] && current['program']['programReferCode']) {
                this.programID = current.program.programReferCode;
            }
        });
    }
}
