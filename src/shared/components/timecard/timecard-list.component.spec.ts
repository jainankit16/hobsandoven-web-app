import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalService } from './../../../services/modal.service';
import { PreloaderService } from '../../../services/preloader.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { TimecardApi } from '../../../sdk/services/custom/Timecard';
import { TimecardListComponent } from './timecard-list.component';

describe('TimecardListComponent', () => {
    let comp: TimecardListComponent;
    let fixture: ComponentFixture<TimecardListComponent>;

    beforeEach(() => {
        const modalServiceStub = {
            open: () => ({})
        };
        const preloaderServiceStub = {
            showPreloader: () => ({}),
            hidePreloader: () => ({})
        };
        const activatedRouteStub = {};
        const alertServiceStub = {};
        const timecardApiStub = {
            find: () => ({
                subscribe: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [TimecardListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: ModalService, useValue: modalServiceStub },
                { provide: PreloaderService, useValue: preloaderServiceStub },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: AlertService, useValue: alertServiceStub },
                { provide: TimecardApi, useValue: timecardApiStub }
            ]
        });
        fixture = TestBed.createComponent(TimecardListComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('IsActiveLink defaults to: false', () => {
        expect(comp.IsActiveLink).toEqual(false);
    });

    it('Title defaults to: TimeCard List', () => {
        expect(comp.Title).toEqual('TimeCard List');
    });

    it('tmpTimeCards defaults to: []', () => {
        expect(comp.tmpTimeCards).toEqual([]);
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

    it('orderBy defaults to: CreatedDate  DESC', () => {
        expect(comp.orderBy).toEqual('CreatedDate  DESC');
    });

    // describe('ngOnInit', () => {
    //     it('makes expected calls', () => {
    //         spyOn(comp, 'getTimeCardList');
    //         comp.ngOnInit();
    //         expect(comp.getTimeCardList).toHaveBeenCalled();
    //     });
    // });

});
