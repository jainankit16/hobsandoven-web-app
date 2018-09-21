/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListDocumentTitleComponent } from './list-document-title.component';

describe('ListDocumentTitleComponent', () => {
    let component: ListDocumentTitleComponent;
    let fixture: ComponentFixture<ListDocumentTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListDocumentTitleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListDocumentTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
