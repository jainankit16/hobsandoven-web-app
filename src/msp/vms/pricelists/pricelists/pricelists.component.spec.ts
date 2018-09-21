import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PriceListComponent } from './pricelists.component';
import { DataTableModule } from '@serviceo/ng-datatable';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PricelistApi } from '../../sdk/services/custom/Pricelist';
import { PreloaderService } from '../../services/preloader.service';
import { DataTable, DataTableResource } from '@serviceo/ng-datatable';
import { ModalService } from '../../services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PriceListComponent', () => {

    let comp: PriceListComponent;
    let fixture: ComponentFixture<PriceListComponent>;
    const fakeErrorMessage = 'project';
    const fakepageTitle = 'fake poject title';
    const fakepageSubTitle = 'fake poject SubTitle';
    const fakeerrorMessage = 'fake Loading...';
    const faketableDataCount = 0;
    const fakeitemsPerPage = 20;
    const fakeisLoadMore = true;
    const fakeitemsPerBatch = 1000;
    const fakeorderBy = 'fake Name DESC';
    const faketableData = [{
        'sfdcId': '01s1a000002aSGcAAM',
        'CreatedDate': '2017-09-25T20:49:08.000Z',
        'IsActive': true,
        'CreatedBy': null,
        'Description': 'Planetworks K. K. Vendor Pricelist',
        'IsStandard': false,
        'LastModifiedBy': null,
        'Name': 'Planetworks K. K. Vendor Pricelist',
        'Type__c': 'Vendor',
        'Product2Id': null,
        'id': 45,
        'createdAt': null,
        'updatedAt': null
    }, {
        'sfdcId': '01s1a000002aSF5AAM',
        'CreatedDate': '2017-09-22T18:40:38.000Z',
        'IsActive': true,
        'CreatedBy': null,
        'Description': 'ENOVA L.L.C. (Istanbul IT Services) Vendor Pricebook',
        'IsStandard': false,
        'LastModifiedBy': null,
        'Name': 'ENOVA L.L.C. (Istanbul IT Services) Vendor Pricebook',
        'Type__c': 'Vendor',
        'Product2Id': null,
        'id': 1,
        'createdAt': null,
        'updatedAt': null
    }, {
        'sfdcId': '01s1a000002aSCVAA2',
        'CreatedDate': '2017-09-19T16:33:32.000Z',
        'IsActive': true,
        'CreatedBy': null,
        'Description': 'mPhasis One Time Activity Customer Pricelist',
        'IsStandard': false,
        'LastModifiedBy': null,
        'Name': 'mPhasis One Time Activity Customer Pricelist',
        'Type__c': 'Customer',
        'Product2Id': null,
        'id': 30,
        'createdAt': null,
        'updatedAt': null
    }]
    // For async
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PriceListComponent],
            imports: [DataTableModule, RouterModule, RouterTestingModule, NgbModule.forRoot()],
            providers: [{ provide: PricelistApi, useValue: faketableData }, PreloaderService, ModalService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PriceListComponent);
        comp = fixture.componentInstance;
        this.PricelistApi = TestBed.get(PricelistApi);
        // de = fixture.debugElement.query(By.css('h3'));
        // el = de.nativeElement;
        // fixture.detectChanges();
    });
    afterEach((done) => {
        fixture.componentInstance.ngOnDestroy();
        done();
    });

    function getFakeProjectsList(offset: number) {
        const filterData = faketableData.slice(offset, comp.itemsPerBatch);
        if (!comp.isLoadMore) {
            comp.tableData = filterData;
            comp.tableResource = new DataTableResource(filterData);
            comp.errorMessage = comp.tableData.length > 0 ? '' : 'Project not available.';
        } else {
            comp.tableResource.add(filterData);
        }
        comp.tableResource.count().then(count => (comp.tableDataCount = count));
        return filterData;
    }

    it('should instantiate ProjectsListComponent', () => {
        expect(fixture.componentInstance instanceof PriceListComponent).toBe(true, 'should create Projects List component');
    });

    it('should test fake title of ProjectListComponent', () => {
        comp.pageTitle = fakepageTitle;
        comp.pageSubTitle = fakepageSubTitle;
        expect(comp.pageTitle).toBe(fakepageTitle, 'fake test project title');
        expect(comp.pageSubTitle).toBe(fakepageSubTitle, 'fake test project Sub title');
    });

    it('should have assign data in `tableData` of ProjectListComponent', () => {
        comp.tableData = faketableData;
        expect(comp.tableData).toBe(faketableData, 'fake table data');
    });

    it('should error message of ProjectListComponent', () => {
        comp.errorMessage = fakeErrorMessage;
        expect(comp.errorMessage).toEqual(fakeErrorMessage, 'fake error meggage');
    })

    it('should test variable of ProjectListComponent', () => {
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

    it('should test fake variable of ProjectListComponent', () => {
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
    it('should have call `getFakeProjectsList` of ProjectListComponent', () => {
        comp.itemsPerBatch = 2;
        const filteredData = getFakeProjectsList(0);
        expect(comp.tableData).toBeDefined('test to be defined data table');
        expect(comp.tableData).not.toBeNull('test not to be null data table');
        expect(comp.tableData).toBe(filteredData, 'fake  getFakeProjectsList call');
        expect(comp.tableData.length).toEqual(comp.itemsPerBatch, 'test to equal filtered data lenght or table data count')
    });
});
