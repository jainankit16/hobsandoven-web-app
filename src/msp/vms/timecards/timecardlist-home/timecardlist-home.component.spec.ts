import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimeCardListHomeComponent } from './timecardlist-home.component';

describe('TimeCardListHomeComponent', () => {
    let comp: TimeCardListHomeComponent;
    let fixture: ComponentFixture<TimeCardListHomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TimeCardListHomeComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(TimeCardListHomeComponent);
        comp = fixture.componentInstance;
    });

    it('can load  TimeCardListHomeComponent', () => {
        expect(comp).toBeTruthy();
    });
    it('should instantiate TimeCardListHomeComponent', () => {
        expect(fixture.componentInstance instanceof TimeCardListHomeComponent).toBe(true, 'should create TimeCardListHomeComponent');
    });

});
