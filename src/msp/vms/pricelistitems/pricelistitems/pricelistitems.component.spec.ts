import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PriceListItemComponent } from './pricelistitems.component';

describe('PriceListItemComponent', () => {
    let component: PriceListItemComponent;
    let fixture: ComponentFixture<PriceListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PriceListItemComponent],
            imports: [
                RouterModule,
                BrowserModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        //        fixture = TestBed.createComponent(OrdersListComponent);
        //        component = fixture.componentInstance;
        //        fixture.detectChanges();
    });

    it('test cases will be here in future', () => {
        //expect(component).toBeTruthy();
    });
});
