import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderListModalComponent } from './workorder-list-modal.component';

describe('WorkorderListModalComponent', () => {
  let component: WorkorderListModalComponent;
  let fixture: ComponentFixture<WorkorderListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
