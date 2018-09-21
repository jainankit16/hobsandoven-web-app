import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InvoicesListComponent } from './invoices-list.component';

describe('InvoicesListComponent', () => {
    let comp: InvoicesListComponent;
    let fixture: ComponentFixture<InvoicesListComponent>;
    // For async
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [InvoicesListComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(InvoicesListComponent);
        comp = fixture.componentInstance;
    });

    it('can load InvoicesListComponent', () => {
        expect(comp).toBeTruthy();
    });

    it('should instantiate InvoicesListComponent', () => {
        expect(fixture.componentInstance instanceof InvoicesListComponent).toBe(true, 'should create InvoicesListComponent');
    });
});
