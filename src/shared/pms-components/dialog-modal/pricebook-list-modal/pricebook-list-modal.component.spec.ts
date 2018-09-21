import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricebookListModalComponent } from './pricebook-list-modal.component';

describe('PricebookListModalComponent', () => {
  let component: PricebookListModalComponent;
  let fixture: ComponentFixture<PricebookListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricebookListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricebookListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
