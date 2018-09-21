import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOrderDetailsComponent } from './job-order-details.component';

describe('JobOrderDetailsComponent', () => {
  let component: JobOrderDetailsComponent;
  let fixture: ComponentFixture<JobOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
