import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';

import { PreloaderService } from '../../../../shared/services/preloader.service';
import { SharedService } from '../../../../shared/services/pms/shared.services';
import { jobLocationMapService } from '../../../../shared/services/pms/job-location.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { AppStateService } from './../../../../shared/services/app-state.service';

import { UniquePipe } from '../../../../shared/pipe/unique/unique.pipe';

import { ProjectApi, QuoteManagerApi, FilterServiceApi, MetroVirtualVendorPoolApi, RecordTypeApi } from '../../../../shared/sdk';

@Component({
    templateUrl: './program-setup.component.html',
    styleUrls: ['./program-setup.component.css']
})

export class ProgramSetupComponent implements OnInit, OnDestroy {

    selectedAccountId: string;
    existingProgram = 'none';
    userState: any;
    ProgramIstrue = false;
    showProvider = true;
    program: any;
    isDispatchTrue = false;
    selectedJobsites: any;
    templateDescription: string;
    templateName: string;
    successMsg = '';
    initialMessage = '';
    errorMsg = '';
    errorMsgModal = '';
    Iron_Quote_Number__c = '';
    objQuoteManager: any;
    quoteName: string;
    quoteVersion: string;
    defaultQuote = false;
    searchFilter: any = {};
    filteredGlobalProfiles = [];
    globalProfiles: any;
    private subscription: Subscription;
    jobType: any;
    /*Boot-Datatable params */
    loadingIndicator = false;
    tableData = [];
    itemsPerPage = 10;
    orderBy = 'title';
    errorMessage = '';
    source: string;

