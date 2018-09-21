import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedVendorComponent } from './approved-vendor.component';

describe('ApprovedVendorComponent', () => {
  let component: ApprovedVendorComponent;
  let fixture: ComponentFixture<ApprovedVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
