import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { WorkerListComponent } from './worker-list.component';
import { DataTableModule } from '@serviceo/ng-datatable';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkerApi } from '../../../../sdk/services/custom/Worker';
import { PreloaderService } from '../../../../services/preloader.service';
import { DataTable, DataTableResource } from '@serviceo/ng-datatable';
import { ModalService } from '../../../../services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('WorkerListComponent', () => {

    let comp: WorkerListComponent;
    let fixture: ComponentFixture<WorkerListComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    const fakeErrorMessage = 'worker';
    const fakepageTitle = 'fake worker title';
    const fakepageSubTitle = 'fake worker SubTitle';
    const fakeerrorMessage = 'fake Loading...';
    const faketableDataCount = 0;
    const fakeitemsPerPage = 20;
    const fakeisLoadMore = true;
    const fakeitemsPerBatch = 1000;
    const fakeorderBy = 'fake Name DESC';
    const faketableData = [{
        'Name': 'Wade Knight',
        'sfdcId': 'a2y1a000005K0ldAAC',
        'Available__c': true,
        'Contact__c': '0031a00000q3RzhAAE',
        'CreatedById': '0051a000001WnEJAA0',
        'CreatedDate': '2018-01-22T13:31:56.000Z',
        'Dispatch_Worker_num__c': 'WFSE16033',
        'Primary_Worker_Skilling_Profile__c': null,
        'IsDeleted': false,
        'RecordTypeId': '0121a0000006Qj2AAE',
        'Vendorsite__c': 'a2t1a0000005XgrAAE',
        'Worker_Type__c': 'Worker - Dispatch FE (Primary)',
        'id': 567,
        'createdAt': '2018-01-22T13:31:57.610Z',
        'updatedAt': '2018-01-22T13:31:57.610Z'
    },
    {
        'Name': 'Devin Powell',
        'sfdcId': 'a2y1a000005K0lYAAS',
        'Available__c': true,
        'Contact__c': '0031a00000q3RlJAAU',
        'CreatedById': '0051a000001WnEJAA0',
        'CreatedDate': '2018-01-22T12:58:06.000Z',
        'Dispatch_Worker_num__c': 'WFSE16032',
        'Primary_Worker_Skilling_Profile__c': null,
        'IsDeleted': false,
        'RecordTypeId': '0121a0000006Qj2AAE',
        'Vendorsite__c': 'a2t1a0000005XiEAAU',
        'Worker_Type__c': 'Worker - Dispatch FE (Primary)',
        'id': 566,
        'createdAt': '2018-01-22T12:58:07.787Z',
        'updatedAt': '2018-01-22T12:58:07.793Z'
    },
    {
        'Name': 'Chad Barker',
        'sfdcId': 'a2y1a000005K0l4AAC',
        'Available__c': true,
        'Contact__c': '0031a00000q3RieAAE',
        'CreatedById': '0051a000001WnEJAA0',
        'CreatedDate': '2018-01-22T12:36:54.000Z',
        'Dispatch_Worker_num__c': 'WFSE16031',
        'Primary_Worker_Skilling_Profile__c': null,
        'IsDeleted': false,
        'RecordTypeId': '0121a0000006Qj2AAE',
        'Vendorsite__c': 'a2t1a0000005XhuAAE',
        'Worker_Type__c': 'Worker - Dispatch FE (Primary)',
        'id': 565,
        'createdAt': '2018-01-22T12:36:56.033Z',
        'updatedAt': '2018-01-22T12:36:56.037Z'
    },
    {
        'Name': 'Jules Bartow',
        'sfdcId': 'a2y1a000005K0kRAAS',
        'Available__c': true,
        'Contact__c': '0031a00000q3OiqAAE',
        'CreatedById': '0051a000002KHeOAAW',
        'CreatedDate': '2018-01-21T23:27:17.000Z',
        'Dispatch_Worker_num__c': 'WFSE16030',
        'Primary_Worker_Skilling_Profile__c': null,
        'IsDeleted': false,
        'RecordTypeId': '0121a0000006Qj2AAE',
        'Vendorsite__c': null,
        'Worker_Type__c': 'Worker - Dispatch FE (Primary)',
        'id': 564,
        'createdAt': '2018-01-21T23:27:18.420Z',
        'updatedAt': '2018-01-21T23:27:18.420Z'
    }];
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [WorkerListComponent],
            imports: [DataTableModule, RouterModule, RouterTestingModule, NgbModule.forRoot()],
            providers: [{ provide: WorkerApi, useValue: faketableData }, PreloaderService, ModalService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerListComponent);
        comp = fixture.componentInstance;
        this.WorkerApi = TestBed.get(WorkerApi);
        // fixture.detectChanges();
    });
    afterEach((done) => {
        fixture.componentInstance.ngOnDestroy();
        done();
    });

    function getFakeWorkersList(offset: number) {
        const filterData = faketableData.slice(offset, comp.itemsPerBatch);
        if (!comp.isLoadMore) {
            comp.tableData = filterData;
            comp.tableResource = new DataTableResource(filterData);
            comp.errorMessage = comp.tableData.length > 0 ? '' : 'worker not available.';
        } else {
            comp.tableResource.add(filterData);
        }
        comp.tableResource.count().then(count => (comp.tableDataCount = count));
        return filterData;
    }

    it('should instantiate WorkerListComponent', () => {
        expect(fixture.componentInstance instanceof WorkerListComponent).toBe(true, 'should create workers List component');
    });

    it('should test acctually title of WorkerDetailComponent', () => {
        expect(comp.pageTitle).not.toBeNull('test not to null  worker title');
        expect(comp.pageTitle).not.toBe('', 'test not to be  worker title');
        expect(comp.pageSubTitle).not.toBeNull('test not to null  worker sub title');
        expect(comp.pageSubTitle).not.toBe('', 'test not to be  worker sub title');
    });

    it('should test fake title of WorkerListComponent', () => {
        comp.pageTitle = fakepageTitle;
        comp.pageSubTitle = fakepageSubTitle;
        expect(comp.pageTitle).toBe(fakepageTitle, 'fake test worker title');
        expect(comp.pageSubTitle).toBe(fakepageSubTitle, 'fake test worker Sub title');
    });

    it('should have assign data in `tableData` of WorkerListComponent', () => {
        comp.tableData = faketableData;
        expect(comp.tableData).toBe(faketableData, 'fake table data');
    });

    it('should error message of WorkerListComponent', () => {
        comp.errorMessage = fakeErrorMessage;
        expect(comp.errorMessage).toEqual(fakeErrorMessage, 'fake error meggage');
    })

    it('should test variable of WorkerListComponent', () => {
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

    it('should test fake variable of WorkerListComponent', () => {
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

    it('should have call `getFakeWorkerList` of WorkerListComponent', () => {
        comp.itemsPerBatch = 2;
        const filteredData = getFakeWorkersList(0);
        expect(comp.tableData).toBeDefined('test to be defined data table');
        expect(comp.tableData).not.toBeNull('test not to be null data table');
        expect(comp.tableData).toBe(filteredData, 'fake  getFakeWorkerList call');
        expect(comp.tableData.length).toEqual(comp.itemsPerBatch, 'test to equal filtered data lenght or table data count')
    });
});
