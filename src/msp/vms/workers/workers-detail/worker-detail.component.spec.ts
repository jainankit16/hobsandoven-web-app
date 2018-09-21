import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { WorkerDetailComponent } from './worker-detail.component';
import { DataTableModule } from '@serviceo/ng-datatable';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkerApi } from '../../../../sdk/services/custom/Worker';
import { PreloaderService } from '../../../../services/preloader.service';
import { DataTable, DataTableResource } from '@serviceo/ng-datatable';


describe('WorkerDetailComponent', () => {
    let comp: WorkerDetailComponent;
    let fixture: ComponentFixture<WorkerDetailComponent>;
    let de: DebugElement;
    let workerApi: any;
    let el: HTMLElement;
    const fakesfdcId = 'a2y1a000005K0ldAAC';
    // let fakeworker ;
    const faketitle = 'Worker details page'
    const fakeerrorMessage = 'error';

    const faketableData = {
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
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [WorkerDetailComponent],
            imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule,
                HttpModule, DataTableModule, RouterModule, RouterTestingModule],
            providers: [{ provide: WorkerApi, useValue: faketableData }, PreloaderService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkerDetailComponent);
        comp = fixture.componentInstance;
        workerApi = TestBed.get(WorkerApi);
        // de = fixture.debugElement.query(By.css('h3'));
        // el = de.nativeElement;
    });

    afterEach((done) => {
        fixture.componentInstance.ngOnDestroy();
        done();
    });

    it('should instantiate WorkerDetailComponent', () => {
        expect(fixture.componentInstance instanceof WorkerDetailComponent).toBe(true, 'should create workers Details component');
    });

    it('should test acctually title of WorkerDetailComponent', () => {
        expect(comp.title).not.toBeNull('test not to null  worker title');
        expect(comp.title).not.toBe('', 'test not to be  worker title');
    });

    it('should test fake title of WorkerDetailComponent', () => {
        comp.title = faketitle;
        expect(comp.title).toBe(faketitle, 'fake test worker title');
    });

    it('should have `worker` of WorkerListComponent', () => {
        expect(comp.worker).toBeUndefined('to be undefined worker');
    })

    it('should have assign fake data in `worker` of WorkerListComponent', () => {
        comp.worker = faketableData;
        expect(comp.worker).toBe(faketableData, 'fake table data');
    });

    it('should error message of WorkerListComponent', () => {
        comp.errorMessage = fakeerrorMessage;
        expect(comp.errorMessage).toEqual(fakeerrorMessage, 'fake error meggage');
    })
    it('should  sfdcId of WorkerListComponent', () => {
        expect(comp.sfdcId).toBeUndefined('to be undefined sfdcId');
    })

    it('should fake sfdcId of WorkerListComponent', () => {
        comp.sfdcId = fakesfdcId;
        expect(comp.sfdcId).toEqual(fakesfdcId, 'fake error meggage');
    })




});
