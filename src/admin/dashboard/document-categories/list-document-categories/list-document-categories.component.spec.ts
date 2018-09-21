/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListDocumentCategoriesComponent } from './list-document-categories.component';

describe('ListDocumentCategoriesComponent', () => {
    let component: ListDocumentCategoriesComponent;
    let fixture: ComponentFixture<ListDocumentCategoriesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListDocumentCategoriesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListDocumentCategoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
