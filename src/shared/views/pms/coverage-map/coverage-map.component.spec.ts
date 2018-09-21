import { Observable } from 'rxjs/Rx';
import { NgbModule, NgbAccordionConfig, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectApi } from './../../sdk/services/custom/Project';
import { JobsiteApi } from './../../sdk/services/custom/Jobsite';
import { MetroVirtualVendorPoolApi } from './../../sdk/services/custom/MetroVirtualVendorPool';
import { UniquePipe } from './../shared/pipe/unique/unique.pipe';
import { PreloaderService } from './../../services/preloader.service';
import { ApprovedProjectVendorPoolApi } from './../../sdk/services/custom/ApprovedProjectVendorPool';
import { SharedService } from './../../services/pms/shared.services';
import { jobLocationMapService } from './../../services/pms/job-location.service';
import { ActivatedRoute } from '@angular/router';
import { CoverageMapComponent } from './coverage-map.component';

describe('CoverageMapComponent', () => {
    let comp: CoverageMapComponent;
    let fixture: ComponentFixture<CoverageMapComponent>;

    beforeEach(() => {
        const projectApiStub = {
            getMasterProjects: (v) => ({
                subscribe: () => ({ v })
            })
        };
        const jobsiteApiStub = {
            getJobsitesByMasterProject: () => ({
                subscribe: () => ({})
            })
        };
        const metroVirtualVendorPoolApiStub = {
            find: () => ({
                subscribe: () => ({})
            })
        };
        const uniquePipeStub = {
            transform: () => ({
                forEach: () => ({}),
                push: () => ({})
            })
        };
        const preloaderServiceStub = {
            showPreloader: () => ({}),
            hidePreloader: () => ({})
        };
        const approvedProjectVendorPoolApiStub = {};
        const sharedServiceStub = {};
        const jobLocationMapServiceStub = {};
        const activatedRouteStub = {
            params: {
                subscribe: () => ({})
            }
        };
        TestBed.configureTestingModule({
            declarations: [CoverageMapComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [NgbModule],
            providers: [
                { provide: ProjectApi, useValue: projectApiStub },
                { provide: JobsiteApi, useValue: jobsiteApiStub },
                { provide: MetroVirtualVendorPoolApi, useValue: metroVirtualVendorPoolApiStub },
                { provide: UniquePipe, useValue: uniquePipeStub },
                { provide: PreloaderService, useValue: preloaderServiceStub },
                { provide: ApprovedProjectVendorPoolApi, useValue: approvedProjectVendorPoolApiStub },
                { provide: SharedService, useValue: sharedServiceStub },
                { provide: jobLocationMapService, useValue: jobLocationMapServiceStub },
                { provide: ActivatedRoute, useValue: activatedRouteStub }, NgbAccordionConfig, NgbTabsetConfig
            ]
        });
        fixture = TestBed.createComponent(CoverageMapComponent);
        comp = fixture.componentInstance;
        // spyOn(comp, 'loadJobsites');

    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('zoomm defaults to: 2', () => {
        expect(comp.zoomm).toEqual(2);
    });

    it('type defaults to: false', () => {
        expect(comp.type).toEqual(false);
    });

    it('markers defaults to: []', () => {
        expect(comp.markers).toEqual([]);
    });

    it('showProviderCost defaults to: false', () => {
        expect(comp.showProviderCost).toEqual(false);
    });

    it('geoMetroIds defaults to: []', () => {
        expect(comp.geoMetroIds).toEqual([]);
    });

    it('compliancesData defaults to: []', () => {
        expect(comp.compliancesData).toEqual([]);
    });
});
