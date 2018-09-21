import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSmcComponent } from './dashboard.component';

describe('DashboardSmcComponent', () => {
  let component: DashboardSmcComponent;
  let fixture: ComponentFixture<DashboardSmcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSmcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
