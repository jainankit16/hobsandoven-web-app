import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteListModalComponent } from './quote-list-modal.component';

describe('QuoteListModalComponent', () => {
  let component: QuoteListModalComponent;
  let fixture: ComponentFixture<QuoteListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
