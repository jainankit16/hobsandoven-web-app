import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingCommentComponent } from './billing-comment.component';

describe('BillingCommentComponent', () => {
    let component: BillingCommentComponent;
    let fixture: ComponentFixture<BillingCommentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BillingCommentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BillingCommentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
