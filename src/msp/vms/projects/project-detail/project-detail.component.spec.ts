import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProjectDetailComponent } from './project-detail.component';
import { DataTableModule } from '@serviceo/ng-datatable';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectApi } from '../../../../sdk/services/custom/Project';
import { PreloaderService } from '../../../../services/preloader.service';
import { DataTable, DataTableResource } from '@serviceo/ng-datatable';


describe('ProjectDetailComponent', () => {
    let comp: ProjectDetailComponent;
    let fixture: ComponentFixture<ProjectDetailComponent>;
    let de: DebugElement;
    let projectApi: any;
    let el: HTMLElement;
    const fakesfdcId = 'a2y1a000005K0ldAAC';
    // let fakeworker ;
    const faketitle = 'Worker details page'
    const fakeerrorMessage = 'error';

    const faketableData = {
        'sfdcId': 'a1x1a000001i01BAAQ',
        'APVP_Group_Number__c': 'A1',
        'APVP_Record_Count__c': '0.0',
        'Account__c': '0011a00000bGvDbAAK',
        'Customer_Service_Type__c': 'Desk-side Support',
        'Deadline__c': '2017-10-12T11:35:15.000Z',
        'Description__c': '.',
        'Duration__c': 1,
        'Field_Service_Program_Type__c': 'Dispatch FE',
        'Jobsite_Contact_Email_Service_Desk__c': 'dispatch3ps-vendor@serviceglobal.com',
        'Jobsite_Contact_Email_Technical_Esc__c': 'dispatch3ps-vendor@serviceglobal.com',
        'Jobsite_Contact_Name_Service_Desk__c': 'IRON Help Desk',
        'Jobsite_Contact_Name_Technical_Esc__c': 'IRON Help Desk',
        'Jobsite_Contact_Phone_Service_Desk__c': '0014089400940',
        'Jobsite_Contact_Phone_Technical_Esc__c': '0014089400940',
        'Jobsite_Contact_Selection__c': '(a) Use IRON Technical Escalation',
        'Kick_off__c': '2017-10-12T11:35:15.000Z',
        'Name': 'Yonezawa-shi (992-0021) - JPN -SG001705- IJS02168',
        'Partner_Name_Text__c': 'MagicLink Bank Corporation Client Demo',
        'Partner_Pricelist__c': '01s1a000002WN0UAAW',
        'Program_Activation__c': 'Yes',
        'Progress__c': '',
        'Project_Standard__c': '',
        'Project__c': 'PROJ-0631',
        'RecordTypeId': '0121a0000006QJEAA2',
        'Resource_Pool_Type_Used_for_backfill__c': 'Pool',
        'Service_Dispatch_SLA_Priority__c': 'P1 (SBD4H)',
        'Service_Technical_Level__c': 'L1',
        'SoW_Equipment_Tracking_Vendor__c': '',
        'Status__c': 'Active',
        'Vendor_Pricelist__c': '',
        'Vendor_Type__c': 'External'
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectDetailComponent],
            imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule,
                HttpModule, DataTableModule, RouterModule, RouterTestingModule],
            providers: [{ provide: ProjectApi, useValue: faketableData }, PreloaderService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectDetailComponent);
        comp = fixture.componentInstance;
        projectApi = TestBed.get(ProjectApi);
    });

    afterEach((done) => {
        fixture.componentInstance.ngOnDestroy();
        done();
    });

    it('should instantiate ProjectDetailComponent', () => {
        expect(fixture.componentInstance instanceof ProjectDetailComponent).toBe(true, 'should create ProjectDetail component');
    });

    it('should test acctually title of ProjectDetailComponent', () => {
        expect(comp.title).not.toBeNull('test not to null  ProjectDetail title');
        expect(comp.title).not.toBe('', 'test not to be  ProjectDetail title');
    });

    it('should test fake title of ProjectDetailComponent', () => {
        comp.title = faketitle;
        expect(comp.title).toBe(faketitle, 'fake test ProjectDetail title');
    });

    it('should have `worker` of ProjectDetailComponent', () => {
        expect(comp.project).toBeUndefined('to be undefined ProjectDetail');
    })

    it('should have assign fake data in `worker` of ProjectDetailComponent', () => {
        comp.project = faketableData;
        expect(comp.project).toBe(faketableData, 'fake table data of ProjectDetail');
    });

    it('should error message of ProjectDetailComponent', () => {
        comp.errorMessage = fakeerrorMessage;
        expect(comp.errorMessage).toEqual(fakeerrorMessage, 'fake error meggage of ProjectDetail');
    })
    it('should  sfdcId of ProjectDetailComponent', () => {
        expect(comp.modelId).toBeUndefined('to be undefined sfdcId');
    })

    it('should fake sfdcId of ProjectDetailComponent', () => {
        comp.modelId = fakesfdcId;
        expect(comp.modelId).toEqual(fakesfdcId, 'fake error meggage of ProjectDetail');
    })
});
