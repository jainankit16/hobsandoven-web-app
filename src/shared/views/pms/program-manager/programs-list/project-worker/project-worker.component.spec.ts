import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWorkerComponent } from './project-worker.component';

describe('ProjectWorkerComponent', () => {
  let component: ProjectWorkerComponent;
  let fixture: ComponentFixture<ProjectWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
