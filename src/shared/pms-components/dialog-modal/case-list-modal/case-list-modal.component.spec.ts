import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseListModalComponent } from './case-list-modal.component';

describe('CaseListModalComponent', () => {
  let component: CaseListModalComponent;
  let fixture: ComponentFixture<CaseListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
