import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Routes, RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';

import {JobsListComponent} from './jobs-list.component';

describe('JobsListComponent', () => {
    let component: JobsListComponent;
    let fixture: ComponentFixture<JobsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JobsListComponent],
            imports: [
                RouterModule,
                CommonModule,
                BrowserModule,
                NgbModule.forRoot(),
                FormsModule,
                ReactiveFormsModule,
                HttpModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
//        fixture = TestBed.createComponent(JobsListComponent);
//        component = fixture.componentInstance;
//        fixture.detectChanges();
    });

    it('test cases will be here in future', () => {
        //expect(component).toBeTruthy();
    });
});
