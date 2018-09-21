import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CountCarPipe } from '../../../../../../../pipe/countChar/count.char.pipe';

import { CommonService } from '../../../../../../../services/common.service';
import { AppStateService } from '../../../../../../../services/app-state.service';

import { CaseApi } from '../../../../../../../sdk';

@Component({
    selector: 'new-comment',
    templateUrl: './new-comment.component.html',
    styleUrls: ['./new-comment.component.css'],
})
export class NewCommentComponent implements OnInit {

    errorMessage: string;
    successMessage: string;
    commentForm: FormGroup;
    comment: any;
    caseId: any;
    caseDetail: any;
    user: any;
    desText: string;
    isInternalUser: boolean;
    hasErrorInName: any;
    caseList = [];

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private commonService: CommonService,
        private _appState: AppStateService,
        private _caseApi: CaseApi
    ) { }

    ngOnInit() {
        const accessType = this._appState.getAccessType();
        if (accessType === 'internal') {
            this.isInternalUser = true;
        }
        this.comment = {
            createdBy: '',
            commentText: '',
            isPublish: '',
            caseId: '',
            type: 'pms',
        }
        this.errorMessage = '';
        this.activatedRoute.params.subscribe(params => {
            window.scroll(0, 0);
            if (params && params['id']) {
                this.caseList = [];
                this.caseId = params['id'];
                this._caseApi.getCaseMessagingDetails(this.caseId).subscribe(data => {
                    if (data) {
                        this.caseDetail = data;
                        if (this.caseDetail && this.caseDetail.users) {
                            this.comment.createdBy = this.caseDetail.users.sfdcId;
                            this.user = this.caseDetail.users;
                        }
                        this.comment.AccountId = this.caseDetail.AccountId;
                        this.comment.Project_SOP__c = this.caseDetail.Project_SOP__c;
                        this.comment.Jobsite__c = this.caseDetail.Jobsite__c;
                        if (this.caseDetail.workOrder) {
                            this.caseList.push({
                                'id': this.caseDetail.workOrder.sfdcId,
                                'Name': this.caseDetail.workOrder.Name,
                                'type': 'service'
                            });
                        }
                        if (this.caseDetail.CaseNumber) {
                            this.caseList.push({
                                'id': this.caseDetail.sfdcId,
                                'Name': 'PMS' + this.caseDetail.CaseNumber,
                                'type': 'pms'
                            });
                        }
                    } else {
                        this.resetComment();
                    }
                })
            }
        });
    }

    saveComment() {
        this.errorMessage = '';
        if (this.comment.commentText.length === 0) {
            this.errorMessage = 'Comment should not to be blank!';
            return;
        }
        if (this.comment.caseId == null) {
            this.errorMessage = 'Please select Case/Job Id';
            return;
        }
        this._caseApi.saveCaseComment(this.comment).subscribe(data => {
            if (data && data.status === 'success') {
                this.successMessage = data.message;
            } else {
                this.errorMessage = 'Some error occur while save comment.';
            }
        },
            error => {
                this.errorMessage = error.message;
            })
    }

    resetComment() {
        this.comment = {
            createdBy: '',
            commentText: '',
            isPublish: '',
            caseId: '',
        }
    }
}
