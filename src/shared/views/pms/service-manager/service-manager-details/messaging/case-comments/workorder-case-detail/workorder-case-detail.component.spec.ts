import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderCaseDetailComponent } from './workorder-case-detail.component';

describe('WorkorderCaseDetailComponent', () => {
    let component: WorkorderCaseDetailComponent;
    let fixture: ComponentFixture<WorkorderCaseDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WorkorderCaseDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkorderCaseDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
