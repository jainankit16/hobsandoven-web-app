import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Print } from './../../../../../../libs/utils';

import { PreloaderService } from './../../../../../../services/preloader.service';
import { ModalService } from './../../../../../../services/modal.service';
import { EmailServiceApi } from './../../../../../../sdk/services/custom/EmailService';
import { AppStateService } from '../../../../../../services/app-state.service';

import { CaseApi, RecordTypeApi } from './../../../../../../sdk';

@Component({
    selector: 'app-pms-case-details',
    templateUrl: './pms-case-details.component.html',
    styleUrls: ['./pms-case-details.component.css'],
    providers: [EmailServiceApi]
})

export class PmsCaseDetailsComponent implements OnInit {

    @Input() page: string;
    isInternalUser = false;
    filterQuery = {};
    recordType: any;
    caseData: any;
    caseId: any;
    workOrderLine: any;
    salesOrderLine: any;
    txtEmail: any;
    message: any;
    msgClass: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private _preloaderService: PreloaderService,
        private _appState: AppStateService,
        private modalService: ModalService,
        private _emailServiceApi: EmailServiceApi,
        private _caseApi: CaseApi,
        private _recordTypeApi: RecordTypeApi
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.caseId = params['id'];
            window.scroll(0, 0);
            this.getOrderDetails();
        });
    }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
    }

    getOrderDetails(): void {
        this._preloaderService.showPreloader();
        this._caseApi.getServiceManagerOrderList({
            'where': { 'id': this.caseId },
            'source': this.isInternalUser,
            'isDetail': true,
            'model': ['case'],
        }).subscribe(
            res => {
                this.caseData = [];
                this.workOrderLine = [];
                this.salesOrderLine = [];
                this.recordType = [];
                if (res.length) {
                    this.caseData = res[0];
                    this.workOrderLine = this.caseData.workOrder ? this.caseData.workOrder.jobOrderItems ?
                        this.caseData.workOrder.jobOrderItems : [] : [];
                    this.salesOrderLine = this.caseData.order ? this.caseData.order : [];
                    this.getRecorType()
                }
                this._preloaderService.hidePreloader()
            }, err => {
                this._preloaderService.hidePreloader()
            })
    }

    getRecorType(): void {
        this._recordTypeApi.find({ where: { SobjectType: 'Case', IsActive: true }, fields: ['sfdcId', 'Name'] }).subscribe(
            data => {
                if (data) {
                    this.recordType = data;
                }
            }, err => {
                this._preloaderService.hidePreloader();
            })
    }

    onClickRecordType(typeId): void {
        this.filterQuery['RecordTypeId'] = typeId;
        this.getOrderDetails()
    }

    onClickPrint(): void {
        const contentsId = 'PMSCaseDetails';
        const heading = 'Order (PMS Case Details)';
        const print = new Print(contentsId, heading)
    }

    onClickEmail(content, _size): void {
        this.txtEmail = '';
        this.message = '';
        this.modalService.open(content, _size);
    }

    sendMail() {
        this._preloaderService.showPreloader();
        this.txtEmail = this.txtEmail.trim();
        this._caseApi.sendOrderDetailsMail({
            'where': { 'id': this.caseId },
            'source': this.isInternalUser,
            'toEmail': this.txtEmail,
            'isInternalUser': this.isInternalUser
        }).subscribe(res => {
            if (res === 'data_warning') {
                this.msgClass = 'alert-warning'
                this.message = 'Case data not available!';
            } else {
                this.msgClass = 'alert-success'
                this.message = 'Email has been sent successfully!';
            }
            this.modalService.closed();
            this._preloaderService.hidePreloader();
        }, err => {
            this.modalService.closed();
            this._preloaderService.hidePreloader();
            this.msgClass = 'alert-warning '
            this.message = err.message;
        })
    }
}
