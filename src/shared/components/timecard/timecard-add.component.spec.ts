import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { ModalService } from '../../../services/modal.service';
import { TimecardApi } from '../../../sdk/services/custom/Timecard';
import { WorkerApi } from '../../../sdk/services/custom/Worker';
import { TimecardAddComponent } from './timecard-add.component';

describe('TimecardAddComponent', () => {
    let comp: TimecardAddComponent;
    let fixture: ComponentFixture<TimecardAddComponent>;

    beforeEach(() => {
        const datePipeStub = {
            transform: () => ({})
        };
        const formBuilderStub = {
            group: () => ({})
        };
        const ngbDateParserFormatterStub = {};
        const activatedRouteStub = {
            params: {
                subscribe: () => ({})
            }
        };
        const alertServiceStub = {
            success: () => ({})
        };
        const modalServiceStub = {
            closed: () => ({})
        };
        const timecardApiStub = {
            create: () => ({
                subscribe: () => ({})
            })
        };
        const workerApiStub = {
            find: () => ({
                subscribe: () => ({})
            }),
            findOne: () => ({
                subscribe: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [ TimecardAddComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: DatePipe, useValue: datePipeStub },
                { provide: FormBuilder, useValue: formBuilderStub },
                { provide: NgbDateParserFormatter, useValue: ngbDateParserFormatterStub },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: AlertService, useValue: alertServiceStub },
                { provide: ModalService, useValue: modalServiceStub },
                { provide: TimecardApi, useValue: timecardApiStub },
                { provide: WorkerApi, useValue: workerApiStub }
            ]
        });
        fixture = TestBed.createComponent(TimecardAddComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    // describe('ngOnInit', () => {
    //     it('makes expected calls', () => {
    //         const workerApiStub: WorkerApi = fixture.debugElement.injector.get(WorkerApi);
    //         spyOn(comp, 'formTimecard');
    //         spyOn(workerApiStub, 'find');
    //         comp.ngOnInit();
    //         expect(comp.formTimecard).toHaveBeenCalled();
    //         expect(workerApiStub.find).toHaveBeenCalled();
    //     });
    // });

    // describe('formTimecard', () => {
    //     it('makes expected calls', () => {
    //         const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(FormBuilder);
    //         spyOn(formBuilderStub, 'group');
    //         comp.formTimecard();
    //         expect(formBuilderStub.group).toHaveBeenCalled();
    //     });
    // });

    // describe('saveTimecard', () => {
    //     it('makes expected calls', () => {
    //         const alertServiceStub: AlertService = fixture.debugElement.injector.get(AlertService);
    //         const modalServiceStub: ModalService = fixture.debugElement.injector.get(ModalService);
    //         const timecardApiStub: TimecardApi = fixture.debugElement.injector.get(TimecardApi);
    //         const workerApiStub: WorkerApi = fixture.debugElement.injector.get(WorkerApi);
    //         spyOn(alertServiceStub, 'success');
    //         spyOn(modalServiceStub, 'closed');
    //         spyOn(timecardApiStub, 'create');
    //         spyOn(workerApiStub, 'findOne');
    //         comp.saveTimecard();
    //         expect(alertServiceStub.success).toHaveBeenCalled();
    //         expect(modalServiceStub.closed).toHaveBeenCalled();
    //         expect(timecardApiStub.create).toHaveBeenCalled();
    //         expect(workerApiStub.findOne).toHaveBeenCalled();
    //     });
    // });

});
