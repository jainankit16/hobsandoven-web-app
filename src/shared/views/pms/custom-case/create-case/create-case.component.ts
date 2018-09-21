import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, AfterContentInit, ElementRef, ChangeDetectorRef } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PreloaderService } from '../../../../services/preloader.service';
import { jobLocationMapService } from '../../../../services/pms/job-location.service';
import { AppStateService } from '../../../../services/app-state.service';
import { SharedService } from '../../../../services/pms/shared.services';

import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RightPanelComponent } from './right-panel/right-panel.component';

import { AccountApi, ProjectApi, JobsiteApi, Case, CaseApi, WorkOrderApi, MetroVirtualVendorPoolApi } from '../../../../sdk';

@Component({
    templateUrl: './create-case.component.html',
    styleUrls: ['./create-case.component.css']
})

export class CreateCaseComponent implements OnInit, OnDestroy, AfterContentInit {

    selectedAccountId: string;
    @ViewChild(ProgressBarComponent) progressBar: ProgressBarComponent;
    @ViewChild(RightPanelComponent) rightPanel: RightPanelComponent;
    @ViewChild('calulateLeftWidth') elementView: ElementRef;
    userState: any;
    customCaseForm: FormGroup;
    isFilled: any;
    isCollapsed = true;
    isSubmitted = false;
    customCase: any;
    mins: string[];
    hours: string[];
    tlevels: string[];
    ppms: number[];
    stypes: string[];
    ttypes: string[];
    programs: any[];
    locnames: any[];
    slas: string[];
    isPrescheduled = false;
    recordTypeId: string;
    accountName = '';
    accountID = '';
    isProgrameCode = false;
    isEditable = true;
    incidenceType = 'Standard Incident Service Profile: Use Default Service Item Request';
    isError = false;
    talentType: string;
    selectedProgram = {};
    formData: any;
    geoMetro: any;
    statusJobsite: string;
    desText = '';
    sumText = '';
    dateSelected: Date;
    instText = '';
    className = true;
    todaysDate = new Date();
    subscription: Subscription;
    calulatedWidthForScroll2: any;
    editorInstance: any;
    standardDisabled = true;
    extendedDisabled = true;
    activeIds = ['accountInfo', 'caseContact', 'caseDetails', 'caseProfile', 'appointment'];
    selectedSchedule = '3';
    editorModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
               [{ 'align': [] }],

