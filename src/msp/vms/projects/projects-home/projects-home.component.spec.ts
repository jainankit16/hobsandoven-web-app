import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectsHomeComponent } from './projects-home.component';

describe('ProjectsHomeComponent', () => {
    let comp: ProjectsHomeComponent;
    let fixture: ComponentFixture<ProjectsHomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ProjectsHomeComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
        fixture = TestBed.createComponent(ProjectsHomeComponent);
        comp = fixture.componentInstance;
    });

    it('can load  ProjectsHomeComponent', () => {
        expect(comp).toBeTruthy();
    });
    it('should instantiate ProjectsHomeComponent', () => {
        expect(fixture.componentInstance instanceof ProjectsHomeComponent).toBe(true, 'should create ProjectsHomeComponent');
    });

});
