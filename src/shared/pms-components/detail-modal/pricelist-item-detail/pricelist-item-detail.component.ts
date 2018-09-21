import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PreloaderService } from '../../../services/preloader.service';
import { AppStateService } from '../../../services/app-state.service';
import { SharedService } from '../../../services/pms/shared.services';

import { PricelistItemApi, FilterServiceApi } from '../../../sdk';

@Component({
    selector: 'pricelist-item-detail',
    templateUrl: './pricelist-item-detail.component.html',
    styleUrls: ['./pricelist-item-detail.component.css']
})

export class PricelistItemDetailComponent implements OnInit, OnDestroy, AfterViewInit {

    selectedAccountId: string;
    @Input() page: any;
    @Input() programId: any;
    userState: any;
    userType: any;
    searchFilter: any = {};
    whereCondition: any = {};
    allProgramIds = [];
    selectedProgramIds = [];
    selectedProgramName: any;
    programName: any;
    selectedPriceListId: any;
    priceListName = '';
    // setup for pagination
    columns: any;
    allColumns: any;
    tableData = []
    loadingIndicator = false;
    errorMessage: any;
    itemsPerPage = 10;
    itemsPerBatch = 200;
    private subscription: Subscription;
    @ViewChild('myTable') table: any;
    noRecords = false;
    // orderBy = 'CreatedDate DESC';// Coverage item define for dropdown and for pricelist mapping
    coverageHoursList = [
        {
            'sfdcId': '9H5D',
            'Name': 'Next Business Day, Business Hours (9H5D)'
        },
        {
            'sfdcId': '24x7-HLDY',
            'Name': 'Holiday Coverage(HLDY)'
        },
        {
            'sfdcId': '24x7-DAY',
            'Name': 'Same Day, Business Hours(DAY)'
        },
        {
            'sfdcId': '24x7-WKND',
            'Name': 'Weekend Coverage(WKND)'
        },
        {
            'sfdcId': '24x7-AFTH',
            'Name': 'Same Day, After Hours(AFTH)'
        }
    ];

    constructor(
        private _preloaderService: PreloaderService,
        private _appState: AppStateService,
        private _sharedservice: SharedService,
        private _filterServiceAPI: FilterServiceApi,
        private _priceListItemAPI: PricelistItemApi,
        private el: ElementRef
    ) {

        this.columns = [
            { name: 'Product Id', prop: 'Product_Id', width: 120, visible: true, sortable: true },
            { name: 'Product Name', prop: 'Product_Name', width: 300, visible: true, sortable: true },
            { name: 'Program', prop: 'Master_Program', width: 200, visible: true, sortable: true },
            { name: 'Service Engineer Talent Type', width: 300, prop: 'Talent_Type', visible: true, sortable: true },
            { name: 'Service Engineer (Technical Level)', width: 150, prop: 'Technical_Level', visible: true, sortable: true },
            { name: 'Dispatch SLA Priority', prop: 'Dispatch_SLA', width: 150, visible: true, sortable: true },
            { name: 'Coverage Hours', prop: 'Coverage_Hours', width: 200, visible: true, sortable: true },
            { name: 'Country', prop: 'Country__c', width: 150, visible: true, sortable: true },
            { name: 'PPE-1HR Standard Price', prop: 'PPE_1HR', width: 120, visible: true, sortable: true, type: 'NA' },
            { name: 'PPE-2HR Standard Price', prop: 'PPE_2HR', width: 120, visible: true, sortable: true, type: 'NA' },
            { name: 'PPE-3HR Standard Price', prop: 'PPE_3HR', width: 120, visible: true, sortable: true, type: 'NA' },
            { name: 'PPE-4HR Standard Price', prop: 'PPE_4HR', width: 120, visible: true, sortable: true, type: 'NA' },
            { name: 'PPE-8HR Standard Price', prop: 'PPE_8HR', width: 120, visible: true, sortable: true, type: 'NA' },
            { name: 'T&M Price (Per Hour)', prop: 'T_M_Standard_Price', width: '120', visible: true, sortable: true, type: 'NA' },
        ];

        this.allColumns = this.columns.slice(); // Used for Columns Toggling
    }

