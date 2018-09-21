/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddDocumnetTitleComponent } from './add-documnet-title.component';

describe('AddDocumnetTitleComponent', () => {
    let component: AddDocumnetTitleComponent;
    let fixture: ComponentFixture<AddDocumnetTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddDocumnetTitleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddDocumnetTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