                      ['link', 'image']                         // link and image, video
        ]
    };
    headTitle = 'New Dispatch FSE Order Request Form (Customersite)';
    minDate: Date;

    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private _preloaderService: PreloaderService,
        private _sharedService: SharedService,
        private _jobLocationMapService: jobLocationMapService,
        private _appState: AppStateService,
        private _accountApi: AccountApi,
        private _caseApi: CaseApi,
        private _workOrderApi: WorkOrderApi,
        private _projectApi: ProjectApi,
        private _jobsiteApi: JobsiteApi,
        private _metroVirtualVendorPoolApi: MetroVirtualVendorPoolApi
    ) { }

    ngOnInit() {
        this.selectedAccountId = this._appState.getSelectedAccount();
        this.subscription = this._sharedService.getUserState().subscribe(user => {
            if (user && user.partner && user.partner.sfdcId) {
                if (this.selectedAccountId !== user.partner.sfdcId) {
                    this.selectedAccountId = user.partner.sfdcId;
                    this._appState.setSelectedAccount(user.partner.sfdcId);
                    this.resetForm();
                }
                this.loadAccountDetail();
            }
        });
        this.mins = ['--None--', '00', '15', '30', '45'];
        this.hours = ['--None--', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13',
            '14', '15', '16', '19', '18', '19', '20', '21', '22', '23'];
        this.recordTypeId = '0121a0000006QkA';
        this.minDate = new Date((this.todaysDate.getMonth() + 1) + '-' + this.todaysDate.getDate() + '-' + this.todaysDate.getFullYear());
        this.createForm();
        this.initProgressObj();
        window.scrollTo(0, 0);
    }

    setTodaysDate() {
        this.customCaseForm.get('CustomerAppointment_Schedule_StartDate__c')
            .setValue(this.todaysDate);
        this.onAppointmentChange();
    }

    onDateChange() {
        this.onAppointmentChange();
    }

    initProgressObj() {
        this.isFilled = {
            program: false,
            contact: false,
            case: false,
            profile: false,
            appointment: false,
            files: false,
            confirm: false,
            submit: false
        };
    }

    loadAccountDetail() {
        if (this.selectedAccountId) {
            this._preloaderService.showPreloader();
            this._accountApi.find({
                where: { sfdcId: this.selectedAccountId }
            }).subscribe(
                data => {
                    if (data && data.length) {
                        this.accountID = data[0]['Service_Global_Ref__c'];
                        this.accountName = data[0]['Name'];
                        this.userState = { partner: { name: this.accountName }, program: {} }
                        this._sharedService.setUserState(this.userState);
                        this.loadPrograms();
                    }
                },
                err => {
                    this._preloaderService.hidePreloader();
                }
            );
        }
    }

    loadPrograms() {
        this._projectApi.getMasterProjects({
            'accountId': this.selectedAccountId,
            'fields': ['sfdcId', 'Name', 'Project__c', 'Service_Technical_Level__c', 'Service_Dispatch_SLA_Priority__c',
                'Talent_Type__c', 'Customer_Service_Type__c', 'Partner_Pricelist__c', 'SOW_Description_Customer_Long__c',
                'Description__c', 'Required_Tools__c', 'Special_Service_Instructions__c'],
            'order': 'Project__c ASC'
        }).subscribe(
            data => {
                this.customCaseForm.get('Jobsite__c').setValue('-1');
                if (data && data.programs && data.programs.length) {
                    this.programs = data.programs;
                    this.customCaseForm['controls']['Project_SOP__c'].setValue(data.programs[0]['sfdcId']);
                    this.onProgramChange(0);
                } else {
                    this.programs = [];
                    this.locnames = [];
                    this.isFilled.profile = false;
                    this.progressBar.onDataChanges();
                }
                this._preloaderService.hidePreloader();
            },
            err => {
                this.handlerForNoData();
            }
        );
    }

    onProgramChange(e) {
        const programId = e ? e.target.value : this.customCaseForm.controls['Project_SOP__c'].value;
        this.programs.filter(item => {
            if (item.sfdcId === programId) {
                this.selectedProgram = item;
            }
        })
        this.formData = { program: this.selectedProgram };
        this.rightPanel.onDataChanges();
        this.userState.program['programReferCode'] = this.selectedProgram['Project__c'];
        this.userState.program['programSFId'] = this.selectedProgram['sfdcId'];
        this.userState.program['programName'] = this.selectedProgram['Name'];
        if (programId !== '-1') {
            this.isFilled['program'] = true;
            this.loadJobsiteData();
            this.customCaseForm.get('Jobsite__c').setValue('-1');
        } else {
            this.locnames = [];
            this.isFilled['program'] = false;
            this.ppms = [];
            this.customCaseForm.get('PPE_Hours__c').setValue('');
        }
        this.tlevels = [];
        this.slas = [];
        this.ttypes = [];
        this.stypes = [];
        this.incidenceType = 'Standard Incident Service Profile: Use Default Service Item Request';
        this.className = true;
        this.isFilled.profile = false;
        this.progressBar.onDataChanges();

    }

    loadJobsiteData() {
        const projectSfdc = this.customCaseForm.controls['Project_SOP__c'].value;
        if (projectSfdc) {
            this._preloaderService.showPreloader();
            this._jobsiteApi.getJobsitesByMasterProject({
                'programId': projectSfdc,
                fields: ['GEO_Metro__c', 'Jobsite_ID__c', 'Name', 'Country__c', 'State__c', 'Zip__c', 'City__c', 'Street__c',
                    'Jobsite_Description__c', 'Jobsite_Status__c', 'geolocation__Latitude__s', 'geolocation__Longitude__s', 'Type__c',
                    'Jobsite_Approval_Status__c', 'sfdcId', 'Jobsite__c', 'Jobsite_Key_Contact__c', 'id', 'Account__c'],
                source: 'list-jobsites-contact',
                order: 'Name'
            }).subscribe(data => {
                if (data.data.totalCount > 0) {
                    this.userState.program['jobsiteCount'] = data.data.totalCount;
                    this._sharedService.setUserState(this.userState);
                    this.locnames = data.data.jobsites;
                    this._preloaderService.hidePreloader();
                } else {
                    this.locnames = [];
                    this.userState.program['jobsiteCount'] = 0;
                    this._sharedService.setUserState(this.userState);
                    this.handlerForNoData();
                }
                this._jobLocationMapService.setJobLocations(this.locnames)
            },
                err => {
                    this.handlerForNoData();
                });
        }
    }

    handlerForNoData() {
        this._preloaderService.hidePreloader();
    }

    onJobsiteSelection(e) {
        if (e.target.value !== '-1') {
            this.isFilled.profile = true;
            this.isFilled.files = true;
            this.progressBar.onDataChanges();
            this.fillDropdownValues(e.target.value);
            this.ppms = [2, 4, 6, 8];
            this.customCaseForm.get('PPE_Hours__c').setValue('2');
        } else {
            this._jobLocationMapService.setJobLocations(this.locnames)
            this.ppms = [];
            this.customCaseForm.get('PPE_Hours__c').setValue('');
            this.isFilled.profile = false;
            this.isFilled.files = false;
            this.progressBar.onDataChanges();
            this.tlevels = [];
            this.slas = [];
            this.ttypes = [];
            this.stypes = [];
        }
        this.incidenceType = 'Standard Incident Service Profile: Use Default Service Item Request';
        this.className = true;
    }

    fillDropdownValues(jobsiteSfdcId) {
        this.locnames.filter(item => {
            if (item.sfdcId === jobsiteSfdcId) {
                this._jobLocationMapService.setJobLocations([item])
                this.geoMetro = { sfdcId: item.GEO_Metro__c, country: item.GeoMetro.GEO_Country__c };
                if (item.Jobsite_Approval_Status__c !== null) {
                    this.statusJobsite = item.Jobsite_Status__c + ' (' + item.Jobsite_Approval_Status__c + ')';
                } else {
                    this.statusJobsite = item.Jobsite_Status__c;
                }
            }
        })
        this._preloaderService.showPreloader();
        this._metroVirtualVendorPoolApi.getDropdownValues({
            'geoMetroId': this.geoMetro.sfdcId
        }).subscribe(
            data => {
                if (data.data) {
                    this.tlevels = data.data.TechnicalLevels;
                    data.data.SLAs.splice(data.data.SLAs.length - 1, 1);
                    this.slas = data.data.SLAs.filter(item => {
                        return (item !== 'P0 (SBD2H)' && item !== 'P2 (SBD6H)')
                    })
                    // this.slas = data.data.SLAs;
                    this.ttypes = data.data.TalentTypes;
                    this.stypes = ['Desk-side Support', 'IMAC', 'Break/Fix Service'];
                    this.selectStandardProfileOptions();
                    this.getDataForRightPanel(jobsiteSfdcId, this.geoMetro);
                }
            },
            err => {
                this._preloaderService.hidePreloader();
            }
        )
    }

    getDataForRightPanel(jobsiteSfdcId, geoMetro) {
        this._preloaderService.showPreloader();
        const reqObj = {
            jobsiteId: jobsiteSfdcId,
            priceListId: this.selectedProgram['Partner_Pricelist__c'],
            geoMetroObj: geoMetro,
            talentTypeId: this.customCaseForm.controls['Talent_Type_ref__c'].value,
            technicalLevel: this.customCaseForm.controls['Service_Technical_Level__c'].value,
            sla: this.customCaseForm.controls['Dispatch_SLA_Priority__c'].value,
            coverage: this.customCaseForm.controls['Coverage_Hours__c'].value
        }
        this._caseApi.getDataForCustomCase(reqObj).subscribe(
            result => {
                this.formData = {
                    program: this.selectedProgram,
                    caseDetail: result.res,
                    profileInfo: {
                        type: this.customCaseForm.controls['incidenceType'].value,
                        serviceType: this.customCaseForm.controls['Customer_Service_Type__c'].value,
                        talentType: this.talentType,
                        technicalLevel: reqObj.technicalLevel,
                        sla: reqObj.sla,
                        coverage: reqObj.coverage,
                        ppm: this.customCaseForm.controls['PPE_Hours__c'].value
                    },
                    caseInfo: this.formData['caseInfo']
                }
                this.rightPanel.onDataChanges();
                this._preloaderService.hidePreloader();
            },
            err => {
                this._preloaderService.hidePreloader();
            }
        )
    }

    onProfileChange() {
        this.standardDisabled = true;
        this.extendedDisabled = false;
        const jobsiteSfdcId = this.customCaseForm.controls['Jobsite__c'].value;
        if (this.customCaseForm.controls['Dispatch_SLA_Priority__c'].value === 'P1 (SBD4H)') {
            this.standardDisabled = false;
        } else {
            this.customCaseForm.controls['Coverage_Hours__c'].setValue('9H5D');
        }
        if (this.customCaseForm.controls['Jobsite__c'].value !== '-1') {
            this.getDataForRightPanel(jobsiteSfdcId, this.geoMetro);
        }
    }

    onIncidenceTypeChange(isReset = false) {
        if (this.customCaseForm.controls['incidenceType'].value === 'Custom Incident Service Profile: Create Custom Service Item Request') {
            this.customCaseForm.controls['Customer_Service_Type__c'].enable({ onlySelf: true });
            this.customCaseForm.controls['Talent_Type_ref__c'].enable({ onlySelf: true });
            this.customCaseForm.controls['Service_Technical_Level__c'].enable({ onlySelf: true });
            this.customCaseForm.controls['Dispatch_SLA_Priority__c'].enable({ onlySelf: true });
            // this.customCaseForm.controls['Coverage_Hours__c'].enable({ onlySelf: true });
            this.extendedDisabled = false;
            this.recordTypeId = '0121a0000006RM1';
            this.incidenceType = 'Custom Incident Service Profile: Create Custom Service Item Request';
            this.className = false;
            if (!isReset) {
                this.onProfileChange();
            }
        } else {
            this.disableProfileDropdown();
            this.standardDisabled = true;
            this.extendedDisabled = true;
            this.recordTypeId = '0121a0000006QkA';
            this.incidenceType = 'Standard Incident Service Profile: Use Default Service Item Request';
            if (this.customCaseForm.controls['Jobsite__c'].value !== '-1' && !isReset) {
                this.fillDropdownValues(this.customCaseForm.controls['Jobsite__c'].value);
            }
            this.className = true;
        }
    }

    disableProfileDropdown() {
        this.customCaseForm.controls['Customer_Service_Type__c'].disable({ onlySelf: true });
        this.customCaseForm.controls['Talent_Type_ref__c'].disable({ onlySelf: true });
        this.customCaseForm.controls['Service_Technical_Level__c'].disable({ onlySelf: true });
        this.customCaseForm.controls['Dispatch_SLA_Priority__c'].disable({ onlySelf: true });
    }

    selectStandardProfileOptions() {
        this.customCaseForm.controls['Customer_Service_Type__c'].setValue(this.selectedProgram['Customer_Service_Type__c']);
        this.customCaseForm.get('Coverage_Hours__c').setValue('9H5D');
        if (this.selectedProgram['Talent_Type__c']) {
            this.customCaseForm.controls['Talent_Type_ref__c'].setValue(this.selectedProgram['Talent_Type__c']);
            this.ttypes.filter(item => {
                if (item['sfdcId'] === this.customCaseForm.controls['Talent_Type_ref__c'].value) {
                    this.talentType = item['Talent_Type_Name__c'];
                }
            })
        } else {
            this.customCaseForm.controls['Talent_Type_ref__c'].setValue('a2F1a000000ZJ6wEAG');
            this.talentType = 'Field Service EUC Deskside Support';
        }
        if (this.selectedProgram['Service_Technical_Level__c']) {
            this.customCaseForm.controls['Service_Technical_Level__c'].setValue(this.selectedProgram['Service_Technical_Level__c']);
        } else {
            this.customCaseForm.controls['Service_Technical_Level__c'].setValue('L1');
        }
        if (this.selectedProgram['Service_Dispatch_SLA_Priority__c']) {
            this.customCaseForm.controls['Dispatch_SLA_Priority__c'].setValue(this.selectedProgram['Service_Dispatch_SLA_Priority__c']);
        } else {
            this.customCaseForm.controls['Dispatch_SLA_Priority__c'].setValue('P1 (SBD4H)');
        }
        this.disableProfileDropdown();
    }

    createForm() {
        this.customCaseForm = this.fb.group({
            accountName: { value: '', disabled: true },
            AccountId: { value: '', disabled: true },
            Partner_Case_Number__c: ['', [Validators.required]],
            Case_Summary__c: ['', Validators.required],
            Description: ['', Validators.required],
            X3PS_Vendor_Special_Instructions__c: '',
            Custom_work_order_instructions__c: '',
            Project_SOP__c: ['-1', Validators.required],
            incidenceType: 'Standard Incident Service Profile: Use Default Service Item Request',
            Jobsite__c: ['-1', Validators.required],
            Ship_to_Contact_Name__c: ['', Validators.required],
            Ship_To_Contact_Email_Address__c: ['', [Validators.required, Validators.email]],
            Ship_to_Contact_Phone_Number__c: ['', Validators.required],
            Customer_Service_Type__c: [{ value: '', disabled: true }, Validators.required],
            Talent_Type_ref__c: [{ value: '', disabled: true }, Validators.required],
            Coverage_Hours__c: [{ value: '9H5D', disabled: true }, Validators.required],
            Service_Technical_Level__c: [{ value: '', disabled: true }, Validators.required],
            PPE_Hours__c: ['2', Validators.required],
            Dispatch_SLA_Priority__c: [{ value: '', disabled: true }, Validators.required],
            Appointment_Schedule_Information__c: [
                'Pre-Scheduled Appointment(Enter Date/Time (Local Time Zone) below)',
                Validators.required
            ],
            CustomerAppointment_Schedule_StartDate__c: ['', Validators.required],
            Appointment_Schedule_Start_hour__c: ['00', Validators.required],
            Appointment_Schedule_Start_Minute__c: ['00', Validators.required]
        });
        const subscription = this.customCaseForm.get('Appointment_Schedule_Information__c').valueChanges.subscribe(
            (val: string) => {
                if (val === 'Pre-Scheduled Appointment(Enter Date/Time (Local Time Zone) below)') {
                    this.customCaseForm.get('CustomerAppointment_Schedule_StartDate__c').setValidators([Validators.required]);
                    this.customCaseForm.get('Appointment_Schedule_Start_hour__c').setValidators([Validators.required]);
                    this.customCaseForm.get('Appointment_Schedule_Start_Minute__c').setValidators([Validators.required]);
                } else {
                    this.customCaseForm.get('CustomerAppointment_Schedule_StartDate__c').clearValidators();
                    this.customCaseForm.get('Appointment_Schedule_Start_hour__c').clearValidators();
                    this.customCaseForm.get('Appointment_Schedule_Start_Minute__c').clearValidators();
                }
                this.customCaseForm.get('CustomerAppointment_Schedule_StartDate__c').updateValueAndValidity();
                this.customCaseForm.get('Appointment_Schedule_Start_hour__c').updateValueAndValidity();
                this.customCaseForm.get('Appointment_Schedule_Start_Minute__c').updateValueAndValidity();
            }
        )
        this.subscription.add(subscription);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        if (this.userState && this.userState.program) {
            this.userState.program = {};
        }
        this._sharedService.setUserState(this.userState);
    }

    isContactValid() {
        if (this.customCaseForm.controls['Ship_to_Contact_Name__c'].value &&
            this.customCaseForm.controls['Ship_To_Contact_Email_Address__c'].value &&
            this.customCaseForm.controls['Ship_to_Contact_Phone_Number__c'].value
        ) {
            this.isFilled.contact = true;
            this.progressBar.onDataChanges();
        } else {
            this.isFilled.contact = false;
            this.progressBar.onDataChanges();
        }
        if (this.customCaseForm.controls['Partner_Case_Number__c'].value &&
            this.customCaseForm.controls['Case_Summary__c'].value &&
            this.customCaseForm.controls['Description'].value
        ) {
            this.isFilled.case = true;
            this.progressBar.onDataChanges();
        } else {
            this.isFilled.case = false;
            this.progressBar.onDataChanges();
        }
        if (!this.formData) {
            this.formData = {};
        }
        this.formData['caseInfo'] = {
            Partner_Case_Number__c: this.customCaseForm.controls['Partner_Case_Number__c'].value,
            Ship_to_Contact_Name__c: this.customCaseForm.controls['Ship_to_Contact_Name__c'].value,
            Ship_To_Contact_Email_Address__c: this.customCaseForm.controls['Ship_To_Contact_Email_Address__c'].value,
            Ship_to_Contact_Phone_Number__c: this.customCaseForm.controls['Ship_to_Contact_Phone_Number__c'].value
        }
        this.rightPanel.onDataChanges();
    }

    setTalentType(e) {
        if (e.target && e.target.selectedOptions[0].text) {
            this.talentType = e.target.selectedOptions[0].text;
        }
        this.onProfileChange();
    }

    disableDefaultFields() {
        this.customCaseForm.controls['AccountId'].disable({ onlySelf: true });
        this.customCaseForm.controls['accountName'].disable({ onlySelf: true });
    }

    addBindingCreated(quillInstance) {
        this.editorInstance = quillInstance;
    }

    confirmSubmission(isTrue: boolean) {
        if (this.customCaseForm.status !== 'INVALID') {
            if (isTrue) {
                this.isFilled.confirm = false;
                this.customCaseForm.enable();
                this.onIncidenceTypeChange(true);
                this.editorInstance.enable(true);
                this.disableDefaultFields();
                this.dateSelected = null;
            } else {
                this.isFilled.confirm = true;
                this.setSelectedDate();
                this.isError = false;
                this.editorInstance.enable(false);
                this.customCaseForm.disable();
                window.scrollTo(0, 0);
                this.activeIds.push('caseDetailsAdd');
            }
            this.progressBar.onDataChanges();
            this.isEditable = isTrue;

        }
    }

    setSelectedDate() {
        if (this.customCaseForm.get('Appointment_Schedule_Information__c').value ===
            'Pre-Scheduled Appointment(Enter Date/Time (Local Time Zone) below)') {
            this.dateSelected = this.customCaseForm.get('CustomerAppointment_Schedule_StartDate__c').value;
            this.dateSelected.setHours(this.customCaseForm.get('Appointment_Schedule_Start_hour__c').value,
                this.customCaseForm.get('Appointment_Schedule_Start_Minute__c').value)
        } else {
            this.dateSelected = null;
        }
    }

    onSubmit() {
        if (this.customCaseForm.status !== 'INVALID') {
            this.customCase = this.customCaseForm.getRawValue();
            this.customCase.AccountId = this.selectedAccountId;
            this._preloaderService.showPreloader();
            if (this.customCaseForm.controls['incidenceType'].value === 'Standard Incident Service Profile: Use Default Service Item Request') {
                this.customCase.RecordTypeId = this.recordTypeId;
                delete (this.customCase['accountName']);
                delete (this.customCase['incidenceType']);
                this.customCase.Talent_Type__c = this.talentType;
                this._caseApi.createCaseForStandard({
                    case: this.customCase,
                    accountId: this.accountID,
                    accountName: this.accountName
                }).subscribe(res => {
                    if (res) {
                        this.isSubmitted = true;
                        this.isError = false;
                        this.isFilled.submit = true;
                        this.progressBar.onDataChanges();
                        this._preloaderService.hidePreloader();
                        window.scrollTo(0, 0);
                    }
                }, err => {
                    if (err) {
                        this.isError = true;
                        this.isSubmitted = false;
                        this.isFilled.confirm = false;
                        this.isEditable = true;
                        this.customCaseForm.enable();
                        this.onIncidenceTypeChange(true);
                        this.disableDefaultFields();
                        window.scrollTo(0, 0);
                    }
                    this._preloaderService.hidePreloader();
                })
            } else {
                this.createWorkOrder();
            }
        }
    }

    resetForm() {
        this.isSubmitted = false;
        this.isError = false;
        this.isEditable = true;
        this.customCaseForm.enable();
        this.customCaseForm.reset();
        this.initProgressObj();
        this.customCaseForm.get('Appointment_Schedule_Start_hour__c').setValue('00');
        this.customCaseForm.get('Appointment_Schedule_Start_Minute__c').setValue('00');
        this.customCaseForm.get('Jobsite__c').setValue('-1');
        this.customCaseForm.get('PPE_Hours__c').setValue('2');
        this.customCaseForm.get('Coverage_Hours__c').setValue('9H5D');
        this.customCaseForm.get('Project_SOP__c').setValue('-1');
        this.customCaseForm.get('accountName').disable({ onlySelf: true });
        this.customCaseForm.get('AccountId').disable({ onlySelf: true });
        this.customCaseForm.get('incidenceType').setValue('Standard Incident Service Profile: Use Default Service Item Request');
        this.customCaseForm.get('Appointment_Schedule_Information__c')
            .setValue('Pre-Scheduled Appointment(Enter Date/Time (Local Time Zone) below)');
        this.onIncidenceTypeChange();
        this.formData = {};
        this.rightPanel.onDataChanges();
        if (this.userState && this.userState.program) {
            this.userState.program = {};
        }
        this._sharedService.setUserState(this.userState);
    }

    createWorkOrder() {
        if (this.customCase && this.formData.caseDetail && Object.keys(this.formData.caseDetail.productDetail).length) {
            if (this.dateSelected) {
                this.customCase['Customer_Appointment_DateTime_Scheduled__c'] = this.dateSelected;
                this.customCase['Worker_Arrival_DateTime_Cust_Requested__c'] = this.dateSelected;
            }
            this._workOrderApi.createWorkOrder({
                case: this.customCase,
                workorderitem: this.formData.caseDetail,
                program: this.formData.program,
                accountId: this.accountID,
                accountName: this.accountName
            }).subscribe(res => {
                if (res) {
                    this.isSubmitted = true;
                    this.isError = false;
                    this.isFilled.submit = true;
                    this.progressBar.onDataChanges();
                    this._preloaderService.hidePreloader();
                    window.scrollTo(0, 0);
                }
            }, err => {
                if (err) {
                    this.isError = true;
                    this.isSubmitted = false;
                    this._preloaderService.hidePreloader();
                    window.scrollTo(0, 0);
                }
            })
        } else {
            this.isSubmitted = false;
            this.isError = true;
            window.scrollTo(0, 0);
        }
    }

    onWindowsScrollTop2() {
        document.querySelector(
            '.table-wrapper-bottom-Account'
        ).scrollLeft = document.querySelector('.table-wrapper-top-Account').scrollLeft;
    }
    onWindowsScrollBottom2() {
        document.querySelector(
            '.table-wrapper-top-Account'
        ).scrollLeft = document.querySelector('.table-wrapper-bottom-Account').scrollLeft;
    }

    ngAfterContentInit() {
        this.calulatedWidthForScroll2 = 600 + 'px';
        this.detectChanges()
    }
    detectChanges() {
        if (!this.cd['destroyed']) {
            this.cd.detectChanges();
        }
    }

    onScheduleChange(value) {
        this.selectedSchedule = value;

        this.customCaseForm.get('CustomerAppointment_Schedule_StartDate__c').setValue('');
        this.customCaseForm.get('Appointment_Schedule_Start_hour__c').setValue('00');
        this.customCaseForm.get('Appointment_Schedule_Start_Minute__c').setValue('00');

        if (this.selectedSchedule === '1') {
            this.isFilled['appointment'] = true;
            this.progressBar.onDataChanges();
        }

        if (this.selectedSchedule === '3') {
            if (
                this.customCaseForm.get('CustomerAppointment_Schedule_StartDate__c').value !== '' &&
                this.customCaseForm.get('Appointment_Schedule_Start_hour__c').value !== '--None--' &&
                this.customCaseForm.get('Appointment_Schedule_Start_Minute__c').value !== '--None--'
            ) {
                this.isFilled['appointment'] = true;
                this.progressBar.onDataChanges();
            } else {
                this.isFilled['appointment'] = false;
                this.progressBar.onDataChanges();
            }
        }
    }

    onAppointmentChange() {
        if (
            this.customCaseForm.get('CustomerAppointment_Schedule_StartDate__c').value !== '' &&
            this.customCaseForm.get('Appointment_Schedule_Start_hour__c').value !== '--None--' &&
            this.customCaseForm.get('Appointment_Schedule_Start_Minute__c').value !== '--None--'
        ) {
            this.isFilled['appointment'] = true;
            this.progressBar.onDataChanges();
        } else {
            this.isFilled['appointment'] = false;
            this.progressBar.onDataChanges();
        }
    }
}
