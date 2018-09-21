import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalService } from './../../../services/modal.service';
import { PreloaderService } from '../../../services/preloader.service';
import { PaymentApi } from '../../../sdk/services/custom/Payment';
import { PurchaseOrderApi } from '../../../sdk/services/custom/PurchaseOrder';
import { InvcPaymentsListComponent } from './payment-list.component';

describe('InvcPaymentsListComponent', () => {
    let comp: InvcPaymentsListComponent;
    let fixture: ComponentFixture<InvcPaymentsListComponent>;

    beforeEach(() => {
        const modalServiceStub = {
            open: () => ({})
        };
        const preloaderServiceStub = {
            showPreloader: () => ({}),
            hidePreloader: () => ({})
        };
        const paymentApiStub = {
            find: () => ({
                subscribe: () => ({})
            })
        };
        const purchaseOrderApiStub = {
            findOne: () => ({
                subscribe: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [InvcPaymentsListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: ModalService, useValue: modalServiceStub },
                { provide: PreloaderService, useValue: preloaderServiceStub },
                { provide: PaymentApi, useValue: paymentApiStub },
                { provide: PurchaseOrderApi, useValue: purchaseOrderApiStub }
            ]
        });
        fixture = TestBed.createComponent(InvcPaymentsListComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('IsActiveLink defaults to: false', () => {
        expect(comp.IsActiveLink).toEqual(false);
    });

    it('Title defaults to: Payment List', () => {
        expect(comp.Title).toEqual('Payment List');
    });

    it('tableData defaults to: []', () => {
        expect(comp.tableData).toEqual([]);
    });

    it('tableDataCount defaults to: 0', () => {
        expect(comp.tableDataCount).toEqual(0);
    });

    it('itemsPerPage defaults to: 10', () => {
        expect(comp.itemsPerPage).toEqual(10);
    });

    it('isLoadMore defaults to: false', () => {
        expect(comp.isLoadMore).toEqual(false);
    });

    it('itemsPerBatch defaults to: 200', () => {
        expect(comp.itemsPerBatch).toEqual(200);
    });

    it('orderBy defaults to: Payment_Date__c DESC', () => {
        expect(comp.orderBy).toEqual('Payment_Date__c DESC');
    });

    // describe('ngOnInit', () => {
    //     it('makes expected calls', () => {
    //         const purchaseOrderApiStub: PurchaseOrderApi = fixture.debugElement.injector.get(PurchaseOrderApi);
    //         spyOn(comp, 'getPaymentList');
    //         spyOn(purchaseOrderApiStub, 'findOne');
    //         comp.ngOnInit();
    //         expect(comp.getPaymentList).toHaveBeenCalled();
    //         expect(purchaseOrderApiStub.findOne).toHaveBeenCalled();
    //     });
    // });

    describe('resetPayment', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'getPaymentList');
            comp.resetPayment();
            expect(comp.getPaymentList).toHaveBeenCalled();
        });
    });

});
