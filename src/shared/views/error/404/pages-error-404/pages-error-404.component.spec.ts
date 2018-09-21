/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagesError-404Component } from './pages-error-404.component';

describe('PagesError-404Component', () => {
  let component: PagesError-404Component;
  let fixture: ComponentFixture<PagesError-404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesError-404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesError-404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
