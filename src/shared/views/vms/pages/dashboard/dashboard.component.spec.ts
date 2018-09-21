import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let comp: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const fakeTitle = 'fake dashboard title';
// For async
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent]
    })
      .compileComponents();
  }));
// For async
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h3'));
    el = de.nativeElement;
    fixture.detectChanges();
  });
  it('should instantiate of VMS  DashboardComponent', () => {
    expect(fixture.componentInstance instanceof DashboardComponent).toBe(true, 'should create dashboard component');
  });

  it('should test title of VMS Dashboard', () => {
    expect(comp.title).toBeDefined();
    expect(comp.title).not.toBeNull();
    expect(el.textContent).toEqual(comp.title, 'check dashboard tile');
  });

  it('should test fake title of VMS Dashboard', () => {
    comp.title = fakeTitle;
    expect(comp.title).toBe(fakeTitle);
  });
});
