import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Routes, RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';

import {JobDetailComponent} from './job-detail.component';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { NguiMapModule} from '@ngui/map';// Google nguimap integration

describe('JobDetailComponent', () => {
    let component: JobDetailComponent;
    let fixture: ComponentFixture<JobDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [JobDetailComponent],
            imports: [
                RouterModule,
                CommonModule,
                BrowserModule,
                NgbModule.forRoot(),
                FormsModule,
                ReactiveFormsModule,
                HttpModule,
                OwlDateTimeModule,
                NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBYkDqdqByznLoGJPimsDgRQBxi7bbKAdE'})
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
//        fixture = TestBed.createComponent(JobDetailComponent);
//        component = fixture.componentInstance;
//        fixture.detectChanges();
    });

    it('test cases will be here in future', () => {
        //expect(component).toBeTruthy();
    });
});
