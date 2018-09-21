import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DashboardApi } from '../../../sdk/services/custom/Dashboard';
import { UtilityService } from '../../../services/utility.service';

@Component({
    selector: 'pricebook-detail',
    templateUrl: './pricebook-detail.component.html'
})

export class PricebookDetailComponent implements OnInit, AfterViewInit {

    @Input('pricebook') pricebook: any;
    private priceList = [];

    // setup for ngx-datatable
    tableData = [];
    itemsPerPage = 10;
    itemsPerBatch = 20;
    orderBy = 'createdAt Asc';
    loadingIndicator = true;
    columns: any[];
    allColumns: any[];
    @ViewChild('myTable') table: any;
    offset = 0;

    constructor(
        private _dashboardApi: DashboardApi,
        private _utilityService: UtilityService,
        private el: ElementRef
    ) { }

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

        this.columns = [
            { name: 'Talent Type', prop: 'TalentTypeName', width: 200, visible: true, sortable: true },
            { name: 'Talent Level', prop: 'TechnicalLevel', width: 100, visible: true, sortable: true },
            { name: 'Country Code', prop: 'Country', width: 100, visible: true, sortable: true },
            { name: 'SLA (Priority)', prop: 'SLA', width: 100, visible: true, sortable: true },
            { name: 'Coverage Hours', prop: 'CoverageHours', width: 100, visible: true, sortable: true },
            { name: 'Currency', prop: 'CurrencyIsoCode', width: 100, visible: true, sortable: true },
            { name: 'PPE-1HR', prop: 'PPE_1HR_Standard_Price__c', width: 100, visible: true, sortable: true },
            { name: 'PPE-2HR', prop: 'PPE_2HR_Standard_Price__c', width: 100, visible: true, sortable: true },
            { name: 'PPE-3HR', prop: 'PPE_3HR_Standard_Price__c', width: 100, visible: true, sortable: true },
            { name: 'PPE-4HR', prop: 'PPE_4HR_Standard_Price__c', width: 100, visible: true, sortable: true },
            { name: 'PPE-8HR', prop: 'PPE_8HR_Standard_Price__c', width: 100, visible: true, sortable: true },
            { name: 'Additional Hours T&M', prop: 'Additional_Hours_T_M_Standard_Price__c', width: 100, visible: true, sortable: true },
            { name: 'Active Or Status', prop: 'IsActive', width: 100, visible: true, sortable: true },
            { name: 'Created On', prop: 'createdAt', width: 100, visible: true, sortable: true }

        ];
        this.allColumns = this.columns.slice(); // Used for Columns Toggling
        if (this.pricebook && this.pricebook['sfdcId'] && this.pricebook['sfdcId'] !== '') {
            this.priceList = this.pricebook['PricelistItems'];
            this.setPagination();
        } else {
            if (this.pricebook && this.pricebook !== '') {
                this.getPricelistItems(this.pricebook);
            }
        }
    }

    setPagination() {
        this.priceList = this.modifyData(this.priceList);
        this.tableData = (this.priceList) ? this.priceList : [];
        this.loadingIndicator = false;
        this.setEmptyMessage();
    }

    getPricelistItems(priceBookId) {
        this.loadingIndicator = true;
        this.priceList = [];
        const paramObj = {
            'pricelistId': priceBookId,
            'models': ['Pricelist']
        };
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                this.loadingIndicator = false;
                if (data.data) {
                    data = data.data;
                    if (data['pricelists'] && data['pricelists']['list']) {
                        this.priceList = data['pricelists']['list'][0]['PricelistItems'];
                        this.setPagination();
                    }
                }
            },
            error => {
                console.log('Error fetching data>>', error.message);
                this.loadingIndicator = false;
            }
        );
    }

    modifyData(data) {
        if (data.length) {
            data.forEach((item, index) => {
                if (item['Product']) {
                    item['TalentTypeName'] = (item['Product']['TalentType']) ? item['Product']['TalentType']['Name'] : '';
                    item['TechnicalLevel'] = item['Product']['Service_Technical_Level__c'];
                    item['Country'] = (item['Product']['countryCode']) ? item['Product']['countryCode']['Country__c'] : '';
                    item['SLA'] = item['Product']['SLA__c'];
                    item['CoverageHours'] = item['Product']['Coverage_Hours__c'];
                    item['IsActive'] = (item['IsActive']) ? 'Yes' : 'No';
                    item['createdAt'] = this._utilityService.dateFormate(item['createdAt']);
                    delete item['Product'];
                }
            });
        }
        return data;
    }

    toggle(col) {
        col.visible = !col.visible;
    }

    setEmptyMessage() {
        const msg = 'No data to display.';
        if (!this.tableData.length) {
            this.tableData = [{
                'message': msg
            }];
            this.tableData[0][this.columns[0]['prop']] = msg;
        }
    }
}
