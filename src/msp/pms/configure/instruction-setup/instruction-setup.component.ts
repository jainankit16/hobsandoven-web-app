import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PreloaderService } from './../../../../shared/services/preloader.service';
import { SharedService } from './../../../../shared/services/pms/shared.services';
import { jobLocationMapService, } from './../../../../shared/services/pms/job-location.service';
import { ContactApi, ProjectApi, JobsiteProjectsApi, JobsiteContactApi } from './../../../../shared/sdk';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './instruction-setup.component.html'
})
export class InstructionSetupComponent implements OnInit, OnDestroy {
    userState: any;
    ProgramIstrue = false;
    selectedJobsites: any[] = [];

    serviceDeliverables = '';
    trainingDocuments = '';
    recquiredTools = '';

    jobSiteInstructions: any[] = [];
    jobsiteContacts: any[] = [];
    successMsg = '';
    errorMsg = '';
    source: string;
    private subscription: Subscription;

    constructor(
        private _router: Router,
        public _sharedService: SharedService,
        private _jobLocationService: jobLocationMapService,
        private _jobsiteProjectsApi: JobsiteProjectsApi,
        private _jobsiteContactApi: JobsiteContactApi,
        private _contactApi: ContactApi,
        private _preloaderService: PreloaderService,
        private _projectApi: ProjectApi
    ) {
        this._sharedService.pushactivewizard(4);
    }

    ngOnInit() {
        this.subscription = this._sharedService.getUserState().subscribe(current => {
            this.userState = current;
            if (this.userState.program !== undefined && this.userState.program.programReferCode != null) {
                this.ProgramIstrue = true;
                this.getProgramInstruction(this.userState.program.programSFId);
            } else {
                this.ProgramIstrue = false;
            }
        });
        const subscription = this._jobLocationService.getSelectedLocations().subscribe(data => {
            this.selectedJobsites = data;
            if (data && data.length > 0) {
                this.getInstructionsForJobsites();
            } else {
                this.jobsiteContacts = [];
                this.jobSiteInstructions = [];
            }
        });
        this.subscription.add(subscription);
    }

    getInstructionsForJobsites() {
        this.jobsiteContacts = [];
        for (const selectedJob of this.selectedJobsites) {
            if (selectedJob['Jobsite']) {
                this.getJobsiteContacts(selectedJob['Jobsite']);
            }
            this.getJobSiteInstruction(selectedJob);
        }
    }

    getJobSiteInstruction(selectedJob) {
        const instructionObj = {
            jobsiteNo: selectedJob.Jobsite.Jobsite_ID__c,
            instruction: '',
            id: '',
            JobsitesfdcId: selectedJob.Jobsite.sfdcId
        };
        this._jobsiteProjectsApi.find({
            include: {
                relation: 'Project'
            },
            where: { Jobsite__c: selectedJob['Jobsite__c'] }
        }).subscribe(
            data => {
                if (data && data.length) {
                    instructionObj.id = data[0]['Project']['id'];
                    instructionObj.instruction = data[0]['Project']['Special_Service_Instructions__c'];
                }
                this.jobSiteInstructions.push(instructionObj);
            },
            err => {
                console.log(err);
            }
        );
    }

    getProgramInstruction(programSFId) {
        this._projectApi.find({
            where: { sfdcId: programSFId },
            fields: ['sfdcId', 'SOW_Description_Customer_Long__c', 'Description__c', 'Required_Tools__c']
        }).subscribe(res => {
            if (res.length) {
                this.serviceDeliverables = res[0]['SOW_Description_Customer_Long__c'];
                this.trainingDocuments = res[0]['Description__c'];
                this.recquiredTools = res[0]['Required_Tools__c'];
            }
        }, err => {
            console.log('error', err.messages);
        })

    }

