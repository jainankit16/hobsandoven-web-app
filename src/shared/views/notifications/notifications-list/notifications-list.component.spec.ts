import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotificationsListComponent } from './notifications-list.component';

describe('NotificationsListComponent', () => {
    let comp: NotificationsListComponent;
    let fixture: ComponentFixture<NotificationsListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ NotificationsListComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
        fixture = TestBed.createComponent(NotificationsListComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('should instantiate NotificationsListComponent', () => {
      expect(fixture.componentInstance instanceof NotificationsListComponent).toBe(true, 'should create NotificationsListComponent');
  });

});
