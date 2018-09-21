import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, wtfStartTimeRange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { ModalService } from '../../../../services/modal.service';
import { PreloaderService } from '../../../../services/preloader.service';
import { AppStateService } from '../../../../services/app-state.service';
import { AlertService } from './../../../../services/alert.service';
import { ConfirmDialogService } from '../../../../services/confirm-dialog.service';

import { DocumentListComponent } from '../../../../components/document/document-list.component';
import { TimecardListComponent } from '../../../../components/timecard/timecard-list.component';
import { ToolbarComponent } from '../../../../components/toolbar/toolbar.component';

import { JobApi, WorkflowApi, UsersApi } from '../../../../sdk';

@Component({
    selector: 'app-job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.css']
})

export class JobDetailComponent implements OnInit, AfterViewInit {

    private sub: any;
    private jobId: string;
    reloadData = true;
    reloadSidebar = true;
    job: any;
    wfStages: Array<any>;
    wfHistory: Array<any>;
    wfStatus: any;
    userType: string;
    updateFields: any;
    vendorActionBtn: Array<any>;
    /// to fetch document-data after save
    @ViewChild(DocumentListComponent) documentList: DocumentListComponent;
    @ViewChild(TimecardListComponent) timeCardList: TimecardListComponent;
    /*toolbar basic configuration */
    toolbarOptions: any = [];
    @ViewChild('tabset') tabset: ElementRef; // in case of modal
    @ViewChild('uploadContent') uploadContent: ElementRef; // in case of modal
    @ViewChild('addTimecardModal') addTimecardModal: ElementRef; // For TimeCard modal
    @ViewChild('selectWorkerModal') selectWorkerModal: ElementRef; // For Select Worker modal used by workflow
    @ViewChild('updateAppointmentModal') updateAppointmentModal: ElementRef; // For Update Appointmet modal used by workflow
    @ViewChild(ToolbarComponent) toolbarConfig: ToolbarComponent;
    wfStatusToobar: ReplaySubject<any> = new ReplaySubject(1);
    jobTitle = '';
    currentUser: any;
    /*end of toolbar basic configuration */

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _modalService: ModalService,
        private _alertService: AlertService,
        private _loader: PreloaderService,
        private _appState: AppStateService,
        private _wfApi: WorkflowApi,
        private usersApi: UsersApi,
        private _jobApi: JobApi,
        private _confirmDialogService: ConfirmDialogService,
    ) {
        this.sub = this.route.params.subscribe(params => {
            this.jobId = params['id'];
            if (this.job && this.job.id && this.job.id !== this.jobId) {
                this.refreshData();
            }
        });
    }

    ngOnInit() {
        this.userType = this._appState.getAccessType();
        // get current user details
        this.usersApi.getCurrent({ include: ['profile'] }).subscribe(
            userProfile => {
                this.currentUser = userProfile;
            },
            error => {
                console.log(error.message);
            }
        );
        if (this.jobId) {
            this.loadData(this.jobId);
        }
    }

    loadData(jobId) {
        const reqObj = {
            'fields': ['sfdcId', 'id', 'Iron_Job_num__c', 'Name', 'Vendorsite__c', 'workflowId', 'workflowStatusId', 'Work_Order__c',
                'CKSW_BASE__Account__c', 'RecordTypeId', 'isCancelled', 'Dispatch_Service_Resolution_Status__c', 'Vendor__c',
                'Customer_Service_Type_From_Program__c', 'Technical_Level__c', 'Service_Dispatch_SLA_Priority_FrmProgram__c',
                'acknowledge_instruction', 'pre_visit_checklist', 'Deliverable_Status__c'],
            'where': { 'sfdcId': jobId },
            'include': [
                {
                    'relation': 'vendor',
                    'scope': {
                        'fields': ['sfdcId', 'Name']
                    }
                },
                {
                    'relation': 'partner',
                    'scope': {
                        'fields': ['sfdcId', 'Name']
                    }
                }
            ]
        };
        this._jobApi.getJobDetailsById(reqObj).subscribe(
            result => {
                if (result && result.id) {
                    this.job = result;
                    this.jobTitle = this.job.Iron_Job_num__c + ' | ' + this.job.Dispatch_Service_Resolution_Status__c + ' | ' +
                        this.job.Customer_Service_Type_From_Program__c + ' | ' + this.job.Technical_Level__c + ' | ' +
                        this.job.Service_Dispatch_SLA_Priority_FrmProgram__c + ' | ';
                    this.jobTitle += (this.job.partner && this.job.partner.Name) ? this.job.partner.Name + ' | ' : ' | ';
                    this.jobTitle += (this.job.vendor && this.job.vendor.Name) ? this.job.vendor.Name : '';

                    if (this.job.workflowId && this.job.workflowStatusId) {
                        this.fetchWorkflow();
                    }
                }
                this.reloadData = true;
            }, err => {
                this._alertService.error(err.message, true);
                this.router.navigate(['/vms/jobs/']);
            }
        );
    }

    fetchWorkflow() {
        this._wfApi.get(this.job.workflowId, 'job', this.job.id).subscribe(results => {
            this.wfHistory = results['history'] ? results['history'] : [];
            this._wfApi.getStatus(this.job.workflowStatusId, 'job', this.job.id).subscribe(status => {
                this.wfStatus = status;
                //   this.wfStatusToobar.next(status); // toolbar
                this.vendorActionBtn = [];
                if (this.wfStatus['transitions']) {
                    this.wfStatus['transitions'] = this.wfStatus['transitions'].filter(btn => {
                        // Don't show hidden button
                        let excludeStage = false;

                        if (btn.isActive === false) {
                            excludeStage = true;
                        } else {
                            if (btn.visibilityCondition) {
                                const vC = JSON.parse(btn.visibilityCondition);
                                for (const key in vC) {
                                    if (vC.hasOwnProperty(key)) {
                                        if (vC[key] == this.job[key]) {
                                            excludeStage = true;
                                        }
                                    }
                                }
                            }
                            switch (this.userType) {
                                case 'internal':
                                    if (btn.isVMSVisible === true && excludeStage === false) {
                                        this.vendorActionBtn.push(btn);
                                    }
                                    if (btn.isMSPVisible === false) {
                                        excludeStage = true;
                                    }
                                    break;
                                case 'vendor':
                                    if (btn.isVMSVisible === false) {
                                        excludeStage = true;
                                    }
                                    break;
                            }
                        }
                        if (!excludeStage) {
                            return btn;
                        }
                    });
                }
                if (results && results['workflow'] && results['workflow']['stages']) {
                    this.wfStages = results['workflow']['stages'].filter(stage => {
                        // Don't show hidden stages
                        let excludeStage = false;

                        // If stage is hidden
                        // If stage ID is for 'Declined' stage and current status is not set to declined
                        // If job is not cancelled, don't display cancelled stage

                        if (stage.isHiddenStage ||
                            (stage.id === 3 && this.wfStatus.id !== 4) ||
                            (stage.id === 12 && !this.job.isCancelled)) {
                            excludeStage = true;
                        }
                        stage.class = 'disabled';
                        // Check if workflow stage ID of current workflow status matches
                        if (this.wfStatus.workflowStageId === stage.id) {
                            stage.class = 'current';
                        }
                        // If this job has no workflow history, set the first stage as active
                        if (!this.wfStatus.workflowStageId && this.wfHistory.length === 0 && stage.titleMSP.toLowerCase() === 'invited') {
                            stage.class = 'current';
                        }
                        // Check if this stage has any history and whether it's completed or not
                        const historyExist = this.wfHistory.filter(log => log.workflowStageId === stage.id && log.dateCompleted);
                        if (historyExist.length > 0) {
                            stage.class = 'first done';
                        }
                        // Showing title on the basis of user type
                        switch (this.userType) {
                            case 'internal': stage.title = stage.titleMSP;
                                break;
                            case 'partner': stage.title = stage.titlePMS;
                                break;
                            case 'vendor': stage.title = stage.titleVMS;
                                break;
                        }
                        if (!excludeStage) {
                            return stage;
                        }
                    });
                }
            }, err => {
                console.log(err);
            });
        }, err => {
            console.log(err);
        });
    }

    checkButtonVisibility(btn: any) {
        return true;
    }

    // to auto-update data on modal close
    documentUploaded(event) {
        this.documentList.updateData(event);
    }

    timecardSaved(event) {
        this.timeCardList.updateData(event);
    }

    // method to change status based on accept/reject buttons
    changeStatus(event) {
        if (event === 'accepted') {
            this.updateFields = {
                Job_Status_Internal__c: 'Accepted',
                Dispatch_Service_Resolution_Status__c: 'In-Progress'
            };
        } else if (event === 'rejected') {
            this.updateFields = {
                Job_Status_Internal__c: 'Rejected',
                Dispatch_Service_Resolution_Status__c: 'New'
            };
        }
        // update job based on button clicked
        this._jobApi.updateAll({ sfdcId: this.jobId }, this.updateFields).subscribe(
            result => {
                this._alertService.success('Job status has been changed successfully.');
            },
            err => {
                this._alertService.error(err.message);
            }
        );
    }

    onHeaderButtonClick(button, tabset, modal, size) {
        if (button === 'Timecard') {
            tabset.activeId = 'timeCard';
            this._modalService.open(modal, size);
        } else if (button === 'Upload') {
            tabset.activeId = 'files';
            this._modalService.open(modal, size);
        } else if (button === 'Messaging') {
            tabset.activeId = 'messages';
        } else if (button === 'Transitions') {
            if (modal.triggerAction) {
                eval(modal.triggerAction);
            } else {
                tabset.activeId = 'manager';
                this.updateStatus(modal);
            }
        }
    }

    confirmDialogPrompt(modal, tabset) {
        const _thisEvnt = this;
        const button = modal.btnTitle;
        this._confirmDialogService.confirmThis(
            {
                title: 'Warning!!',
                titleIcon: 'mdi mdi-alert text-warning',
                text: 'Are you sure, you want to ' + button + '?'
            },
            function () {
                tabset.activeId = 'manager';
                _thisEvnt.updateStatus(modal);
            },
            function () {
                // Do nothing on cancel
            }
        );
    }

    // To update workflow status
    updateStatus(wfTransition) {
        this._loader.showPreloader();
        this._wfApi.updateStatus(wfTransition.id, 'job', this.job.id).subscribe(status => {
            const message = 'Workflow Status has been updated.';
            this._alertService.success(message);
            this.job.workflowStatusId = status;
            this.refreshData();
            this._loader.hidePreloader();
        });
    }
    /**
     * Refresh workflow
     */

    refreshData() {
        this.reloadData = false;
        this.loadData(this.jobId);
    }

    /**
     * toolbar configuration
     */
    ngAfterViewInit() {
        /** toobar at run time*/
        this.wfStatusToobar.subscribe(wfStatus => {
            if (wfStatus && wfStatus.transitions) {
                this.toolbarOptions = [];
                wfStatus.transitions.forEach((t, k) => {
                    if (t.type === 'button' && this.checkButtonVisibility(t)) {
                        this.toolbarOptions.push({
                            title: t.btnTitle,
                            type: 'button',
                            class: t.btnCss,
                            callback: 'onHeaderButtonClick',
                            customArgs: ['Transitions', this.tabset, t, 'lg'],
                            sortKey: k
                        });
                    }
                });
                const key = (wfStatus.transitions.length > 0) ? wfStatus.transitions.length : 0;
                this.getDefaultToolBar(key);
            } else {
                this.getDefaultToolBar();
            }
        }, error => {
            this.getDefaultToolBar();
        });
    }
    /**
     * 
     * @param key 
     *
     */
    getDefaultToolBar(key = 0) {
        this.toolbarOptions.push(
            {
                title: 'Add Timecard',
                type: 'button',
                class: 'btn-light',
                icon: 'mdi mdi-calendar',
                callback: 'onHeaderButtonClick',
                customArgs: ['Timecard', this.tabset, this.addTimecardModal, 'lg'],
                sortKey: key + 1,
            },
            {
                title: 'Upload',
                type: 'button',
                class: 'btn-light',
                icon: 'mdi mdi-camera',
                callback: 'onHeaderButtonClick',
                customArgs: ['Timecard', this.tabset, this.uploadContent, 'lg'],
                sortKey: key + 2,
            },
            {
                title: 'Messaging',
                type: 'button',
                class: 'btn-light',
                icon: 'mdi mdi-message-reply-text',
                callback: 'onHeaderButtonClick',
                customArgs: ['Messaging', this.tabset, this.uploadContent, 'lg'],
                sortKey: key + 3
            }
        );
        // this.toolbarConfig.setToolbar(this.toolbarOptions);
        // this.toolbarConfig.remove([{ sortKey: 5 }, { sortKey: 6 }]);
    }
    /**
     *
     * @param arg
     */
    activateEvent(arg) {
        const callbackArgs = this.toolbarConfig.bindEvent(this.toolbarOptions, arg);
        if (callbackArgs && callbackArgs.length > 0) {
            this[callbackArgs[0]].apply(this, (callbackArgs[1]) ? callbackArgs[1] : null);
        }
    }

}
