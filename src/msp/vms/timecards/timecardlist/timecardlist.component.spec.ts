import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimeCardListComponent } from './timecardlist.component';

describe('TimeCardListComponent', () => {
    let comp: TimeCardListComponent;
    let fixture: ComponentFixture<TimeCardListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TimeCardListComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(TimeCardListComponent);
        comp = fixture.componentInstance;
    });

    it('can load ProjectsListComponent', () => {
        expect(comp).toBeTruthy();
    });

    it('should instantiate ProjectsListComponent', () => {
        expect(fixture.componentInstance instanceof TimeCardListComponent).toBe(true, 'should create TimeCardListComponent');
    });
});
