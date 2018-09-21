import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteService } from '../../../../../shared/services/pms/quote.service';
import { SharedService } from '../../../../../shared/services/pms/shared.services';
import { PreloaderService } from '../../../../../shared/services/preloader.service';
import { jobLocationMapService } from '../../../../../shared/services/pms/job-location.service';
import { QuoteManagerApi, QuoteLineManagerApi } from '../../../../../shared/sdk';

@Component({
    selector: 'select-quote',
    templateUrl: './quote.component.html'
})
export class QuoteComponent implements OnInit {

    @Input('isPricing') isPricing = false;
    @Input('isSetDefault') isSetDefault = false;
    quotes: any;
    selectedQuote: any;
    userState: any;
    errorMessage = ''

    constructor(
        public _sharedservice: SharedService,
        public router: Router,
        private _quoteService: QuoteService,
        private _quoteManagerApi: QuoteManagerApi,
        private _quoteLineManagerApi: QuoteLineManagerApi,
        private _jobLocationService: jobLocationMapService,
        private _preloaderService: PreloaderService
    ) { }

    ngOnInit() {
        this._sharedservice.getUserState().subscribe(current => {
            this.userState = current;
        });
        this.getQuotes();
    }

    getQuotes() {
        this._quoteService.getQuotes().subscribe(data => {
            this.quotes = data;
            this.quotes.length ? this.errorMessage = '' : this.errorMessage = 'No record found.'
        });
    }

    selectQuoteID(e, quoteObj) {
        if (e.target.value !== '' && e.target.value !== undefined) {
            if (this.userState.quote === undefined) {
                this.userState.quote = {};
            }
            this._preloaderService.showPreloader()
            this.userState.quote.quoteNo = quoteObj.Iron_Quote_Number__c;
            this.userState.quote.revision = quoteObj.Quote_Version__c;
            this.userState.quote.quoteName = quoteObj.CreatedDate;
            this._quoteService.loadSelectedJobsites(quoteObj); // Loads selected jobsites for Quote
        }
        this._sharedservice.setUserState(this.userState);
    }

    setQuoteDefault(quoteObj) {
        if (quoteObj.Default_Quote__c) {
            console.log('No need to update as it is already default');
        } else {
            const defaultQuote = this.quotes.filter(
                item => item.Default_Quote__c === true
            );

            if (defaultQuote && defaultQuote.length > 0) {
                this._quoteManagerApi.updateAll({ id: quoteObj.id }, { Default_Quote__c: true }).subscribe(
                    data => {
                        // Remove default from existing
                        this._quoteManagerApi.updateAll({ id: defaultQuote[0].id }, { Default_Quote__c: false }).subscribe(
                            res => {
                                this._quoteService.quoteManagerDataList(this.userState.program.programSFId, true, this.userState);
                            },
                            error => {
                                console.log('Error updating default  quote >>', error.message);
                            }
                        );
                    },
                    error => {
                        console.log('Error updating quote status >>', error.message);
                    }
                );
            } else {
                this._quoteManagerApi.updateAll({ id: quoteObj.id }, { Default_Quote__c: true }).subscribe(data => {
                    this._quoteService.quoteManagerDataList(this.userState.program.programSFId, true, this.userState);
                },
                error => {
                        console.log('Error updating quote status >>', error.message);
                });
            }

        }
    }
}
