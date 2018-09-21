import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsDashboardComponent } from './jobs-dashboard.component';

describe('JobsDashboardComponent', () => {
  let component: JobsDashboardComponent;
  let fixture: ComponentFixture<JobsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('test cases will be here in future', () => {
    expect(component).toBeTruthy();
  });
});
