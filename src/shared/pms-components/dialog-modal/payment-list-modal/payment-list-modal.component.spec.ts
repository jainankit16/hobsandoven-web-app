import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentListModalComponent } from './payment-list-modal.component';

describe('PaymentListModalComponent', () => {
  let component: PaymentListModalComponent;
  let fixture: ComponentFixture<PaymentListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
