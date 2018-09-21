import {TestBed, async,inject} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';

import {AppComponent} from './app.component';
import {BreadcrumbComponent} from './shared/components/breadcrumb/breadcrumb.component';
import {RightSidebarComponent} from './shared/components/right-sidebar/rightsidebar.component';
import {AlertComponent} from './shared/components/alert/alert.component';


import {UsersApi} from './sdk/services/custom/Users';


describe('AppComponent', () => {
    let usersApi: UsersApi;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                BreadcrumbComponent,
                AlertComponent,
                RightSidebarComponent,
            ],
            imports: [
                RouterTestingModule,
                CommonModule,
                BrowserModule,
                NgbModule.forRoot(),
                FormsModule,
                ReactiveFormsModule,
                HttpModule,
            ],
            providers: [                
                UsersApi
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],

        }).compileComponents();
    });
///to write test case in future
//    beforeEach(inject([UsersApi], (users: UsersApi) => {
//        usersApi = users;
//    }));
    
//    it('should get current users', () => {
//        expect(usersApi.getCurrent()).toEqual('swade');
//    });

    it('test cases will be here in future', (done) => {
        done();
    });
});
