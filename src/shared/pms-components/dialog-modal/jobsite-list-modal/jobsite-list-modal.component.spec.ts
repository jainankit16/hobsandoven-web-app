import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsiteListModalComponent } from './jobsite-list-modal.component';

describe('JobsiteListModalComponent', () => {
  let component: JobsiteListModalComponent;
  let fixture: ComponentFixture<JobsiteListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsiteListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsiteListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
