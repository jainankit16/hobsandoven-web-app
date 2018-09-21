import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageDialogTemplatesComponent } from './detail-page-dialog-templates.component';

describe('DetailPageDialogTemplatesComponent', () => {
  let component: DetailPageDialogTemplatesComponent;
  let fixture: ComponentFixture<DetailPageDialogTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPageDialogTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPageDialogTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
