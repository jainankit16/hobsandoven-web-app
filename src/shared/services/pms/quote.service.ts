import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable } from 'rxjs';

import { SharedService } from './shared.services';
import { PreloaderService } from './../preloader.service';
import { AppStateService } from '../app-state.service';
import { jobLocationMapService } from './job-location.service';

import { MetroVirtualVendorPoolApi } from './../../sdk/services/custom/MetroVirtualVendorPool';
import { QuoteManagerApi } from '../../sdk/services/custom/QuoteManager';
import { QuoteLineManagerApi } from './../../sdk/services/custom/QuoteLineManager';

@Injectable()
export class QuoteService {

    quoteData = new BehaviorSubject<any>([]);
    selectedQuote = new BehaviorSubject<any>({});
    selectedProviderLocations = new BehaviorSubject<any>([]);
    quoteState = new BehaviorSubject<any>([]);
    workOrder = new BehaviorSubject<any>({});
    userState: any;
    jobsiteListDatas = new BehaviorSubject<any>([]);

    constructor(
        private _sharedservice: SharedService,
        private _preloaderService: PreloaderService,
        private _appState: AppStateService,
        private _jobLocationService: jobLocationMapService,
        private _quoteLineManagerApi: QuoteLineManagerApi,
        private _quoteManagerApi: QuoteManagerApi,
        private _metroVirtualVendorPoolApi: MetroVirtualVendorPoolApi
    ) {
        this._sharedservice.getUserState().subscribe(current => {
            this.userState = current;
        });
    }

    getQuotes() {
        return this.quoteData.asObservable();
    }
    setQuotes(quotesObj) {
        this.quoteData.next(quotesObj);
    }

    getQuoteState() {
        return this.quoteState.asObservable();
    }
    setQuoteState(quoteStateObj) {
        this.quoteState.next(quoteStateObj);
    }

    setSelectedQuote(quoteObj) {
        this.selectedQuote.next(quoteObj);
    }

    getSelectedQuote() {
        return this.selectedQuote.asObservable();
    }

    getSelectedProviderLocations() {
        return this.selectedProviderLocations.asObservable();
    }
    setSelectedProviderLocations(obj) {
        this.selectedProviderLocations.next(obj);
    }

    setWorkOrderDetails(orderObj) {
        this.workOrder.next(orderObj);
    }

    getWorkOrderDetails() {
        return this.workOrder.asObservable();
    }

    getJobsites() {
        return this.jobsiteListDatas.asObservable();
    }
    setJobsites(jobSitesObj) {
        this.jobsiteListDatas.next(jobSitesObj);
    }

    getProvidersLocations(vendorId) {
        this._metroVirtualVendorPoolApi
            .find({
                where: { Vendor__c: vendorId },
                include: ['GeoMetro'],
                order: 'Vendor_Rating__c DESC'
            })
            .subscribe(
                data => {
                    //   console.log(data);
                    this.setSelectedProviderLocations(data);
                },
                err => {
                    console.log(err);
                }
            );
    }

    loadSelectedJobsites(quote, isHideLoader = true) {
        // console.log(quote);
        this.setSelectedQuote(quote);
        this._jobLocationService.setSelectedLocations([]);
        this._sharedservice.setQuoteLineObj([]);
        const selectedJobsites = []
        this._quoteLineManagerApi
            .find({
                where: {
                    QuoteManager__c: quote.sfdcId
                },
                include: [
                    {
                        relation: 'Jobsite',
                        scope: {
                            include: [
                                {
                                    relation: 'account',
                                    scope: {
                                        include: ['pricelist']
                                    }
                                },
                                'GeoMetro'
                            ]
                        }
                    },
                    'TalentType'
                ]
            })
            .subscribe(
                data => {
                    const arr = [];
                    data.forEach(item => {
                        if (arr.indexOf(item['Jobsite'].sfdcId) === -1) {
                            selectedJobsites.push(item);
                            arr.push(item['Jobsite'].sfdcId);
                        }
                    });
                    // console.log(selectedJobsites);
                    this._jobLocationService.setSelectedLocations(selectedJobsites);
                    this._sharedservice.setQuoteLineObj(data);
                    if (isHideLoader) {
                        this._preloaderService.hidePreloader();
                    }
                },
                error => {
                    console.log(
                        'Error fetching selected jobsites for quote>>',
                        error.message
                    );
                    this._jobLocationService.setSelectedLocations([]);
                    this._sharedservice.setQuoteLineObj([]);
                    this._preloaderService.hidePreloader()
                }
            );
    }

