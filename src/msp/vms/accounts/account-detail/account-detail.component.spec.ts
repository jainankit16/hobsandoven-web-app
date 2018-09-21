import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AccountDetailComponent } from './account-detail.component';
import { DataTableModule } from '@serviceo/ng-datatable';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountApi } from '../../sdk/services/custom/Account';
import { PreloaderService } from '../../services/preloader.service';
import { DataTable, DataTableResource } from '@serviceo/ng-datatable';


describe('AccountDetailComponent', () => {
    let comp: AccountDetailComponent;
    let fixture: ComponentFixture<AccountDetailComponent>;
    let de: DebugElement;
    let projectApi: any;
    let el: HTMLElement;
    const fakesfdcId = 'a2y1a000005K0ldAAC';
    // let fakeworker ;
    const faketitle = 'Worker details page'
    const fakeerrorMessage = 'error';

    const faketableData = {
        'sfdcId': '0011a00000o9FKrAAM',
        'AccountSource': null,
        'Business_Size_c__c': 'Not Known',
        'Company_Reference_code__c': null,
        'CreatedDate': '2018-01-31T22:52:34.000Z',
        'CurrencyIsoCode': 'USD',
        'IsPartner': false,
        'LastModifiedDate': '2018-01-31T22:55:19.000Z',
        'Name': 'Help for Heroes (14 Parkers Cl)',
        'OwnerId': '0051a000000gHAFAA2',
        'Service_Global_Ref__c': 'SG026516',
        'Vendor_Type__c': null
    }
    // For async
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AccountDetailComponent],
            imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule,
                HttpModule, DataTableModule, RouterModule, RouterTestingModule],
            providers: [{ provide: AccountApi, useValue: faketableData }, PreloaderService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });
    // For sync
    beforeEach(() => {
        fixture = TestBed.createComponent(AccountDetailComponent);
        comp = fixture.componentInstance;
        projectApi = TestBed.get(AccountApi);
    });

    // afterEach((done) => {
    //     fixture.componentInstance.ngOnDestroy();
    //     done();
    // });

    it('should instantiate AccountDetailComponent', () => {
        expect(fixture.componentInstance instanceof AccountDetailComponent).toBe(true, 'should create AccountDetailComponent');
    });

    it('should test acctually title of AccountDetailComponent', () => {
        expect(comp.title).not.toBeNull('test not to null  AccountDetail title');
        expect(comp.title).not.toBe('', 'test not to be  AccountDetail title');
    });

    it('should test fake title of AccountDetailComponent', () => {
        comp.title = faketitle;
        expect(comp.title).toBe(faketitle, 'fake test AccountDetail title');
    });

    it('should have `worker` of AccountDetailComponent', () => {
        expect(comp.account).toBeUndefined('to be undefined AccountDetail');
    })

    it('should have assign fake data in `worker` of AccountDetailComponent', () => {
        comp.account = faketableData;
        expect(comp.account).toBe(faketableData, 'fake table data of AccountDetail');
    });

    it('should error message of AccountDetailComponent', () => {
        comp.errorMessage = fakeerrorMessage;
        expect(comp.errorMessage).toEqual(fakeerrorMessage, 'fake error meggage of AccountDetail');
    })
    it('should  sfdcId of AccountDetailComponent', () => {
        expect(comp.modelId).toBeUndefined('to be undefined sfdcId');
    })

    it('should fake sfdcId of AccountDetailComponent', () => {
        comp.modelId = fakesfdcId;
        expect(comp.modelId).toEqual(fakesfdcId, 'fake error meggage of AccountDetail');
    })
});
