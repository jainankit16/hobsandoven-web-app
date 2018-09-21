import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InvoicesHomeComponent } from './invoices-home.component';

describe('InvoicesHomeComponent', () => {
    let comp: InvoicesHomeComponent;
    let fixture: ComponentFixture<InvoicesHomeComponent>;
// For async
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ InvoicesHomeComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
        fixture = TestBed.createComponent(InvoicesHomeComponent);
        comp = fixture.componentInstance;
    });

    it('can load  InvoicesHomeComponent', () => {
        expect(comp).toBeTruthy();
    });
    it('should instantiate InvoicesHomeComponent', () => {
        expect(fixture.componentInstance instanceof InvoicesHomeComponent).toBe(true, 'should create InvoicesHomeComponent');
    });

});
