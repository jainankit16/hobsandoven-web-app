import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrdersHomeComponent } from './orders-home.component';

describe('OrdersHomeComponent', () => {
    let comp: OrdersHomeComponent;
    let fixture: ComponentFixture<OrdersHomeComponent>;
    // For async
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OrdersHomeComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(OrdersHomeComponent);
        comp = fixture.componentInstance;
    });

    it('can load  OrdersHomeComponent', () => {
        expect(comp).toBeTruthy();
    });
    it('should instantiate OrdersHomeComponent', () => {
        expect(fixture.componentInstance instanceof OrdersHomeComponent).toBe(true, 'should create OrdersHomeComponent');
    });

});
