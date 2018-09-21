import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { PreloaderService } from '../../../services/preloader.service';
import { CommonService } from '../../../services/common.service';
import { AlertService } from '../../../services/alert.service';
import { UsersApi } from '../../../sdk/services/custom/Users';
import { UserAlertApi } from '../../../sdk/services/custom/UserAlert';
// import { SocketService } from '../../../services/socket.service';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
    let comp: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;

    beforeEach(() => {
        const routerStub = {
            navigate: () => ({})
        };
        const preloaderServiceStub = {};
        const commonServiceStub = {};
        const alertServiceStub = {
            clear: () => ({}),
            success: () => ({})
        };
        const usersApiStub = {
            getCurrentToken: () => ({
                userId: {}
            })
        };
        const userAlertApiStub = {
            showAlertNotification: () => ({
                subscribe: () => ({})
            }),
            markRead: () => ({
                subscribe: (alertId: 2) => ({})
            })
        };
        const socketServiceStub = {
            setCountNotification: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [ NotificationComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: Router, useValue: routerStub },
                { provide: PreloaderService, useValue: preloaderServiceStub },
                { provide: CommonService, useValue: commonServiceStub },
                { provide: AlertService, useValue: alertServiceStub },
                { provide: UsersApi, useValue: usersApiStub },
                { provide: UserAlertApi, useValue: userAlertApiStub },
                { // provide: SocketService, useValue: socketServiceStub }
            ]
        });
        fixture = TestBed.createComponent(NotificationComponent);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

    it('tableData defaults to: []', () => {
        expect(comp.tableData).toEqual([]);
    });

    it('tableDataCount defaults to: 0', () => {
        expect(comp.tableDataCount).toEqual(0);
    });

    it('itemsPerPage defaults to: 10', () => {
        expect(comp.itemsPerPage).toEqual(10);
    });

    it('isLoadMore defaults to: false', () => {
        expect(comp.isLoadMore).toEqual(false);
    });

    it('itemsPerBatch defaults to: 100', () => {
        expect(comp.itemsPerBatch).toEqual(100);
    });

    it('orderBy defaults to: createdAt DESC', () => {
        expect(comp.orderBy).toEqual('createdAt DESC');
    });


    describe('ngOnInit', () => {
        it('makes expected calls', () => {
            spyOn(comp, 'getNotification');
            comp.ngOnInit();
            expect(comp.getNotification).toHaveBeenCalled();
        });
    });



});