    // Quote Version generation utility functions
    nextChar(c) {
        const u = c.toUpperCase();
        if (this.isSame(u, 'Z')) {
            let txt = '';
            let i = u.length;
            while (i--) {
                txt += 'A';
            }
            return txt + 'A';
        } else {
            let p = '';
            let q = '';
            if (u.length > 1) {
                p = u.substring(0, u.length - 1);
                q = String.fromCharCode(p.slice(-1).charCodeAt(0));
            }
            const l = u.slice(-1).charCodeAt(0);
            const z = this.nextLetter(l);
            if (z === 'A') {
                return p.slice(0, -1) + this.nextLetter(q.slice(-1).charCodeAt(0)) + z;
            } else {
                return p + z;
            }
        }
    }

    nextLetter(l) {
        if (l < 90) {
            return String.fromCharCode(l + 1);
        } else {
            return 'A';
        }
    }

    isSame(str, char) {
        let i = str.length;
        while (i--) {
            if (str[i] !== char) {
                return false;
            }
        }
        return true;
    }

    /**
     * to replace getQuotesForProgram and loadSelectedJobsites
     */

    quoteManagerDataList(programId, isHideLoader, userState = null) {
        const selectedAccountId = this._appState.getSelectedAccount();
        let reqQbj = {
            where: {
                Partner__c: selectedAccountId,
                Project_SOP__c: programId,
                sfdcId: { neq: '' },
                Name: { neq: '' }
            }
        };
        if (!isHideLoader) {
            reqQbj.where['Default_Quote__c'] = true; // getJobSites In this case
        } else {
            reqQbj['order'] = ['Default_Quote__c DESC', 'CreatedDate DESC']
        }

        this._preloaderService.showPreloader();

        this._quoteManagerApi.quoteManagerDataList(reqQbj)
            .subscribe(
                data => {
                    const jobsiteLists = data['jobsiteLists'];
                    if (!isHideLoader) {
                        // show jobsites
                        if (jobsiteLists !== undefined && (jobsiteLists.jobsites && jobsiteLists.jobsites.length > 0)) {
                            if (data['quoteManager']) {
                                this.setQuoteLineData(userState, data);
                            } else {
                                this.clearData();
                            }
                            this.setJobsites(jobsiteLists.jobsites); // jobsite will display if not rest
                        } else {

                            this.setJobsites([]);
                            this.clearData();
                        }

                    } else {
                        if (data['quoteManager']) {
                            this.setQuoteLineData(userState, data);
                        } else {
                            this.clearData();
                        }
                    }
                    // set user state service with selected program details
                    this._sharedservice.setUserState(userState);
                    this._preloaderService.hidePreloader();

                },
                err => {
                    console.log(err);
                    this.clearData();
                    this._preloaderService.hidePreloader();
                }
            );

    }

    setQuoteLineData(userState, data) {
        this.setQuotes(data['quoteManager']);
        const quoteLineManagers = data['quoteLineManagers'];
        // when default quote is not available
        if (Object.keys(data['defaultQuote']).length > 0) {
            this.setSelectedQuote(data['defaultQuote']);
            this._sharedservice.setQuoteLineObj(quoteLineManagers);
        }
        // end of checking DQ
        if (userState.quote === undefined) {
            userState.quote = {};
        }
        userState.quote = (data['userState']) ? data['userState'] : {};
        if (quoteLineManagers && Array.isArray(quoteLineManagers)) {
            const arr = [];
            const selectedJobsites = [];
            quoteLineManagers.forEach(qmitem => {
                if (qmitem['Jobsite'] !== undefined && arr.indexOf(qmitem['Jobsite']['sfdcId']) === -1) {
                    selectedJobsites.push(qmitem);
                    arr.push(qmitem['Jobsite']['sfdcId']);
                }
            });
            this._jobLocationService.setSelectedLocations(selectedJobsites);
        }

    }

    clearData() {
        this.setQuotes([]);
        this.setSelectedQuote([]);
        this._jobLocationService.setSelectedLocations([]);
        this._sharedservice.setQuoteLineObj([]);
    }
}