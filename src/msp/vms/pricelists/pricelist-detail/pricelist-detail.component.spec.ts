import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { PriceListDetailComponent } from './pricelist-detail.component';
import { DataTableModule } from '@serviceo/ng-datatable';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PricelistApi } from '../../../../sdk/services/custom/Pricelist';
import { PreloaderService } from '../../../../services/preloader.service';
import { DataTable, DataTableResource } from '@serviceo/ng-datatable';


describe('PriceListDetailComponent', () => {
    let comp: PriceListDetailComponent;
    let fixture: ComponentFixture<PriceListDetailComponent>;
    let workerApi: any;
    const fakesfdcId = 'a2y1a000005K0ldAAC';
    const faketitle = 'Worker details page'

    const faketableData = {
        'sfdcId': '01s1a000002aS3xAAE',
        'CreatedDate': '2017-09-06T16:31:56.000Z',
        'IsActive': true,
        'CreatedBy': null,
        'Description': 'EEZEE TECHNOLOGIES PTE LTD Vendor Pricelist',
        'IsStandard': false,
        'LastModifiedBy': null,
        'Name': 'EEZEE TECHNOLOGIES PTE LTD Vendor Pricelist',
        'Type__c': 'Vendor',
        'Product2Id': null,
        'id': 6,
        'createdAt': null,
        'updatedAt': null
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PriceListDetailComponent],
            imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule,
                HttpModule, DataTableModule, RouterModule, RouterTestingModule],
            providers: [{ provide: PricelistApi, useValue: faketableData }, PreloaderService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PriceListDetailComponent);
        comp = fixture.componentInstance;
        workerApi = TestBed.get(PricelistApi);
    });

    afterEach((done) => {
        fixture.componentInstance.ngOnDestroy();
        done();
    });

    it('should instantiate PriceListDetailComponent', () => {
        expect(fixture.componentInstance instanceof PriceListDetailComponent).toBe(true, 'should create PriceList Detail component');
    });

    it('should test acctually title of PriceListDetailComponent', () => {
        expect(comp.title).not.toBeNull('test not to null  PriceListDetail title');
        expect(comp.title).not.toBe('', 'test not to be  PriceListDetail title');
    });

    it('should test fake title of PriceListDetailComponent', () => {
        comp.title = faketitle;
        expect(comp.title).toBe(faketitle, 'fake test PriceListDetail title');
    });

    it('should have `pricelist` of PriceListDetailComponent', () => {
        expect(comp.pricelist).toBeUndefined('to be undefined PriceListDetail');
    })

    it('should have assign fake data in `pricelist` of PriceListDetailComponent', () => {
        comp.pricelist = faketableData;
        expect(comp.pricelist).toBe(faketableData, 'fake table data of PriceListDetail');
    });

    it('should  sfdcId of PriceListDetailComponent', () => {
        expect(comp.modelId).toBeUndefined('to be undefined sfdcId of PriceListDetail');
    })

    it('should fake sfdcId of PriceListDetailComponent', () => {
        comp.modelId = fakesfdcId;
        expect(comp.modelId).toEqual(fakesfdcId, 'fake sfdcId of PriceListDetai');
    })
});
