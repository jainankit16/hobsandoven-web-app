import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentsListComponent } from './payments-list.component';

describe('PaymentsListComponent', () => {
    let comp: PaymentsListComponent;
    let fixture: ComponentFixture<PaymentsListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentsListComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(PaymentsListComponent);
        comp = fixture.componentInstance;
    });

    it('can load PaymentsListComponent', () => {
        expect(comp).toBeTruthy();
    });
    it('should instantiate PaymentsListComponent', () => {
        expect(fixture.componentInstance instanceof PaymentsListComponent).toBe(true, 'should create PaymentsListComponent');
    });
});