    getJobsiteContacts(jobsite) {
        this._preloaderService.showPreloader();
        jobsite['Customer Site (Technical Escalation)'] = '';
        jobsite['Customer Site (Admin Escalation)'] = '';
        jobsite['Customer Site (Service Desk)'] = '';
        jobsite['Jobsite_Key_Contact'] = '';

        this._jobsiteContactApi.find({
            include: ['contact'],
            order: 'updatedAt',
            where: { Jobsite__c: jobsite['sfdcId'], updatedAt: { neq: null } }
        }).subscribe(
            data => {
                data.forEach(element => {
                    switch (element['Jobsite_Contact_Type__c']) {
                        case 'Customer Site (Technical Escalation)':
                            jobsite['Customer Site (Technical Escalation)'] = '';
                            if (element['contact'] && element['contact']['LastName']) {
                                jobsite['Customer Site (Technical Escalation)'] = element['contact']['LastName'];
                            }
                            break;
                        case 'Customer Site (Admin Escalation)':
                            jobsite['Customer Site (Admin Escalation)'] = '';
                            if (element['contact'] && element['contact']['LastName']) {
                                jobsite['Customer Site (Admin Escalation)'] = element['contact']['LastName'];
                            }
                            break;
                        case 'Customer Site (Service Desk)':
                            jobsite['Customer Site (Service Desk)'] = '';
                            if (element['contact'] && element['contact']['LastName']) {
                                jobsite['Customer Site (Service Desk)'] = element['contact']['LastName'];
                            }
                            break;
                    }
                });
                jobsite['Jobsite_Key_Contact'] = '';
                if (jobsite['Jobsite_Key_Contact__c']) {
                    this._contactApi.findOne({
                        order: 'updatedAt',
                        where: { sfdcId: jobsite['Jobsite_Key_Contact__c'], updatedAt: { neq: null } }
                    }).subscribe(
                        result => {
                            jobsite['Jobsite_Key_Contact'] = result['LastName']
                            this.jobsiteContacts.push(jobsite);
                            this._preloaderService.hidePreloader();
                        }, err => {
                            this.jobsiteContacts.push(jobsite);
                            this._preloaderService.hidePreloader();
                        }
                    );
                } else {
                    this.jobsiteContacts.push(jobsite);
                }
            },
            err => {
                console.log(err);
                this._preloaderService.hidePreloader();
            }
        );
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (!this.source) {
            this.userState.program = {};
            this.userState.quote = {};
            this._sharedService.setUserState(this.userState);
            this._jobLocationService.setSelectedLocations([]);
        }
    }

    goBack(): void {
        this.source = 'back'
        this._router.navigate(['/pms/configure/pricing'])
    }

    saveInstructions(caller) {
        this.errorMsg = '';
        this._preloaderService.showPreloader();
        if (this.jobSiteInstructions && this.jobSiteInstructions.length > 0) {
            this.jobSiteInstructions.forEach(element => {
                const jobInstructionObj = {
                    Special_Service_Instructions__c: element.instruction
                };
                if (element && element.instruction && element.id) {
                    this.JobsiteInstructionUpdate(caller, element.id, jobInstructionObj);
                }
            });
        } else {
            this.errorMsg = 'Jobsite Instruction is missing!';
            this._preloaderService.hidePreloader();
        }
    }

    JobsiteInstructionUpdate(caller, programId, jobInstructionObj) {
        if (programId) {
            this._projectApi.updateAll({ id: programId }, jobInstructionObj).subscribe(
                res => {
                    if (res.count) {
                        this.successMsg = 'Instruction updated successfully';
                        this._preloaderService.hidePreloader();
                        window.scrollTo(0, 0);
                        this.source = caller;
                        if (caller === 'next') {
                            this.goNext();
                        }
                    } else {
                        this.source = null;
                        this.errorMsg = 'Error in updating Instructions';
                        this._preloaderService.hidePreloader();
                    }
                },
                err => {
                    this.source = null;
                    console.log(err);
                    this.errorMsg = 'Error in updating Instructions';
                    this._preloaderService.hidePreloader();
                }
            );
        } else {
            if (caller === 'next') {
                this.goNext();
            }
        }
    }

    goNext() {
        this._router.navigate(['/pms/configure/schedule']);
    }
}
