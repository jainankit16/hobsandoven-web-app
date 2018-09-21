import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PriceListItemHomeComponent } from './pricelistitem-home.component';

describe('PriceListItemHomeComponent', () => {
    let component: PriceListItemHomeComponent;
    let fixture: ComponentFixture<PriceListItemHomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PriceListItemHomeComponent],
            imports: [
                RouterModule,
                BrowserModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        //        fixture = TestBed.createComponent(OrdersHomeComponent);
        //        component = fixture.componentInstance;
        //        fixture.detectChanges();
    });

    it('test cases will be here in future', () => {
        // expect(component).toBeTruthy();
    });
});
