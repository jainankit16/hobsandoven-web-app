import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedService } from './../../services/pms/shared.services';
import { JobsiteSetupComponent } from './jobsite-setup.component';
import { NgbModule, NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
describe('JobsiteSetupComponent', () => {
    let comp: JobsiteSetupComponent;
    let fixture: ComponentFixture<JobsiteSetupComponent>;

    beforeEach(() => {
        const sharedServiceStub = {
            activewizard$: {
                subscribe: () => ({})
            }
        };
        const NgbAccordionConfigStub = {
            open: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [ JobsiteSetupComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            imports: [NgbModule],
            providers: [
                { provide: NgbAccordionConfig, useValue: NgbAccordionConfigStub },
                { provide: SharedService, useValue: sharedServiceStub , }
            ]
        });
        spyOn(JobsiteSetupComponent.prototype, 'isFirstStep');
        fixture = TestBed.createComponent(JobsiteSetupComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('isServiceSetup defaults to: false', () => {
        expect(comp.isServiceSetup).toEqual(false);
    });

});
