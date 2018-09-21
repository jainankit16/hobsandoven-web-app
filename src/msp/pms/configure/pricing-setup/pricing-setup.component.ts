import { Component, OnInit, OnDestroy, PipeTransform, ViewChild } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { SharedService } from '../../../../shared/services/pms/shared.services';
import { ModalService } from '../../../../shared/services/modal.service';
import { QuoteService } from '../../../../shared/services/pms/quote.service';
import { PreloaderService } from '../../../../shared/services/preloader.service';
import { jobLocationMapService } from '../../../../shared/services/pms/job-location.service';
import { AppStateService } from './../../../../shared/services/app-state.service';

import { userProgress } from '../../../../shared/models/configureinfo.class';
import { UniquePipe } from '../../../../shared/pipe/unique/unique.pipe';

import { QuoteManagerApi, QuoteLineManagerApi, MetroVirtualVendorPoolApi, TalentTypeApi, CountryCodeApi } from '../../../../shared/sdk';

@Component({
    templateUrl: './pricing-setup.component.html'
})

export class PricingSetupComponent implements OnInit, OnDestroy, PipeTransform {

    selectedAccountId: string;
    @ViewChild('showSelect') private ngbTabset: NgbTabset;
    userState: any;
    ProgramIstrue = false;
    QuoteIstrue = false;
    showPricing = false;
    pricingFilterType = 'Pricing';
    pFilterType = true;
    datePipe: DatePipe;
    isCollapsed = false;
    selectedQuote: any;
    selectAction: string;
    saveAsDefault: boolean;
    templateName: string;
    templateDescription: string;
    quoteVersion: string;
    quoteStatus: string;
    errorMsg = '';
    successMsg = '';
    errorMsgModal = '';
    successMsgModal = '';
    private subscription: Subscription;
    pricingListPerJobsites: any;
    quotes = [];
    // Service Provider Expanded Dialog
    globalProfiles: any = [];
    filteredGlobalProfiles: any = [];
    searchFilter: any = {};
    source: string;
    page = 'quote';