    ngAfterViewInit() {
        let elHeader = this.el.nativeElement.querySelector('.datatable-header')
        let elBody = this.el.nativeElement.querySelector('datatable-body');
        elHeader.onscroll = () => {
            elBody.scrollLeft = elHeader.scrollLeft
        }
        elBody.onscroll = () => {
            elHeader.scrollLeft = elBody.scrollLeft
        }
    }
    ngOnInit() {
        this.userType = this._appState.getAccessType();
        this.selectedAccountId = this._appState.getSelectedAccount();
        if (this.page === 'content-price-lists') {
            this.initFiltersObj();
            this.loadFilters(this.selectedAccountId);
        }
        if (this.page === 'pricelist-manager') {
            this.subscription = this._sharedservice.getUserState().subscribe(current => {
                this.userState = current;
                if (this.userState.partner && this.userState.partner.sfdcId) {
                    this.allProgramIds = [];
                    this.initFiltersObj();
                    this.loadFilters(this.userState.partner.sfdcId);
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    initFiltersObj() {
        this.searchFilter = {
            talentTypes: [],
            talentType: '',
            technicalLevels: [],
            technicalLevel: '',
            coverageHours: [],
            coverageHour: '',
            slaPriorities: [],
            slaPriority: '',
            countries: [],
            country: '',
            programs: [],
            program: ''
        };
        this.whereCondition = {};
    }

    loadFilters(accountId) {
        const paramObj = {
            'accountId': accountId,
            'models': ['TalentType', 'TechnicalLevel', 'SLAPriority', 'Country', 'Project']
        };
        this._filterServiceAPI.getAllFiltersData(paramObj).subscribe(
            results => {
                this.allProgramIds = [];
                for (const key in results.data) {
                    if (!results.data[key].error) {
                        this.searchFilter[key] = results.data[key].list;
                    } else {
                        console.log('Error fetching filters data >>', results.data[key].error);
                    }
                }
                this.searchFilter['coverageHours'] = this.coverageHoursList;
                this.searchFilter['programs'].forEach((element, index) => {
                    this.allProgramIds.push(element['sfdcId']);
                    if (index === (this.searchFilter['programs'].length - 1)) {
                        this.selectedProgramName = element['Project__c'] + ' ' + element['Name'];
                    }
                });
                this.selectedProgramIds = this.allProgramIds;
                const programId = this.programId ? this.programId : this.selectedProgramIds[this.selectedProgramIds.length - 1];
                this.onProgramChange(programId, true);
                this._preloaderService.hidePreloader();
            },
            err => {
                console.log('Error fetching filters data>>', err.message);
            }
        );
    }

    filterPricelist() {
        const where = {};
        let isFilterUsed = true;
        this.selectedProgramIds = [];
        this.selectedProgramIds = this.allProgramIds;
        if (this.searchFilter.talentType !== '') {
            where['Talent_Type_Name__c'] = this.searchFilter.talentType;
            isFilterUsed = true;
        }
        if (this.searchFilter.technicalLevel !== '') {
            where['Service_Technical_Level__c'] = this.searchFilter.technicalLevel;
            isFilterUsed = true;
        }
        if (this.searchFilter.coverageHour !== '') {
            where['Coverage_Hours__c'] = this.searchFilter.coverageHour;
            isFilterUsed = true;
        }
        if (this.searchFilter.slaPriority !== '') {
            where['SLA__c'] = this.searchFilter.slaPriority;
            isFilterUsed = true;
        }
        if (this.searchFilter.country !== '') {
            where['GEO_Country__c'] = this.searchFilter.country;
            isFilterUsed = true;
        }
        if (this.searchFilter.program !== '') {
            this.selectedProgramIds = [];
            this.selectedProgramIds.push(this.searchFilter.program);
            isFilterUsed = true;
        }

        if (isFilterUsed) {
            this.whereCondition = {};
            this.whereCondition = where;
            this.loadPriceListItemsDetails(0);
        }
    }

    onProgramChange(programId, isCallPriceList, e = '') {
        if (e && e['target'] && e['target'].selectedOptions) {
            this.selectedProgramName = e['target'].selectedOptions[0].text;
        }
        this.searchFilter.program = programId;
        this.priceListName = '';
        this.selectedPriceListId = '';
        if (programId !== '' && programId !== '--None--') {
            const paramObj = {
                'programId': programId,
                'models': ['Pricelist']
            };
            this.table.offset = 0
            this._filterServiceAPI.getAllFiltersData(paramObj).subscribe(
                results => {
                    if (results.data['pricelist']['list'].length) {
                        this.priceListName = results.data['pricelist']['list'][0]['Name'];
                        this.selectedPriceListId = results.data['pricelist']['list'][0]['sfdcId'];
                        if (isCallPriceList) {
                            this.loadPriceListItemsDetails(0);
                        }
                    } else {
                        this.selectedPriceListId = '';
                        this.loadPriceListItemsDetails(0);
                    }
                },
                err => {
                    console.log('Error fetching filters data>>', err.message);
                    this._preloaderService.hidePreloader();
                }
            );
        }
    }

    resetFilters() {
        this.searchFilter.talentType = '';
        this.searchFilter.technicalLevel = '';
        this.searchFilter.coverageHour = '';
        this.searchFilter.slaPriority = '';
        this.searchFilter.country = '';
        this.searchFilter.program = '';
        this.whereCondition = {};
        const programId = this.programId ? this.programId : this.allProgramIds[this.allProgramIds.length - 1];
        this.onProgramChange(programId, true);
    }

    loadPriceListItemsDetails(offset: number, isLoadMore = false) {
        this._preloaderService.showPreloader();
        this.loadingIndicator = true;
        if (this.selectedProgramIds.length && this.selectedPriceListId) {
            const paramObj = {
                'programId': this.selectedProgramIds,
                'priceListId': this.selectedPriceListId,
                'where': this.whereCondition,
                'limit': this.itemsPerBatch,
                'skip': offset
            };
            this._priceListItemAPI.searchPriceListItems(paramObj).subscribe(
                results => {
                    results = results && results.pricelist;
                    if (results) {
                        results.forEach(element => {
                            const fullCoverage = this.coverageHoursList.find(x => {
                                return x['sfdcId'] === element.Coverage_Hours;
                            })
                            if (fullCoverage) {
                                element['Coverage_Hours'] = fullCoverage.Name;
                            }
                        });
                    }
                    this.programName = this.selectedProgramName;
                    this.noRecords = (results.length < this.itemsPerBatch) ? true : false;
                    if (!isLoadMore) {
                        this.tableData = results;
                    } else {
                        results.forEach(c => {
                            this.tableData.push(c);
                        });
                        this.tableData = [...this.tableData];
                    }
                    this.setEmptyMessage();
                    this.loadingIndicator = false;
                    this._preloaderService.hidePreloader();
                },
                err => {
                    this._preloaderService.hidePreloader();
                    this.loadingIndicator = false;
                }
            );
        } else {
            this._preloaderService.hidePreloader();
            this.tableData = [];
            this.loadingIndicator = false;
        }
    }

    /*Data Table funcation start here*/
    loadMoreRecords() {
        this.loadPriceListItemsDetails(this.tableData.length, true);
    }

    setEmptyMessage() {
        this.errorMessage = '';
        if (!this.tableData.length) {
            this.errorMessage = 'No data to display.';
            this.tableData = [{}];
            this.tableData[0]['Product_Name'] = this.errorMessage;
        }
    }

    toggle(col) {
        col.visible = !col.visible;
    }

    exportCSV() {
        if (this.tableData.length) {
            const Data = [];
            this.tableData.map(e => {
                e['Master_Program'] = this.programName;
                Data.push(e);
            })
            this._sharedservice.exportNgxData(Data, this.allColumns, 'priceList');
        }
    }
}
