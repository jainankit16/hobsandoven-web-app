import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PreloaderService } from '../../../services/preloader.service';
import { PaymentApi } from '../../../sdk/services/custom/Payment';
import { PurchaseOrderApi } from '../../../sdk/services/custom/PurchaseOrder';
import { InvoiceApi } from '../../../sdk/services/custom/Invoice';
import { PayDetailComponent } from './payment-detail.component';

describe('PayDetailComponent', () => {
    let comp: PayDetailComponent;
    let fixture: ComponentFixture<PayDetailComponent>;

    beforeEach(() => {
        const preloaderServiceStub = {
            showPreloader: () => ({}),
            hidePreloader: () => ({})
        };
        const paymentApiStub = {
            findOne: () => ({
                subscribe: () => ({})
            })
        };
        const purchaseOrderApiStub = {
            findOne: () => ({
                subscribe: () => ({})
            })
        };
        const invoiceApiStub = {};
        TestBed.configureTestingModule({
            declarations: [PayDetailComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: PreloaderService, useValue: preloaderServiceStub },
                { provide: PaymentApi, useValue: paymentApiStub },
                { provide: PurchaseOrderApi, useValue: purchaseOrderApiStub },
                { provide: InvoiceApi, useValue: invoiceApiStub }
            ]
        });
        fixture = TestBed.createComponent(PayDetailComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    // describe('ngOnInit', () => {
    //     it('makes expected calls', () => {
    //         const purchaseOrderApiStub: PurchaseOrderApi = fixture.debugElement.injector.get(PurchaseOrderApi);
    //         spyOn(comp, 'getPaymentDetails');
    //         spyOn(purchaseOrderApiStub, 'findOne');
    //         comp.ngOnInit();
    //         expect(comp.getPaymentDetails).toHaveBeenCalled();
    //         expect(purchaseOrderApiStub.findOne).toHaveBeenCalled();
    //     });
    // });

});
