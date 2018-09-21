import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentsHomeComponent } from './payments-home.component';

describe('PaymentsHomeComponent', () => {
    let comp: PaymentsHomeComponent;
    let fixture: ComponentFixture<PaymentsHomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentsHomeComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(PaymentsHomeComponent);
        comp = fixture.componentInstance;
    });

    it('can load  PaymentsHomeComponent', () => {
        expect(comp).toBeTruthy();
    });
    it('should instantiate PaymentsHomeComponent', () => {
        expect(fixture.componentInstance instanceof PaymentsHomeComponent).toBe(true, 'should create PaymentsHomeComponent');
    });

});
