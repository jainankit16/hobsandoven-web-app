import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PreloaderService } from '../../../services/preloader.service';
import { TimecardApi } from '../../../sdk/services/custom/Timecard';
import { TimeCardDetailComponent } from './timecard-details.component';

describe('TimeCardDetailComponent', () => {
    let comp: TimeCardDetailComponent;
    let fixture: ComponentFixture<TimeCardDetailComponent>;

    beforeEach(() => {
        const preloaderServiceStub = {
            showPreloader: () => ({}),
            hidePreloader: () => ({})
        };
        const timecardApiStub = {
            findOne: () => ({
                subscribe: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [TimeCardDetailComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: PreloaderService, useValue: preloaderServiceStub },
                { provide: TimecardApi, useValue: timecardApiStub }
            ]
        });
        fixture = TestBed.createComponent(TimeCardDetailComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    // describe('ngOnInit', () => {
    //     it('makes expected calls', () => {
    //         spyOn(comp, 'getTimeCardDetails');
    //         comp.ngOnInit();
    //         expect(comp.getTimeCardDetails).toHaveBeenCalled();
    //     });
    // });

});
