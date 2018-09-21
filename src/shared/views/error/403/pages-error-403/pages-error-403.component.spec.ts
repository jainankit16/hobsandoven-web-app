/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagesError403Component } from './pages-error-403.component';

describe('PagesError-401Component', () => {
    let component: PagesError403Component;
    let fixture: ComponentFixture<PagesError403Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PagesError403Component]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PagesError403Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
