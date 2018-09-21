import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWizardPanelComponent } from './top-wizard-panel.component';

describe('TopWizardPanelComponent', () => {
  let component: TopWizardPanelComponent;
  let fixture: ComponentFixture<TopWizardPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopWizardPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopWizardPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
