import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PreloaderService } from '../../../services/preloader.service';
import { PurchaseOrderApi } from '../../../sdk/services/custom/PurchaseOrder';
import { InvoiceApi } from '../../../sdk/services/custom/Invoice';
import { OrdrDetailComponent } from './order.component';

describe('OrdrDetailComponent', () => {
    let comp: OrdrDetailComponent;
    let fixture: ComponentFixture<OrdrDetailComponent>;

    beforeEach(() => {
        const preloaderServiceStub = {
            showPreloader: () => ({}),
            hidePreloader: () => ({})
        };
        const purchaseOrderApiStub = {
            findOne: () => ({
                subscribe: () => ({})
            })
        };
        const invoiceApiStub = {};
        TestBed.configureTestingModule({
            declarations: [OrdrDetailComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: PreloaderService, useValue: preloaderServiceStub },
                { provide: PurchaseOrderApi, useValue: purchaseOrderApiStub },
                { provide: InvoiceApi, useValue: invoiceApiStub }
            ]
        });
        fixture = TestBed.createComponent(OrdrDetailComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    // describe('ngOnInit', () => {
    //     it('makes expected calls', () => {
    //         spyOn(comp, 'getOrderDetails');
    //         comp.ngOnInit();
    //         expect(comp.getOrderDetails).toHaveBeenCalled();
    //     });
    // });

});
