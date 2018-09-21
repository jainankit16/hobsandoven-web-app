import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsMenuComponent } from './pms-menu.component';

describe('PmsMenuComponent', () => {
  let component: PmsMenuComponent;
  let fixture: ComponentFixture<PmsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
