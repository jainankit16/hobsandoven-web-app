import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../../../shared/services/pms/shared.services';
import { userProgress } from '../../../../../../shared/models/configureinfo.class';

@Component({
    selector: 'quote-header',
    templateUrl: './quote-header.component.html'
})
export class QuoteHeaderComponent implements OnInit {
    quoteNo: string;
    rev: string;
    quoteName: string;
    private userState: userProgress;

    constructor(public _sharedservice: SharedService) {
        this._sharedservice.getUserState().subscribe(current => {
            this.userState = current;
            if (this.userState.quote) {
                this.quoteName =
                    this.userState.quote.quoteName != null
                        ? this.userState.quote.quoteName
                        : '';
                this.rev =
                    this.userState.quote.revision != null
                        ? this.userState.quote.revision
                        : '';
                this.quoteNo =
                    this.userState.quote.quoteNo != null
                        ? this.userState.quote.quoteNo
                        : '';
            }
        });
    }

    ngOnInit() { }
}
