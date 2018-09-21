import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';
import { DashboardApi, QuoteLineManagerApi } from '../../../sdk';
import { UtilityService } from '../../../services/utility.service';

@Component({
    selector: 'quote-detail',
    templateUrl: './quote-detail.component.html',
    styleUrls: ['./quote-detail.component.css']
})

export class QuoteDetailComponent implements OnInit, AfterViewInit {

    @Input() quote: any;
    quoteDetail: any;
    tableData = [];
    loadingIndicator = false;
    itemsPerPage = 10;
    isLoadMore = false;
    itemsPerBatch = 20;
    errorMessage: any;
    isEnabled = false;
    columns: any;

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
        this.quoteDetail = {};
        this.columns = [
            { name: 'Jobsite #', prop: 'Jobsite_ID__c', width: 200 },
            {
                name: 'Service Zone',
                prop: 'GeoMetroName',
                width: 200
            },
            { name: 'Service ID', prop: 'ProductID', width: 200 },
            { name: 'Product Name', prop: 'ProductName', width: 200 },
            { name: 'Talent Type', prop: 'TalentTypeName', width: 200 },
            { name: 'PPM Hours', prop: 'Order_Quantity__c', width: 200 },
            { name: 'Vendor', prop: 'AccountName', width: 200 },
            {
                name: 'Price',
                prop: 'Price__c',
                width: 200,
                type: 'date'
            },
            {
                name: 'Vendor Cost',
                prop: 'Vendor_Cost__c',
                width: 200,
                type: 'date'
            },
            { name: 'Profit Price', prop: 'Profit_Price__c', width: 200 }
        ];

        this.quoteDetail['Name'] = this.quote['Name'];
        this.quoteDetail['SOP_Program_Name'] = this.quote['Project'] ? this.quote['Project'].Name : '';
        this.quoteDetail['Jobsite_Project_Name'] = '';
        this.quoteDetail['Partner_Name'] = this.quote['Partner'] ? this.quote['Partner'].Name : '';
        this.getQuoteDetails(0);
    }

    getQuoteDetails(offset: any) {
        const paramObj = {
            'quoteId': this.quote['sfdcId'],
            'models': ['QuoteLineManager']
        };
        this.loadingIndicator = true;
        this.isEnabled = false;
        this._dashboardApi.getAllData(paramObj).subscribe(
            data => {
                if (data && data.data) {
                    data = data.data;
                    if (!this.isLoadMore) {
                        this.tableData = data['quoteLines']['list'];
                    } else {
                        data['quoteLines']['list'].forEach(c => {
                            this.tableData.push(c);
                        });
                        this.tableData = [...this.tableData];
                        this.loadingIndicator = false;
                    }
                    this.isEnabled = true;
                    this.loadingIndicator = false;
                    this.setEmptyMessage();
                } else {
                    this.loadingIndicator = false;
                    this.isEnabled = true;
                    this.setEmptyMessage();
                }
            }, error => {
                this.errorMessage = error.message;
                this.isEnabled = true;
                console.log('Error fetching data>>', error.message);
            }
        )
    }

    rowTooltip(item) {
        return item.sfdcId;
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
