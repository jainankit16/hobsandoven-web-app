import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageDialogTemplatesComponent } from './list-page-dialog-templates.component';

describe('ListPageDialogTemplatesComponent', () => {
  let component: ListPageDialogTemplatesComponent;
  let fixture: ComponentFixture<ListPageDialogTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPageDialogTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageDialogTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