    constructor(
        private _router: Router,
        private _location: Location,
        public _sharedService: SharedService,
        private _jobLocationService: jobLocationMapService,
        private _quoteService: QuoteService,
        private _preloaderService: PreloaderService,
        private _modalService: ModalService,
        private _appState: AppStateService,
        private _quoteManagerApi: QuoteManagerApi,
        private _quoteLineManagerApi: QuoteLineManagerApi,
        private _metroVirtualVendorPoolApi: MetroVirtualVendorPoolApi,
        private _countryCodeApi: CountryCodeApi,
        private _talentTypeApi: TalentTypeApi
    ) {
        this._sharedService.pushactivewizard(3);
        this._sharedService.getUserState().subscribe(current => {
            this.errorMsg = '';
            this.userState = current;
            if (
                this.userState.program &&
                this.userState.program.programReferCode != null
            ) {
                this.ProgramIstrue = true;
            }
            if (this.userState.quote && this.userState.quote.quoteNo != null) {
                this.QuoteIstrue = true;
                this.isCollapsed = false;
            } else {
                this.QuoteIstrue = false;
                this._sharedService.setQuoteLineObj([]);
            }
        });

        this._sharedService.getQuoteLineObj().subscribe(data => {
            if (data && data.length > 0) {
                this.showPricing = true;
            } else {
                this.showPricing = false;
            }
            this.pricingListPerJobsites = data;
        });

        this._quoteService.getQuotes().subscribe(data => {
            if (data && data.length > 0) {
                this.quotes = data;
            } else {
                this.QuoteIstrue = false;
            }
        });

        this._quoteService.getSelectedQuote().subscribe(currentQuote => {
            this.selectedQuote = currentQuote;
            this.saveAsDefault = this.selectedQuote.Default_Quote__c;
            this.quoteStatus = this.selectedQuote.Quote_Status__c;
            this.errorMsg = '';
        });
    }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.searchFilter = {
            talentType: '',
            sla: '',
            vendorName: '',
            serviceEngTechLevel: '',
            countryid: '',
            countryddl: [],
            talentTypes: [],
            vendorNameList: []
        };
        this.getGlobalProfiles();
        this.loadCountries();
        this.loadTalentTypes();
        window.scrollTo(0, 0);
    }

    ngOnDestroy() {
        if (!this.source) {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.userState.program = {};
            this.userState.quote = {};
            this._jobLocationService.setSelectedLocations([]);
            this._jobLocationService.setJobLocations([]);
            this._sharedService.setUserState(this.userState);
        }
    }

    transform(value: string) {
        const dateformate = 'short';
        this.datePipe = new DatePipe('en-US');
        const formateddate = (value ? this.datePipe.transform(value, dateformate) : value);
        return formateddate;
    }

    filterPricing(type: string) {
        this.errorMsg = '';
        if (type === 'Pricing') {
            this.isCollapsed = false;
            this.pFilterType = true;
            this.pricingFilterType = 'Pricing';
        } else if (type === 'ServiceProvider') {
            this.isCollapsed = true;
            this.pricingFilterType = 'ServiceProvider';
        } else {
            this.pricingFilterType = 'ProfitAnalysis';
        }
    }

    getActiveNavBarStatus(choice: string) {
        if (this.pricingFilterType === choice) {
            return true;
        } else {
            return false;
        }
    }

    toggleAction(e) {
        this.selectAction = e.target.value;
        if (this.selectAction === 'newRevision') {
            this.quoteStatus = 'Active';
        } else {
            this.quoteStatus = this.selectedQuote.Quote_Status__c;
        }
    }

    toggleDefault(e) {
        if (e.target.checked) {
            this.saveAsDefault = true;
        } else {
            this.saveAsDefault = false;
        }
    }

    openPricingStepSaveModal(content, size, source) {
        this.errorMsg = '';
        this.successMsgModal = '';
        let isPricingTabHasError = false;
        let isProductNotFound = false;
        if (
            this.userState.program !== undefined &&
            this.userState.program.programReferCode != null
        ) {
            if (
                this.userState.quote !== undefined &&
                this.userState.quote.quoteNo != null
            ) {
                const saveProfiles = this._sharedService.getServiceProvider();
                const selectIndex = this.checkIfProvidersSelected(saveProfiles);
                if (selectIndex.length === 0) {
                    if (this.pricingListPerJobsites && this.pricingListPerJobsites.length > 0) {
                        for (let i = 0; i < this.pricingListPerJobsites.length; i++) {
                            if (
                                this.pricingListPerJobsites[i].Order_Quantity__c === '' ||
                                this.pricingListPerJobsites[i].Order_Quantity__c === null ||
                                this.pricingListPerJobsites[i].Order_Quantity__c === 'null'
                            ) {
                                isPricingTabHasError = true;
                                break;
                            }
                            if (this.pricingListPerJobsites[i].Product && this.pricingListPerJobsites[i].Product.Product_ID__c) {
                            } else {
                                isProductNotFound = true;
                                break;
                            }
                        }
                    }
                    if (isProductNotFound) {
                        this.errorMsg = 'Product is not available for all profiles';
                    } else if (isPricingTabHasError) {
                        this.errorMsg = 'Please select ppm hours information';
                    } else {
                        this.selectAction = 'currentRevision';
                        this.templateName = this.selectedQuote.Template_Name__c;
                        this.templateDescription = this.selectedQuote.Template_Description__c;
                        if (!source) {
                            this._modalService.open(content, size);
                        } else {
                            this.savePricingStep(source)
                        }
                    }
                } else {
                    this.ngbTabset.select('service');
                    this.errorMsg = 'Please select provider option for profile in row(s) - ' + selectIndex.join(' ,');
                }
            } else {
                this.errorMsg = 'Please select Quote';
            }
        } else {
            this.errorMsg = 'Please select Program';
        }
    }

    checkIfProvidersSelected(profiles) {
        let valToTrue = false;
        const selectIndex = [];
        if (profiles && profiles.length > 1) {
            for (let i = 0; i < profiles.length; i++) {
                if (profiles[i].hasOwnProperty('provider') && profiles[i].provider.hasOwnProperty('Vendor__c')) {
                    valToTrue = true;
                } else {
                    valToTrue = false;
                    selectIndex.push(i + 1);
                    // break;
                }
            }
        } else if (profiles && profiles.length === 0) {
            valToTrue = false;
            selectIndex.push(1);
        }
        return selectIndex;
    }

    savePricingStep(source) {
        if (this.selectAction === 'newRevision') {
            this.quoteVersion = this._quoteService.nextChar(
                this.selectedQuote.Quote_Version__c
            );
            this.createNewRevision();
        } else {
            this.quoteVersion = this.selectedQuote.Quote_Version__c;
            this.quoteStatus = 'Revised';
            this.updateRevision(source);
        }
    }

    goBack(): void {
        this.source = 'back';
        this._router.navigate(['/pms/configure/program']);
    }

    goNext() {
        this.source = 'next';
        this._router.navigate(['/pms/configure/instruction']);
    }

    createNewRevision() {
        this.successMsgModal = '';
        this._preloaderService.showPreloader();
        const quoteManagerObj = {
            Template_Name__c: this.templateName,
            Template_Description__c: this.templateDescription,
            Quote_Version__c: this.quoteVersion,
            Quote_Status__c: this.quoteStatus,
            Partner__c: this.selectedAccountId,
            Default_Quote__c: this.saveAsDefault,
            Project_SOP__c: this.userState.program.programSFId,
            Program_Reference_Code__c: this.userState.program.programReferCode
        };

        const dataForSave = this._sharedService.getServiceProvider();
        if (dataForSave && dataForSave.length) {
            dataForSave.forEach((item, index) => {
                item['Order_Quantity__c'] = this.pricingListPerJobsites[index].Order_Quantity__c,
                    item['Price_c'] = this.pricingListPerJobsites[index].Price__c,
                    item['Product__c'] = this.pricingListPerJobsites[index].Product.sfdcId,
                    item['Vendor_Cost__c'] = this.pricingListPerJobsites[index].Vendor_Cost__c,
                    item['Profit_Price__c'] = this.pricingListPerJobsites[index].Profit_Price__c
            })
            const paramObj = {
                quoteManagerObj: quoteManagerObj,
                dataForSave: dataForSave
            }

            this._quoteManagerApi.createNewRevision(paramObj).subscribe(
                data => {
                    this.successMsg = 'Quote updated successfully. Latest update will be available after 5 minutes.';
                    this.errorMsgModal = '';
                    this._modalService.closed();
                    this._preloaderService.hidePreloader();
                    window.scrollTo(0, 0);
                },
                err => {
                    this.errorMsgModal = err.msg;
                    this._preloaderService.hidePreloader();
                }
            );
        } else {
            this.errorMsgModal = 'Providers are not selected.';
            this._preloaderService.hidePreloader();
        }
    }

    updateRevision(source) {
        this.successMsgModal = '';
        this._preloaderService.showPreloader();
        const quoteManagerObj = {
            Template_Name__c: this.templateName,
            Template_Description__c: this.templateDescription,
            Quote_Version__c: this.quoteVersion,
            Quote_Status__c: this.quoteStatus,
            Partner__c: this.selectedAccountId,
            Default_Quote__c: this.saveAsDefault,
            Project_SOP__c: this.userState.program.programSFId,
            Program_Reference_Code__c: this.userState.program.programReferCode
        };

        if (quoteManagerObj.Default_Quote__c) {
            this._quoteManagerApi.updateAll(
                {
                    'Partner__c': quoteManagerObj.Partner__c,
                    'Project_SOP__c': quoteManagerObj.Project_SOP__c,
                    'Default_Quote__c': true
                },
                {
                    'Default_Quote__c': false
                }
            ).subscribe(
                res => {
                    this.updateQuoteManager(quoteManagerObj, source);
                },
                error => {
                    this.source = null;
                    this.errorMsgModal = 'Error in updating Quote';
                    this._preloaderService.hidePreloader();
                })
        } else {
            this.updateQuoteManager(quoteManagerObj, source);
        }
    }

    updateQuoteManager(quoteManagerObj, source) {
        this._quoteManagerApi
            .updateAll({ id: this.selectedQuote.id }, quoteManagerObj)
            .subscribe(
            qtm => {
                if (qtm && qtm.count) {
                    const dataForSave = this._sharedService.getServiceProvider();
                    if (dataForSave && dataForSave.length) {
                        dataForSave.forEach((item, index) => {
                            this.updateQuoteLineManager(item, index, source);
                        });
                    }
                    this._preloaderService.hidePreloader();
                    if (source === 'goNext') {
                        this.goNext();
                    } else {
                        this.successMsgModal = 'Price Quote saved successfully.'
                    }
                }
            },
            err => {
                console.log(err);
                this.source = null;
                this.errorMsgModal = 'Error in updating Quote';
                this._preloaderService.hidePreloader();
            }
            );
    }

    updateQuoteLineManager(dataForSave, index, source) {
        this._preloaderService.showPreloader();

        if (this.pricingListPerJobsites && this.pricingListPerJobsites.length > 0) {
            if (this.pricingListPerJobsites[index].id !== '' && dataForSave !== undefined) {
                if (dataForSave.hasOwnProperty('jobsiteSFID')) {
                    const chrsPos = dataForSave['coverageHrs'].indexOf('(');
                    const chrs = dataForSave['coverageHrs'].substr(
                        chrsPos + 1,
                        dataForSave['coverageHrs'].length - 2
                    );

                    const quoteLineManagerObj = {
                        Jobsite__c: dataForSave['jobsiteSFID'],
                        Status__c: dataForSave['status'],
                        Dispatch_SLA_Priority__c: dataForSave['slaPriority'],
                        Service_Engineer_Technical_Level__c: dataForSave['technicalLevel'],
                        Talent_Type__c: dataForSave['talentTypeID'],
                        CoverageHour__c: chrs.replace(')', ''),
                        Vendor_Account__c: dataForSave.provider ? dataForSave.provider['Vendor__c'] : null,
                        Vendor__c: dataForSave.provider ? dataForSave.provider['sfdcId'] : null,
                        Order_Quantity__c: this.pricingListPerJobsites[index].Order_Quantity__c,
                        Price__c: this.pricingListPerJobsites[index].Price__c,
                        Product__c: this.pricingListPerJobsites[index].Product.sfdcId,
                        Vendor_Cost__c: this.pricingListPerJobsites[index].Vendor_Cost__c,
                        Profit_Price__c: this.pricingListPerJobsites[index].Profit_Price__c
                    };

                    this._quoteLineManagerApi
                        .updateAll({ id: this.pricingListPerJobsites[index].id }, quoteLineManagerObj)
                        .subscribe(
                        qtlm => {
                            this.successMsg = 'Quote updated successfully.';
                            if (this.pricingListPerJobsites && ((index + 1) === this.pricingListPerJobsites.length)) {
                                this._preloaderService.hidePreloader();
                                if (source !== 'goNext') {
                                    this._modalService.closed();
                                    window.scrollTo(0, 0);
                                }
                            }
                        },
                        err => {
                            this.errorMsgModal = err.msg;
                            this._preloaderService.hidePreloader();
                        }
                        );
                }
            }
        }
    }
    // Opens expanded view modals
    openExpandedViewModal(content, size, isSrcProvider) {
        if (isSrcProvider) {
            this.resetSearchFilter();
        }
        this._modalService.open(content, size);
    }

    exportQuotes() {
        const fileName = 'CSQD_QuoteExpandedView';
        const data = [];
        this.quotes.forEach((element, index) => {
            const obj = {
                'Quote No': element.Iron_Quote_Number__c,
                Rev: element.Quote_Version__c,
                'Template Name': element.Template_Name__c,
                Description: element.Template_Description__c,
                Default: (element.Default_Quote__c) ? 'true' : 'False',
                Date: this.transform(element.CreatedDate)
            };
            data.push(obj);
        });

        if (data.length) {
            this._sharedService.exportData(data, fileName);
        }
    }

    exportPricing() {
        const data = [];
        this.pricingListPerJobsites.forEach((element, index) => {
            const obj = {
                No: index + 1,
                'Jobsite #': element.Jobsite.Name,
                'Program #': this.userState.program.programName,
                'Service Profile': (element.Service_Engineer_Technical_Level__c) ? (
                    element.Service_Engineer_Technical_Level__c +
                    '/' +
                    element.Dispatch_SLA_Priority__c) : '',
                'Service ID': (element.Product && element.Product.Product_ID__c) ? element.Product.Product_ID__c : '',
                'Service Description': (element.Product && element.Product.Description) ? element.Product.Description : '',
                'PPM hours': element.Order_Quantity__c,
                Price: element.Price__c
            };
            data.push(obj);
        });
        const fileName = 'DispatchService';
        if (data.length) {
            this._sharedService.exportData(data, fileName);
        }

    }

    exportVendorPricing() {
        const data = [];
        this.pricingListPerJobsites.forEach((element, index) => {
            const obj = {
                No: index + 1,
                'Jobsite #': element.Jobsite.Name,
                'Program #': this.userState.program.programName,
                'Service Profile': (element.Service_Engineer_Technical_Level__c) ? (
                    element.Service_Engineer_Technical_Level__c +
                    '/' +
                    element.Dispatch_SLA_Priority__c) : '',
                'Service ID': (element.Product && element.Product.Product_ID__c) ? element.Product.Product_ID__c : '',
                'Service Description': (element.Product && element.Product.Description) ? element.Product.Description : '',
                'PPM hours': element.Order_Quantity__c,
                Price: element.Vendor_Cost__c
            };
            data.push(obj);
        });
        const fileName = 'DispatchServiceVendor';
        if (data.length) {
            this._sharedService.exportData(data, fileName);
        }
    }

    exportProfitPricing() {
        const data = [];
        this.pricingListPerJobsites.forEach((element, index) => {
            const obj = {
                No: index + 1,
                'Jobsite #': element.Jobsite.Name,
                'Program #': this.userState.program.programName,
                'Service Profile': (element.Service_Engineer_Technical_Level__c) ? (
                    element.Service_Engineer_Technical_Level__c +
                    '/' +
                    element.Dispatch_SLA_Priority__c) : '',
                'Service ID': (element.Product && element.Product.Product_ID__c) ? element.Product.Product_ID__c : '',
                'Service Description': (element.Product && element.Product.Description) ? element.Product.Description : '',
                'PPM hours': element.Order_Quantity__c,
                Price: element.Profit_Price__c,
                'Profit (%)': element.Profit_Price__c / element.Vendor_Cost__c * 100
            };
            data.push(obj);
        });
        const fileName = 'DispatchServiceProfit';
        if (data.length) {
            this._sharedService.exportData(data, fileName);
        }
    }
    exportProviders() {
        const fileName = 'ExpandedProviders';
        const data = [];
        this.globalProfiles.forEach((element, index) => {
            const obj = {
                No: index + 1,
                'Vendor Name': element.account.Name,
                'Metro Pool #': element.Metro_Pool__c,
                City: element.account.ShippingCity,
                State: element.account.ShippingState,
                Country: element.account.ShippingCountry,
                Zip: element.account.ShippingPostalCode,
                'Service Technical level': element.Service_Technical_Level__c,
                'Talent Type': element.TalentType.Talent_Type_Name__c,
                SLA: element.SLA__c,
                Rating: element.Vendor_Rating__c
            };
            data.push(obj);
        });

        if (data.length) {
            this._sharedService.exportData(data, fileName);
        }
    }

    getGlobalProfiles() {
        this.globalProfiles = [];
        this._metroVirtualVendorPoolApi
            .find({
                include: [
                    {
                        relation: 'TalentType',
                        scope: { fields: ['Talent_Type_Name__c'] }
                    },
                    { relation: 'GeoMetro', scope: { fields: ['Name'] } },
                    'account'
                ],
                order: 'Vendor_Rating__c DESC'
            })
            .subscribe(
            data => {
                this.globalProfiles = new UniquePipe().transform(
                    data,
                    'account',
                    'sfdcId'
                );
                this.filteredGlobalProfiles = this.globalProfiles;
                let uniqueVnames = new UniquePipe().transform(
                    data,
                    'account',
                    'Name'
                );

                uniqueVnames.forEach(element => {
                    if (this.searchFilter.vendorNameList.indexOf(element.account.Name) === -1) {
                        this.searchFilter.vendorNameList.push(element.account.Name);
                    }
                });

            },
            err => {
                console.log(err);
            }
            );
    }

    loadCountries() {
        this._countryCodeApi.find({ order: 'Country__c' }).subscribe(
            data => {
                this.searchFilter.countryddl = data;
            },
            err => {
                console.log('Error fetching countries>>', err.message);
            }
        );
    }
    loadTalentTypes() {
        this._talentTypeApi.find({}).subscribe(
            data => {
                this.searchFilter.talentTypes = data
                    .map(item => item['Talent_Type_Name__c'])
                    .filter((value, index, self) => self.indexOf(value) === index);
            },
            err => {
                console.log('Error fetching talent types>>', err.message);
            }
        );
    }

    filterServiceProviders() {
        return this.filteredGlobalProfiles.filter(item => {
            if (
                this.searchFilter.serviceEngTechLevel !== '' &&
                item.Service_Technical_Level__c.indexOf(this.searchFilter.serviceEngTechLevel) === -1
            ) {
                return false;
            } else if (
                this.searchFilter.talentType !== '' &&
                item.TalentType.Talent_Type_Name__c !==
                this.searchFilter.talentType
            ) {
                return false;
            } else if (
                this.searchFilter.sla !== '' &&
                item.SLA__c.indexOf(this.searchFilter.sla) === -1
            ) {
                return false;
            } else if (
                this.searchFilter.countryid !== '' &&
                item.account.Shipping_country_Code__c !==
                this.searchFilter.countryid
            ) {
                return false;
            } else if (
                this.searchFilter.vendorName !== '' &&
                item.account.Name !==
                this.searchFilter.vendorName
            ) {
                return false;
            } else {
                return true;
            }
        });
    }

    filterProviders() {
        this.globalProfiles = this.filterServiceProviders();
    }

    resetSearchFilter() {
        this.searchFilter.talentType = '';
        this.searchFilter.sla = '';
        this.searchFilter.vendorName = '';
        this.searchFilter.serviceEngTechLevel = '';
        this.searchFilter.countryid = '';
        this.searchFilter.countryddl = this.searchFilter.countryddl;
        this.searchFilter.talentTypes = this.searchFilter.talentTypes;
        this.searchFilter.vendorNameList = this.searchFilter.vendorNameList;
    }
}
