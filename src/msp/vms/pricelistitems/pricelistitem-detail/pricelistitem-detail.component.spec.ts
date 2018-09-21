import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { PriceListItemDetailComponent } from './pricelistitem-detail.component';

describe('PriceListItemDetailComponent', () => {
    let component: PriceListItemDetailComponent;
    let fixture: ComponentFixture<PriceListItemDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PriceListItemDetailComponent],
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
        //        fixture = TestBed.createComponent(OrderDetailComponent);
        //        component = fixture.componentInstance;
        //        fixture.detectChanges();
    });

    it('test cases will be here in future', () => {
        //expect(component).toBeTruthy();
    });
});