    constructor(
        private _router: Router,
        private _sharedService: SharedService,
        private _jobLocationService: jobLocationMapService,
        private _modalService: ModalService,
        private _preloaderService: PreloaderService,
        private _appState: AppStateService,
        private _recordType: RecordTypeApi,
        private _projectApi: ProjectApi,
        private _quoteManagerApi: QuoteManagerApi,
        private _metroVirtualVendorPoolApi: MetroVirtualVendorPoolApi,
        private _filterServiceApi: FilterServiceApi,
        private el: ElementRef
    ) {
        this._sharedService.pushactivewizard(2);

        this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
            if (this.userState && this.userState.program && this.userState.program.programReferCode != null) {
                this.ProgramIstrue = true;
                this.existingProgram = 'true';
                this.jobType = 'useExisting';
            } else {
                this.isDispatchTrue = false;
                this.ProgramIstrue = false;
            }
            this.successMsg = '';
            this.errorMsg = '';
        });

        this._jobLocationService.getSelectedLocations().subscribe(data => {
            this.selectedJobsites = data;
            if (this.selectedJobsites.length > 0) {
                this.errorMsg = '';
                this.isDispatchTrue = true;
            } else {
                this.isDispatchTrue = false;
            }
        });
    }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.jobType = 'useExisting';
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
    } 

    ngOnDestroy() {
        if (!this.source) {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.userState.program = {};
            this.userState.quote = {};
            this._sharedService.setUserState(this.userState);
        }
    }

    submit() {
        this.errorMsg = '';
        if (this.existingProgram === 'true') {
            this.program = { isExisting: true };
        } else {
            this.program = { isExisting: false };
        }
        this.successMsg = '';
        this.userState.program = this.program;
        this._sharedService.setUserState(this.userState);
    }

    createProgram(programName) {
        if (programName !== '' && this.selectedAccountId) {
            this._recordType.findOne({ where: { Name: 'Master' }, fields: ['sfdcId'] }).subscribe(result => {
                if (result['sfdcId']) {
                    const projectObj = {
                        Name: programName,
                        Account__c: this.selectedAccountId,
                        Status__c: 'Active',
                        RecordTypeId: result['sfdcId']
                    };
                    this._projectApi.create(projectObj).subscribe(
                        project => {
                            this.successMsg = 'Program created successfully. Latest creation will be available after 5 minutes.';
                            this.errorMsg = '';
                        },
                        err => {
                            console.log(err);
                            this.errorMsg = err.msg;
                            this.successMsg = '';
                        }
                    );
                }
            }, err => {
                console.log(err);
                if (err.code === 'MODEL_NOT_FOUND') {
                    this.errorMsg = 'Master Record Type Is Missing!';
                    this.successMsg = '';
                } else {
                    this.errorMsg = err.message;
                    this.successMsg = '';
                }
            })


        }
    }

    getIronQuoteNumber() {
        const reqObj = {
            fields: ['sfdcId', 'Iron_Quote_Number__c', 'Template_Name__c', 'Template_Description__c'],
            where: {
                Partner__c: this.selectedAccountId,
                Project_SOP__c: this.userState.program.programSFId,
                Default_Quote__c: true
            }
        };
        this._quoteManagerApi.findOne(reqObj).subscribe(
            data => {
                this.defaultQuote = true;
                if (data) {
                    this.Iron_Quote_Number__c = data['Iron_Quote_Number__c'];
                    this.templateName = data['Template_Name__c'];
                    this.templateDescription = data['Template_Description__c'];
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    checkIfDifferent(el, index, arr) {
        let arrDifferent = [];
        arr.map((item, i) => {
            if (index === i) {
                arrDifferent.push(true)
            } else {
                arrDifferent.push(!(el.jobsite === item.jobsite && el.talentType === item.talentType &&
                    el.technicalLevel === item.technicalLevel && el.slaPriority === item.slaPriority &&
                    el.coverageHrs === item.coverageHrs));
            }
        });

        if (arrDifferent.indexOf(false) !== -1) {
            return false;
        } else {
            return true;
        }
    }

    checkIfNone(el, index) {
        return !(el.talentType === '--none--' || el.technicalLevel === '--none--' || el.slaPriority === '--none--' ||
            el.coverageHrs === '--none--')
    }
    updateJobtype(e) {
        this.errorMsg = '';
        this.jobType = e.jobType;
    }

    openProgramStepSaveModal(content, size, source) {
        this.successMsg = '';
        this.errorMsg = '';
        this.errorMsgModal = '';
        if (this.userState.program !== undefined && this.userState.program.programReferCode != null && this.jobType == 'useExisting') {
            const saveProfiles = this._sharedService.getServiceProvider();
            let isComplete = [];
            let isDiffProfile, isNoneSelected = true;
            if (this.selectedJobsites.length > 0) {
                if (saveProfiles.length > 0) {
                    isNoneSelected = saveProfiles.every(this.checkIfNone);
                    if (!isNoneSelected) {
                        this.errorMsg = 'Please select profile information!';
                    } else {
                        isDiffProfile = saveProfiles.every(this.checkIfDifferent);
                        if (isDiffProfile === false) {
                            this.errorMsg = 'Please select different profile information!';
                        } else {
                            const selectIndex = [];
                            saveProfiles.forEach((item, index) => {
                                if (item.hasOwnProperty('provider') && item.jobsite != null && item.serviceZone) {
                                    isComplete[index] = 'true';
                                } else {
                                    isComplete[index] = 'false';
                                    selectIndex.push(index + 1);
                                }
                            });
                            if (selectIndex.length > 0) {
                                this.errorMsg = 'Please select provider option for profile in row(s) - ' + selectIndex.join(' ,');
                            } else {
                                this.errorMsg = '';
                            }
                        }
                    }
                } else {
                    this.errorMsg = 'Please populate all service profile!';
                }
            } else {
                this.errorMsg = 'Please select jobsite and profile information!';
            }
            if (isComplete.indexOf('false') === -1 && isDiffProfile && isComplete.length > 0) {
                this.getIronQuoteNumber();
                if (!source) {
                    this._modalService.open(content, size);
                } else {
                    this.saveProgramStep(source)
                }
            }
        } else {
            this.source = null;
            if (this.jobType != 'useExisting' && this.userState && this.userState.program && this.userState.program.programReferCode) {
                this.errorMsg = 'Please select existing jobsite and proceed further!';
            } else {
                this.errorMsg = 'Please select Program!';
            }
        }
    }

    saveProgramStep(source) {
        const paramObj = {
            'Partner__c': this.selectedAccountId,
            'Project_SOP__c': this.userState.program.programSFId,
            'Program_Reference_Code__c': this.userState.program.programReferCode,
            'Template_Name__c': this.templateName ? this.templateName : '',
            'Template_Description__c': this.templateDescription ? this.templateDescription : '',
            'SelectedProfiles': this._sharedService.getServiceProvider()
        };

        this._preloaderService.showPreloader();
        this._quoteManagerApi.saveProvidersProfile(paramObj).subscribe(
            data => {
                this.successMsg = 'Service profiles saved!';
                this.errorMsg = '';
                if (source && source === 'goNext') {
                    this.goNext();
                } else {
                    this._modalService.closed();
                    this._preloaderService.hidePreloader();
                    window.scrollTo(0, 0);
                }
            },
            err => {
                this._preloaderService.hidePreloader();
                this.source = null;
                this.errorMsgModal = 'Error in updating Quote Manager';
            }
        );
    }

    goBack(): void {
        this._router.navigate(['/pms/configure'])
    }

    goNext() {
        this.source = 'next';
        this._router.navigate(['/pms/configure/pricing'])
    }

    filterProviders() {
        this.loadingIndicator = true;
        this.globalProfiles = this.filterServiceProviders();
        const providersData = [];
        let obj = {};
        this.globalProfiles.forEach(element => {
            obj = {};
            obj['Metro_Pool__c'] = element['Metro_Pool__c'];
            obj['Service_Technical_Level__c'] = element['Service_Technical_Level__c'];
            obj['SLA__c'] = element['SLA__c'];
            obj['Vendor_Rating__c'] = element['Vendor_Rating__c'];
            obj['Talent_Type_Name__c'] = element['TalentType'] ? element['TalentType']['Talent_Type_Name__c'] : '';
            obj['VendorName'] = element['account'] ? element['account']['Name'] : '';
            obj['ShippingCity'] = element['account'] ? element['account']['ShippingCity'] : '';
            obj['ShippingState'] = element['account'] ? element['account']['ShippingState'] : '';
            obj['ShippingCountry'] = element['account'] ? element['account']['ShippingCountry'] : '';
            obj['ShippingPostalCode'] = element['account'] ? element['account']['ShippingPostalCode'] : '';
            providersData.push(obj);
        });
        this.initialMessage = providersData.length ? '' : 'No record found';
        this.tableData = providersData;
        this.loadingIndicator = false;
    }

    getGlobalProfiles() {
        this.globalProfiles = [];
        this.errorMessage = 'Loading...';
        this._metroVirtualVendorPoolApi.getGlobalProfiles({}).subscribe(
            data => {
                if (data.data && data.data.length) {
                    data = data.data;
                    this.globalProfiles = new UniquePipe().transform(
                        data,
                        'account',
                        'sfdcId'
                    );
                    this.filteredGlobalProfiles = this.globalProfiles;
                    const uniqueVnames = new UniquePipe().transform(
                        data,
                        'account',
                        'Name'
                    );
                    uniqueVnames.forEach(element => {
                        if (this.searchFilter.vendorNameList.indexOf(element.account.Name) === -1) {
                            this.searchFilter.vendorNameList.push(element.account.Name);
                        }
                    });
                    this.filterProviders();
                } else {
                    this.errorMessage = 'No records to display.';
                }
            },
            err => {
                this.errorMessage = err.message;
                console.log(err);
            }
        );
    }

    filtersData() {
        const reqObj = {
            'accountId': this.selectedAccountId,
            'models': ['TalentType', 'Country']
        };
        this._filterServiceApi.getAllFiltersData(reqObj).subscribe(
            data => {
                if (data && data.data) {
                    data = data.data;
                    this.searchFilter.countryddl = [];
                    if (data['countries'] && data['countries']['list']) {
                        this.searchFilter.countryddl = data['countries']['list'];
                    }
                    this.searchFilter.talentTypes = [];
                    if (data['talentTypes'] && data['talentTypes']['list']) {
                        this.searchFilter.talentTypes = data['talentTypes']['list']
                            .map(item => item['Talent_Type_Name__c'])
                            .filter((value, index, self) => self.indexOf(value) === index);
                    }
                }
            },
            err => {
                console.log('Error fetching talent types>>', err.message);
            }
        );
    }

    filterServiceProviders() {
        return this.filteredGlobalProfiles.filter(item => {
            if (this.searchFilter.serviceEngTechLevel !== '' && item.Service_Technical_Level__c &&
                item.Service_Technical_Level__c.indexOf(this.searchFilter.serviceEngTechLevel) === -1) {
                return false;
            } else if (this.searchFilter.talentType !== '' && item.TalentType.Talent_Type_Name__c !== this.searchFilter.talentType) {
                return false;
            } else if (this.searchFilter.sla !== '' && item.SLA__c.indexOf(this.searchFilter.sla) === -1) {
                return false;
            } else if (this.searchFilter.vendorName !== '' && item.account.Name !== this.searchFilter.vendorName) {
                return false;
            } else if (this.searchFilter.countryid !== '') {
                if (item.account && item.account.ShippingCountry) {
                    if (item.account.ShippingCountry.toLowerCase().indexOf(this.searchFilter.countryid.toLowerCase()) === -1) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            } else {
                return true;
            }
        });
    }

    initSearchFilter() {
        this.searchFilter.talentType = '';
        this.searchFilter.sla = '';
        this.searchFilter.vendorName = '';
        this.searchFilter.serviceEngTechLevel = '';
        this.searchFilter.countryid = '';
        this.searchFilter.countryddl = this.searchFilter.countryddl;
        this.searchFilter.talentTypes = this.searchFilter.talentTypes;
        this.searchFilter.vendorNameList = this.searchFilter.vendorNameList;
    }

    resetSearchFilter() {
        this.initSearchFilter();
        this.filterProviders();
    }

    openExpandedViewModal(content, size) {
        this.filtersData();
        this.initSearchFilter();
        this.tableData = []
        this.getGlobalProfiles();
        this._modalService.open(content, size);
    }

    cancelAndReset() {
        if (this.userState && this.userState.program && this.userState.program.programSFId) {
            this.userState.program = {};
            this._sharedService.setUserState(this.userState);
        }
        this.existingProgram = 'null';
        this.successMsg = '';
        this.errorMsg = '';
        window.scrollTo(0, 0);
    }

    exportAsCsv(fileConfig) {
        fileConfig.name = 'SelectedProvider';
        fileConfig.showOnlyVisibleColumns = true;
        // this.tableResource.downloadCsv(fileConfig);
    }

}
