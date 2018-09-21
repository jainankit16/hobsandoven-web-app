import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WorkerHomeComponent } from './worker-home.component';

describe('WorkerHomeComponent', () => {
    let comp: WorkerHomeComponent;
    let fixture: ComponentFixture<WorkerHomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [WorkerHomeComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(WorkerHomeComponent);
        comp = fixture.componentInstance;
    });

    it('can load  WorkerHomeComponent', () => {
        expect(comp).toBeTruthy();
    });
    it('should instantiate WorkerHomeComponent', () => {
        expect(fixture.componentInstance instanceof WorkerHomeComponent).toBe(true, 'should create workers List component');
    });

});
