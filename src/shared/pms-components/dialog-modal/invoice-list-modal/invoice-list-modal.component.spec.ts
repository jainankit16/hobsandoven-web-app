import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListModalComponent } from './invoice-list-modal.component';

describe('InvoiceListModalComponent', () => {
  let component: InvoiceListModalComponent;
  let fixture: ComponentFixture<InvoiceListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
