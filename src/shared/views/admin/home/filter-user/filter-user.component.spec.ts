/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FilterUserComponent } from './filter-user.component';

describe('FilterUserComponent', () => {
    let component: FilterUserComponent;
    let fixture: ComponentFixture<FilterUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FilterUserComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilterUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
