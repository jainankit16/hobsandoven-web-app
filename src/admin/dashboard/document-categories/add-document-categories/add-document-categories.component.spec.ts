/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddDocumentCategoriesComponent } from './add-document-categories.component';

describe('AddDocumentCategoriesComponent', () => {
    let component: AddDocumentCategoriesComponent;
    let fixture: ComponentFixture<AddDocumentCategoriesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddDocumentCategoriesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddDocumentCategoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
