import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PreloaderService } from '../../../services/preloader.service';
import { InvoiceApi } from '../../../sdk/services/custom/Invoice';
import { ModalService } from '../../../services/modal.service';
import { OrdrInvoiceListComponent } from './Invc-list.component';

describe('OrdrInvoiceListComponent', () => {
    let comp: OrdrInvoiceListComponent;
    let fixture: ComponentFixture<OrdrInvoiceListComponent>;

    beforeEach(() => {
        const preloaderServiceStub = {
            showPreloader: () => ({}),
            hidePreloader: () => ({})
        };
        const invoiceApiStub = {
            find: () => ({
                subscribe: () => ({})
            })
        };
        const modalServiceStub = {
            open: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [OrdrInvoiceListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: PreloaderService, useValue: preloaderServiceStub },
                { provide: InvoiceApi, useValue: invoiceApiStub },
                { provide: ModalService, useValue: modalServiceStub }
            ]
        });
        fixture = TestBed.createComponent(OrdrInvoiceListComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('IsActiveLink defaults to: false', () => {
        expect(comp.IsActiveLink).toEqual(false);
    });

    it('Title defaults to: Invoice List', () => {
        expect(comp.Title).toEqual('Invoice List');
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

    it('orderBy defaults to: Due_Date__c DESC', () => {
        expect(comp.orderBy).toEqual('Due_Date__c DESC');
    });

    // describe('ngOnInit', () => {
    //     it('makes expected calls', () => {
    //         spyOn(comp, 'getInvoiceList');
    //         comp.ngOnInit();
    //         expect(comp.getInvoiceList).toHaveBeenCalled();
    //     });
    // });

});
