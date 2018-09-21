import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Routes, RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';

import { JobsHomeComponent } from './jobs-home.component';

describe('JobsHomeComponent', () => {
  let component: JobsHomeComponent;
  let fixture: ComponentFixture<JobsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsHomeComponent ],
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
//    fixture = TestBed.createComponent(JobsHomeComponent);
//    component = fixture.componentInstance;
//    fixture.detectChanges();
  });

  it('test cases will be here in future', () => {
    //expect(component).toBeTruthy();
  });
});
