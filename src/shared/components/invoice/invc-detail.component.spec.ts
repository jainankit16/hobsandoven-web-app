import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PreloaderService } from '../../../services/preloader.service';
import { InvoiceApi } from '../../../sdk/services/custom/Invoice';
import { PurchaseOrderApi } from '../../../sdk/services/custom/PurchaseOrder';
import { InvcDetailComponent } from './invc-detail.component';

describe('InvcDetailComponent', () => {
    let comp: InvcDetailComponent;
    let fixture: ComponentFixture<InvcDetailComponent>;

    beforeEach(() => {
        const preloaderServiceStub = {
            showPreloader: () => ({}),
            hidePreloader: () => ({})
        };
        const invoiceApiStub = {
            findOne: () => ({
                subscribe: () => ({})
            })
        };
        const purchaseOrderApiStub = {
            findOne: () => ({
                subscribe: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [InvcDetailComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: PreloaderService, useValue: preloaderServiceStub },
                { provide: InvoiceApi, useValue: invoiceApiStub },
                { provide: PurchaseOrderApi, useValue: purchaseOrderApiStub }
            ]
        });
        fixture = TestBed.createComponent(InvcDetailComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    // describe('ngOnInit', () => {
    //     it('makes expected calls', () => {
    //         const purchaseOrderApiStub: PurchaseOrderApi = fixture.debugElement.injector.get(PurchaseOrderApi);
    //         spyOn(comp, 'getInvoiceDetails');
    //         spyOn(purchaseOrderApiStub, 'findOne');
    //         comp.ngOnInit();
    //         expect(comp.getInvoiceDetails).toHaveBeenCalled();
    //         expect(purchaseOrderApiStub.findOne).toHaveBeenCalled();
    //     });
    // });

});
