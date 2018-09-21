import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule, NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuoteService } from './../../../services/pms/quote.service';
import { JobsiteProjectsApi } from './../../../sdk/services/custom/JobsiteProjects';
import { jobLocationMapService } from './../../../services/pms/job-location.service';
import { JobsiteApi } from './../../../sdk/services/custom/Jobsite';
import { PreloaderService } from './../../../services/preloader.service';
import { SharedService } from './../../../services/pms/shared.services';
import { JobsiteListComponent } from './jobsite-list.component';

describe('JobsiteListComponent', () => {
    let comp: JobsiteListComponent;
    let fixture: ComponentFixture<JobsiteListComponent>;

    beforeEach(() => {
        const NgbAccordionConfigStub = {
            open: () => ({})
        };
        const ngbModalStub = {
            open: () => ({})
        };
        const quoteServiceStub = {
            setQuoteState: () => ({})
        };
        const jobsiteProjectsApiStub = {};
        const jobLocationMapServiceStub = {
            setJobLocations: () => ({})
        };
        const jobsiteApiStub = {
            getJobsitesByMasterProject: () => ({
                subscribe: () => ({})
            })
        };
        const preloaderServiceStub = {
            showPreloader: () => ({}),
            hidePreloader: () => ({})
        };
        const sharedServiceStub = {
            getUserState: () => ({
                subscribe: () => ({})
            })
        };
        TestBed.configureTestingModule({
            declarations: [JobsiteListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgbModule],
            providers: [
                { provide: NgbAccordionConfig, useValue: NgbAccordionConfigStub },
                { provide: NgbModal, useValue: ngbModalStub },
                { provide: QuoteService, useValue: quoteServiceStub },
                { provide: JobsiteProjectsApi, useValue: jobsiteProjectsApiStub },
                { provide: jobLocationMapService, useValue: jobLocationMapServiceStub },
                { provide: JobsiteApi, useValue: jobsiteApiStub },
                { provide: PreloaderService, useValue: preloaderServiceStub },
                { provide: SharedService, useValue: sharedServiceStub },
            ]
        });
        fixture = TestBed.createComponent(JobsiteListComponent);
        comp = fixture.componentInstance;
        spyOn(comp, 'loadJobsiteData');
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
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

    it('itemsPerBatch defaults to: 100', () => {
        expect(comp.itemsPerBatch).toEqual(100);
    });

    it('customPagingControls defaults to: [\'First\', \'Previous\', \'Next\', \'Last\']', () => {
        expect(comp.customPagingControls).toEqual(['First', 'Previous', 'Next', 'Last']);
    });



});
