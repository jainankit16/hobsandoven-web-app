import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesorderDetailComponent } from './salesorder-detail.component';

describe('SalesorderDetailComponent', () => {
    let component: SalesorderDetailComponent;
    let fixture: ComponentFixture<SalesorderDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SalesorderDetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SalesorderDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
