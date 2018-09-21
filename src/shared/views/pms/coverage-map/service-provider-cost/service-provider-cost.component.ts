import { Component, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';

import { SharedService } from '../../../../services/pms/shared.services';
import { PreloaderService } from '../../../../services/preloader.service';
import { UniquePipe } from '../../../../pipe/unique/unique.pipe';

import { FilterServiceApi, PricelistItemApi } from '../../../../sdk';

@Component({
    selector: 'service-provider-cost',
    templateUrl: './service-provider-cost.component.html',
    styleUrls: ['./service-provider-cost.component.css']
})

export class ServiceProviderCostComponent implements OnInit, AfterViewInit {

    @Input() providerData: any;
    searchFilter: any = {};
    pricelistIds = [];
    serviceProviderStatus: any;
    vendorPriceList: any = [];
    noPriceListVendors = [];
    private relationObj: any;
    private selectedPricelistIds: any;
    noRecords = false;
    /*Boot-Datatable params */
    isPaginationControls = ['First', 'Previous', 'Next', 'Last']
    tableData = [];
    loadingIndicator = false;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 200;
    orderBy = 'CreatedDate  DESC';
    errorMessage = 'Loading...';
    filterObj = {};
    filteredItems: any;
    columns = [];
    allColumns = [];

    constructor(
        private _filterServiceApi: FilterServiceApi,
        private _sharedservice: SharedService,
        private _priceListItemAPI: PricelistItemApi,
        private _uniquePipe: UniquePipe,
        private _preloaderService: PreloaderService,
        private _el: ElementRef
    ) {
        this.searchFilter = {
            talentType: '',
            sla: '',
            coverageHour: '',
            serviceProvider: '',
            serviceEngTechLevel: '',
            countryid: '',
            countryddl: [],
            talentTypes: [],
            serviceProviders: []
        };
    }

    ngOnInit() {
        this.makeColumns();
        this.loadDDList();
        this.setPriceListIds();
    }

    makeColumns() {
        this.columns = [
            { prop: 'Region__c', name: 'Region', visible: true, width: 120 },
            { prop: 'GEO_Country__c', name: 'Country', visible: true, width: 120 },
            { prop: 'Service_Provider', name: 'Service Provider', visible: true, width: 300 },
            { prop: 'Product_ID__c', name: 'Product Id', visible: true, width: 120 },
            { prop: 'Product_Name', name: 'Product Name', visible: true, width: 250 },
            { prop: 'Talent_Type_Name__c', name: 'Talent Type', visible: true, width: 250 },
            { prop: 'Service_Technical_Level__c', name: 'Technical Level', visible: true, width: 150 },
            { prop: 'SLA__c', name: 'SLA Priority', visible: true, width: 120 },
            { prop: 'Coverage_Hours__c', name: 'Coverage Hours', visible: true, width: 150 },
            { prop: 'PPE_1HR_Standard_Price__c', name: 'PPE - 1HR', visible: true, width: 120, type: 'decimal' },
            { prop: 'PPE_2HR_Standard_Price__c', name: 'PPE - 2HR', visible: true, width: 120, type: 'decimal' },
            { prop: 'PPE_3HR_Standard_Price__c', name: 'PPE - 3HR', visible: true, width: 120, type: 'decimal' },
            { prop: 'PPE_4HR_Standard_Price__c', name: 'PPE - 4HR', visible: true, width: 120, type: 'decimal' },
            { prop: 'PPE_8HR_Standard_Price__c', name: 'PPE - 8HR', visible: true, width: 120, type: 'decimal' }
        ]
        this.allColumns = this.columns.slice();
    }

    loadDDList() {
        this._filterServiceApi.getAllFiltersData({ models: ['Country', 'TalentType'] }).subscribe(
            data => {
                if (data) {
                    data = data.data;
                    this.searchFilter.countryddl = data.countries.list;
                    this.searchFilter.talentTypes = data.talentTypes.list;
                } else {
                    this.searchFilter.countryddl = [];
                    this.searchFilter.talentTypes = [];
                }
            },
            err => {
                console.log('Error fetching countries>>', err.message);
            }
        );
    }

    setPriceListIds() {
        this.providerData = this._uniquePipe.transform(this.providerData, 'account', 'Name');
        this.providerData.forEach((element) => {
            if (element['account']) {
                this.searchFilter.serviceProviders.push({
                    sfdcId: element['account']['sfdcId'],
                    Name: element['account']['Name']
                });
                if (!element['account']['pricelist']) {
                    this.noPriceListVendors.push(element);
                } else {
                    if (this.pricelistIds.indexOf(element.account.pricelist.sfdcId) === -1) {
                        this.pricelistIds.push(element.account.pricelist.sfdcId);
                    }
                }
            }
        });
        this.serviceProviderStatus = (this.noPriceListVendors.length > 0) ? 'Missing' : 'OK';
        this.selectedPricelistIds = this.pricelistIds;
        this.findPriceListItem(0);
    }

    findPriceListItem(offset: number) {
        this._preloaderService.showPreloader();
        this.loadingIndicator = true;
        this.vendorPriceList = [];
        if (this.selectedPricelistIds.length > 0) {
            this._priceListItemAPI.getServiceProviderPriceList({
                where: { Pricebook2Id: { inq: this.selectedPricelistIds } },
                limit: this.itemsPerBatch,
                skip: offset,
                include: ['Product'],
                ProductFilter: this.relationObj
            }).subscribe(
                data => {
                    this.vendorPriceList = this.mergeVendorPriceListItem(data, this.providerData);
                    if (!this.isLoadMore) {
                        this.tableData = this.vendorPriceList;
                    } else {
                        this.vendorPriceList.forEach(c => {
                            this.tableData.push(c);
                        });
                    }
                    this.tableData = [...this.tableData];
                    this.noRecords = (data.length < this.itemsPerBatch) ? true : false;
                    this.errorMessage = (this.tableData.length > 0) ? '' : 'No record found';
                    this.loadingIndicator = false;
                    this._preloaderService.hidePreloader();
                },
                error => {
                    this.errorMessage = error.message;
                    this.loadingIndicator = false;
                    this._preloaderService.hidePreloader();
                }
            );
        } else {
            this.tableData = [];
            this.loadingIndicator = false;
            this.errorMessage = 'No record found';
            this._preloaderService.hidePreloader();
        }
    }

    prepareData(data) {
        const processedData = [];
        let obj = {};
        let productObj = {};
        if (Array.isArray(data)) {
            data.forEach((item) => {
                productObj = item.Product ? item.Product : '';
                obj = {
                    'Region__c': item.metrovendor.GeoMetro.Region__c ? item.metrovendor.GeoMetro.Region__c : '',
                    'GEO_Country__c': productObj ? productObj['GEO_Country__c'] : '',
                    'Service_Provider': item.Service_Provider ? item.Service_Provider : '',
                    'Product_ID__c': productObj ? productObj['Product_ID__c'] : '',
                    'Product_Name': productObj ? productObj['Name'] : '',
                    'Talent_Type_Name__c': productObj ? productObj['Talent_Type_Name__c'] : '',
                    'Service_Technical_Level__c': productObj ? productObj['Service_Technical_Level__c'] : '',
                    'SLA__c': productObj ? productObj['SLA__c'] : '',
                    'Coverage_Hours__c': productObj ? productObj['Coverage_Hours__c'] : '',
                    'PPE_1HR_Standard_Price__c': item.PPE_1HR_Standard_Price__c ? item.PPE_1HR_Standard_Price__c.toFixed(2) : '0.00',
                    'PPE_2HR_Standard_Price__c': item.PPE_2HR_Standard_Price__c ? item.PPE_2HR_Standard_Price__c.toFixed(2) : '0.00',
                    'PPE_3HR_Standard_Price__c': item.PPE_3HR_Standard_Price__c ? item.PPE_3HR_Standard_Price__c.toFixed(2) : '0.00',
                    'PPE_4HR_Standard_Price__c': item.PPE_4HR_Standard_Price__c ? item.PPE_4HR_Standard_Price__c.toFixed(2) : '0.00',
                    'PPE_8HR_Standard_Price__c': item.PPE_8HR_Standard_Price__c ? item.PPE_8HR_Standard_Price__c.toFixed(2) : '0.00',
                };
                processedData.push(obj);
            });
        }
        return processedData;
    }

    mergeVendorPriceListItem(data, providerData) {
        const mapPricelist = [];
        data.map(item => {
            for (let i = 0; i < providerData.length; i++) {
                if (providerData[i]['account'] && providerData[i]['account']['pricelist']) {
                    if (item.Pricebook2Id === providerData[i].account.pricelist.sfdcId) {
                        item['metrovendor'] = providerData[i];
                        item['Service_Provider'] = (providerData[i].account.Name ? providerData[i].account.Name : '') + ' '
                            + (providerData[i].account.ShippingStreet ? providerData[i].account.ShippingStreet : '') + ' '
                            + (providerData[i].account.ShippingCity ? providerData[i].account.ShippingCity : '') + ''
                            + (providerData[i].account.ShippingState ? providerData[i].account.ShippingState : '') + ''
                            + (providerData[i].account.ShippingCountry ? providerData[i].account.ShippingCountry : '');
                        mapPricelist.push(item)
                        break;
                    }
                }
            }
        });
        return this.prepareData(mapPricelist);
    }

    filterServiceProviders() {
        this.relationObj = {};
        this.selectedPricelistIds = this.pricelistIds;
        if (this.searchFilter.talentType !== '') {
            this.relationObj['Talent_Type__c'] = this.searchFilter.talentType;
        }
        if (this.searchFilter.serviceEngTechLevel !== '') {
            this.relationObj['Service_Technical_Level__c'] = this.searchFilter.serviceEngTechLevel;
        }
        if (this.searchFilter.coverageHour !== '') {
            this.relationObj['Coverage_Hours__c'] = this.searchFilter.coverageHour;
        }
        if (this.searchFilter.sla !== '') {
            this.relationObj['SLA__c'] = this.searchFilter.sla;
        }
        if (this.searchFilter.countryid !== '') {
            this.relationObj['GEO_Country__c'] = this.searchFilter.countryid;
        }
        if (this.searchFilter.serviceProvider !== '') {
            this.selectedPricelistIds = [];
            this.providerData.forEach((element, index) => {
                if (element['account'] && element['account']['sfdcId'] === this.searchFilter.serviceProvider) {
                    if (element['account']['pricelist']) {
                        if (this.selectedPricelistIds.indexOf(element.account.pricelist.sfdcId) === -1) {
                            this.selectedPricelistIds.push(element.account.pricelist.sfdcId);
                        }
                    }
                }
            });
        }
        this.isLoadMore = false;
        this.findPriceListItem(0);
    }

    resetSearchFilter() {
        if (
            this.searchFilter.talentType !== '' ||
            this.searchFilter.serviceEngTechLevel !== '' ||
            this.searchFilter.coverageHour !== '' ||
            this.searchFilter.sla !== '' ||
            this.searchFilter.serviceProvider !== '' ||
            this.searchFilter.countryid !== ''
        ) {
            this.relationObj = {}
            this.selectedPricelistIds = this.pricelistIds;
            this.findPriceListItem(0);
        }

        this.searchFilter.talentType = '';
        this.searchFilter.serviceEngTechLevel = '';
        this.searchFilter.coverageHour = '';
        this.searchFilter.sla = '';
        this.searchFilter.serviceProvider = '';
        this.searchFilter.countryid = '';
    }

    /*Data Table funcation start here*/
    ngAfterViewInit() {
        const elHeader = this._el.nativeElement.querySelector('.datatable-header')
        const elBody = this._el.nativeElement.querySelector('datatable-body');
        elHeader.onscroll = () => {
            elBody.scrollLeft = elHeader.scrollLeft
        }
        elBody.onscroll = () => {
            elHeader.scrollLeft = elBody.scrollLeft
        }
    }

    toggle(col) {
        col.visible = !col.visible;
    }

    loadMoreRecords() {
        this.isLoadMore = true;
        this.findPriceListItem(this.tableData.length);
    }

    exportCSV() {
        this._sharedservice.exportNgxData(this.tableData, this.columns, 'ServiceProviderCost');
    }

}
