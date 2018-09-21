import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PriceListHomeComponent } from './pricelist-home.component';

describe('PriceListHomeComponent', () => {
    let comp: PriceListHomeComponent;
    let fixture: ComponentFixture<PriceListHomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PriceListHomeComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(PriceListHomeComponent);
        comp = fixture.componentInstance;
    });

    it('can load  PriceListHomeComponent', () => {
        expect(comp).toBeTruthy();
    });
    it('should instantiate PriceListHomeComponent', () => {
        expect(fixture.componentInstance instanceof PriceListHomeComponent).toBe(true, 'should create PriceListHomeComponent');
    });

});
