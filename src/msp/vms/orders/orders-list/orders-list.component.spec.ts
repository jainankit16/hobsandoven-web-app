import { PurchaseOrder } from './../../sdk/models/PurchaseOrder';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OrdersListComponent } from './orders-list.component';
import { DataTableModule } from '@serviceo/ng-datatable';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PurchaseOrderApi } from '../../sdk/services/custom/PurchaseOrder';
import { PreloaderService } from '../../services/preloader.service';
import { DataTable, DataTableResource } from '@serviceo/ng-datatable';
import { ModalService } from '../../services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OrdersListComponent', () => {

    let comp: OrdersListComponent;
    let fixture: ComponentFixture<OrdersListComponent>;
    const fakeErrorMessage = 'order';
    const fakepageTitle = 'fake order title';
    const fakepageSubTitle = 'fake order SubTitle';
    const fakeerrorMessage = 'fake Loading...';
    const faketableDataCount = 0;
    const fakeitemsPerPage = 20;
    const fakeisLoadMore = true;
    const fakeitemsPerBatch = 1000;
    const fakeorderBy = 'fake Name DESC';
    const faketableData = [{
        'sfdcId': '0WO1a0000004Ks1GAE',
        'CurrencyIsoCode': 'USD',
        'Grand_Total_Total_From_Line_Items__c': 0,
        'Jobsite__c': 'a2q1a000002FlGBAA0',
        'LastModifiedDate': '2018-02-01T05:04:43.000Z',
        'List_Price_Total_from_Line_Items__c': 0,
        'Roll_up_PPE_Hours__c': 2,
        'Roll_up_VAT_Percent__c': 0,
        'Service_Dispatch__c': 'a1B1a000002mlW3EAI',
        'Vendor__c': '0011a00000iupppAAA',
        'Work_Order_num__c': 'VSWOTS01362',
        'vendor': {
            'sfdcId': '0011a00000iupppAAA',
            'Name': 'WM: DISP-FENETW-TEC-CISC-L2'
        },
        'lineItems': []
    }, {
        'sfdcId': '0WO1a0000004KrwGAE',
        'CurrencyIsoCode': 'USD',
        'Grand_Total_Total_From_Line_Items__c': 159,
        'Jobsite__c': 'a2q1a00000067cqAAA',
        'LastModifiedDate': '2018-01-31T20:38:15.000Z',
        'List_Price_Total_from_Line_Items__c': 153,
        'Roll_up_PPE_Hours__c': 4,
        'Roll_up_VAT_Percent__c': 19,
        'Service_Dispatch__c': 'a1B1a000002mkqCEAQ',
        'Vendor__c': '0011a00000iurTOAAY',
        'Work_Order_num__c': 'VSWOTS01361',
        'vendor': {
            'sfdcId': '0011a00000iurTOAAY',
            'Name': 'Workset oHG'
        },
        'lineItems': []
    }, {
        'sfdcId': '0WO1a0000004KrrGAE',
        'CurrencyIsoCode': 'USD',
        'Grand_Total_Total_From_Line_Items__c': 100,
        'Jobsite__c': 'a2q1a000002FUINAA4',
        'LastModifiedDate': '2018-01-31T20:16:53.000Z',
        'List_Price_Total_from_Line_Items__c': 80,
        'Roll_up_PPE_Hours__c': 4,
        'Roll_up_VAT_Percent__c': 0,
        'Service_Dispatch__c': 'a1B1a000002mko1EAA',
        'Vendor__c': '0011a00000iGlZ9AAK',
        'Work_Order_num__c': 'VSWOTS01360',
        'vendor': {
            'sfdcId': '0011a00000iGlZ9AAK',
            'Name': 'WorkMarket Pool'
        },
        'lineItems': []
    }, {
        'sfdcId': '0WO1a0000004KrmGAE',
        'CurrencyIsoCode': 'USD',
        'Grand_Total_Total_From_Line_Items__c': 100,
        'Jobsite__c': 'a2q1a000002FvakAAC',
        'LastModifiedDate': '2018-01-31T19:44:17.000Z',
        'List_Price_Total_from_Line_Items__c': 100,
        'Roll_up_PPE_Hours__c': 2,
        'Roll_up_VAT_Percent__c': 0,
        'Service_Dispatch__c': 'a1B1a000002mkknEAA',
        'Vendor__c': '0011a00000iupppAAA',
        'Work_Order_num__c': 'VSWOTS01359',
        'vendor': {
            'sfdcId': '0011a00000iupppAAA',
            'Name': 'WM: DISP-FENETW-TEC-CISC-L2'
        },
        'lineItems': []
    }, {
        'sfdcId': '0WO1a0000004KrhGAE',
        'CurrencyIsoCode': 'USD',
        'Grand_Total_Total_From_Line_Items__c': 85,
        'Jobsite__c': 'a2q1a00000067cqAAA',
        'LastModifiedDate': '2018-01-31T18:55:20.000Z',
        'List_Price_Total_from_Line_Items__c': 103,
        'Roll_up_PPE_Hours__c': 6,
        'Roll_up_VAT_Percent__c': 19,
        'Service_Dispatch__c': 'a1B1a000002mkb7EAA',
        'Vendor__c': '0011a00000iurTOAAY',
        'Work_Order_num__c': 'VSWOTS01358',
        'vendor': {
            'sfdcId': '0011a00000iurTOAAY',
            'Name': 'Workset oHG'
        },
        'lineItems': []
    }, {
        'sfdcId': '0WO1a0000004KrcGAE',
        'CurrencyIsoCode': 'USD',
        'Grand_Total_Total_From_Line_Items__c': 100,
        'Jobsite__c': 'a2q1a0000005pOCAAY',
        'LastModifiedDate': '2018-01-31T16:30:58.000Z',
        'List_Price_Total_from_Line_Items__c': 80,
        'Roll_up_PPE_Hours__c': 4,
        'Roll_up_VAT_Percent__c': 0,
        'Service_Dispatch__c': 'a1B1a000002mk2pEAA',
        'Vendor__c': '0011a00000iGlZ9AAK',
        'Work_Order_num__c': 'VSWOTS01357',
        'vendor': {
            'sfdcId': '0011a00000iGlZ9AAK',
            'Name': 'WorkMarket Pool'
        },
        'lineItems': []
    }, {
        'sfdcId': '0WO1a0000004KrXGAU',
        'CurrencyIsoCode': 'USD',
        'Grand_Total_Total_From_Line_Items__c': 56,
        'Jobsite__c': 'a2q1a000002Fq20AAC',
        'LastModifiedDate': '2018-01-31T12:19:55.000Z',
        'List_Price_Total_from_Line_Items__c': 60,
        'Roll_up_PPE_Hours__c': 2,
        'Roll_up_VAT_Percent__c': 0,
        'Service_Dispatch__c': 'a1B1a000002mjswEAA',
        'Vendor__c': '0011a00000l4NPSAA2',
        'Work_Order_num__c': 'VSWOTS01356',
        'vendor': {
            'sfdcId': '0011a00000l4NPSAA2',
            'Name': 'Decunify - Soluções de Comunicações, SA'
        },
        'lineItems': []
    }, {
        'sfdcId': '0WO1a0000004KrSGAU',
        'CurrencyIsoCode': 'USD',
        'Grand_Total_Total_From_Line_Items__c': 379,
        'Jobsite__c': 'a2q1a000002FU4pAAG',
        'LastModifiedDate': '2018-01-31T10:16:01.000Z',
        'List_Price_Total_from_Line_Items__c': 101,
        'Roll_up_PPE_Hours__c': 2,
        'Roll_up_VAT_Percent__c': 0,
        'Service_Dispatch__c': 'a1B1a000002mjsmEAA',
        'Vendor__c': '0011a00000X9fsxAAB',
        'Work_Order_num__c': 'VSWOTS01355',
        'vendor': {
            'sfdcId': '0011a00000X9fsxAAB',
            'Name': 'Iron Systems (Vendor & Vendor Sites)-Test'
        },
        'lineItems': []
    }]
    // For async
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OrdersListComponent],
            imports: [DataTableModule, RouterModule, RouterTestingModule, NgbModule.forRoot()],
            providers: [{ provide: PurchaseOrderApi, useValue: faketableData }, PreloaderService, ModalService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });
    // For sync
    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersListComponent);
        comp = fixture.componentInstance;
        this.PricelistApi = TestBed.get(PurchaseOrderApi);
    });

    function getFakeProjectsList(offset: number) {
        const filterData = faketableData.slice(offset, comp.itemsPerBatch);
        if (!comp.isLoadMore) {
            comp.tableData = filterData;
            comp.tableResource = new DataTableResource(filterData);
            comp.errorMessage = comp.tableData.length > 0 ? '' : 'order not available.';
        } else {
            comp.tableResource.add(filterData);
        }
        comp.tableResource.count().then(count => (comp.tableDataCount = count));
        return filterData;
    }

    it('should instantiate OrdersListComponent', () => {
        expect(fixture.componentInstance instanceof OrdersListComponent).toBe(true, 'should create OrdersListComponent');
    });

    it('should test fake title of OrdersListComponent', () => {
        comp.pageTitle = fakepageTitle;
        comp.pageSubTitle = fakepageSubTitle;
        expect(comp.pageTitle).toBe(fakepageTitle, 'fake test order title');
        expect(comp.pageSubTitle).toBe(fakepageSubTitle, 'fake test order Sub title');
    });

    it('should have assign data in `tableData` of OrdersListComponent', () => {
        comp.tableData = faketableData;
        expect(comp.tableData).toBe(faketableData, 'fake table data');
    });

    it('should error message of OrdersListComponent', () => {
        comp.errorMessage = fakeErrorMessage;
        expect(comp.errorMessage).toEqual(fakeErrorMessage, 'fake error meggage');
    })

    it('should test variable of OrdersListComponent', () => {
        comp.tableDataCount = faketableDataCount;
        comp.itemsPerPage = fakeitemsPerPage;
        comp.isLoadMore = fakeisLoadMore;
        comp.itemsPerBatch = fakeitemsPerBatch;
        comp.orderBy = fakeorderBy;
        expect(comp.tableDataCount).toBeDefined('test table data count');
        expect(comp.itemsPerPage).toBeDefined('test item per page');
        expect(comp.isLoadMore).toBeDefined('test is load more');
        expect(comp.itemsPerBatch).toBeDefined('test item per batch');
        expect(comp.orderBy).toBeDefined('test order by');
        expect(comp.tableDataCount).not.toBeNull('test not table data count');
        expect(comp.itemsPerPage).not.toBeNull('test not items per page');
        expect(comp.isLoadMore).not.toBeNull('test not is load more');
        expect(comp.itemsPerBatch).not.toBeNull('test not items per batch');
        expect(comp.orderBy).not.toBeNull('test not order by');
    })

    it('should test fake variable of OrdersListComponent', () => {
        comp.tableDataCount = faketableDataCount;
        comp.itemsPerPage = fakeitemsPerPage;
        comp.isLoadMore = fakeisLoadMore;
        comp.itemsPerBatch = fakeitemsPerBatch;
        comp.orderBy = fakeorderBy;
        expect(comp.tableDataCount).toBe(faketableDataCount, 'fake test tableDataCount');
        expect(comp.itemsPerPage).toBe(fakeitemsPerPage, 'fake test itemsPerPage');
        expect(comp.isLoadMore).toBe(fakeisLoadMore, 'fake test isLoadMore');
        expect(comp.itemsPerBatch).toBe(fakeitemsPerBatch, 'fake test itemsPerBatch');
        expect(comp.orderBy).toBe(fakeorderBy, 'fake test orderBy');
    })
    it('should have call `getFakeOrderList` of OrdersListComponent', () => {
        comp.itemsPerBatch = 2;
        const filteredData = getFakeProjectsList(0);
        expect(comp.tableData).toBeDefined('test to be defined data table');
        expect(comp.tableData).not.toBeNull('test not to be null data table');
        expect(comp.tableData).toBe(filteredData, 'fake  getFakeOrderList call');
        expect(comp.tableData.length).toEqual(comp.itemsPerBatch, 'test to equal filtered data lenght or table data count')
    });
});
