import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardCaseListComponent } from './standard-case-list.component';

describe('StandardCaseListComponent', () => {
    let component: StandardCaseListComponent;
    let fixture: ComponentFixture<StandardCaseListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StandardCaseListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StandardCaseListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
