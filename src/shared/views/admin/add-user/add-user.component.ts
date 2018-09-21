import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersApi, ProjectApi, FilterServiceApi, RecordTypeApi } from './../../../sdk';

import { PreloaderService } from './../../../services/preloader.service';
import { AlertService } from './../../../services/alert.service';
import { AppStateService } from '../../../services/app-state.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

    registrationForm: FormGroup;
    formErrors = {};
    validationMessages = {};

    currentUser: any;
    modelList: any;
    currentAccountId: any;
    selectedAccount: any;
    selectedPartnerId: any;
    currentAccessType: any;
    currentMemberType: String;
    headerTxt = 'Add New User Member';
    viewMode = 'add';
    viewId = '';
    viewType = 'user';
    memberRoleIds = [];

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _alertService: AlertService,
        private _filterServiceApi: FilterServiceApi,
        private _usersApi: UsersApi,
        private _projectApi: ProjectApi,
        private _recordTypeApi: RecordTypeApi
    ) {
        this._route.params.subscribe(params => {
            if (this._router.url.indexOf('view') !== -1) {
                this.viewMode = 'view';
            } else if (this._router.url.indexOf('update') !== -1) {
                this.viewMode = 'update';
            }
            if (params['userId']) {
                this.viewId = params['userId'];
            }
            if (this._route.snapshot.queryParams && this._route.snapshot.queryParams['type']) {
                this.viewType = this._route.snapshot.queryParams['type'];
            }
        });

        this.modelList = {
            'account': [],
            'partner': [],
            'userType': [],
            'country': [],
            'department': [],
            'departmentRole': [],
            'region': [],
            'group': [],
            'workerShift': [],
            'functionalRole': [],
            'functionalRoleLevel': [],
            'Program': []
        };
    }

    ngOnInit() {
        this.currentAccountId = this._appState.getSelectedAccount();
        this.currentAccessType = this._appState.getAccessType();
        this.initialLoad();
    }

    initialLoad() {
        // create form and enable/disable fields according to the view mode
        this.createForms();
        if (this.viewMode !== 'view') {
            this.setFormErrors();
        }
        // load dropdown values
        this.getDropdownValues();
    }

    createForms() {
        const disabled = this.viewMode === 'view' ? true : false;
        const emailPattern = /\S+@\S+\.\S+/;
        let accountValidator: any;
        let passwordValidator: any;
        let cnfPasswordValidator: any;
        let userTypeValidator: any;

        if (this.currentAccessType === 'internal') {
            accountValidator = Validators.compose([Validators.required]);
        }
        if (this.viewType === 'user') {
            userTypeValidator = Validators.compose([Validators.required]);
            if (this.viewMode === 'add') {
                passwordValidator = Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(35)]);
                cnfPasswordValidator = Validators.compose([Validators.required, this.passwordconfirmation]);
            }
        }

        this.registrationForm = this._fb.group({
            account_Type: [{ value: '', disabled: disabled }, accountValidator],
            first_Name: [
                { value: '', disabled: disabled },
                [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
            ],
            last_Name: [
                { value: '', disabled: disabled },
                [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
            ],
            phone_number: [
                { value: '', disabled: disabled },
                [Validators.required, Validators.pattern('[0-9\+\-\]+'), Validators.maxLength(20)]
            ],
            email: [
                { value: '', disabled: this.viewMode !== 'add' ? true : false },
                [Validators.required, Validators.pattern(emailPattern), Validators.maxLength(100)]
            ],
            job_title: [
                { value: '', disabled: disabled },
                [Validators.required, Validators.minLength(4), Validators.maxLength(40)]
            ],
            department: [{ value: '', disabled: disabled }, [Validators.required]],
            country: [{ value: '', disabled: disabled }, [Validators.required]],
            user_Type: [{ value: '', disabled: disabled }, userTypeValidator],
            password: [{ value: '', disabled: disabled }, passwordValidator],
            confirm_password: [{ value: '', disabled: disabled }, cnfPasswordValidator],
            functional_role: [{ value: '', disabled: disabled }, [Validators.required]],
            functional_level: [{ value: '', disabled: disabled }, [Validators.required]],
            regional_role: [{ value: '', disabled: disabled }, [Validators.required]],
            shift_work_hours: [{ value: '', disabled: disabled }, [Validators.required]],
            notify_user: [true],
            password_reset: [true],
            partner: [this.selectedPartnerId],
            department_role: this._fb.array([]),
            program: this._fb.array([])
        });
        this.registrationForm.valueChanges.subscribe(data => this.onFormChanged(data));
    }

    setFormErrors() {
        this.formErrors = {
            'account_Type': '',
            'first_Name': '',
            'last_Name': '',
            'phone_number': '',
            'email': '',
            'job_title': '',
            'department': '',
            'country': '',
            'user_Type': '',
            'password': '',
            'confirm_password': '',
            'functional_role': '',
            'functional_level': '',
            'regional_role': '',
            'shift_work_hours': ''
        };
        this.validationMessages = {
            'account_Type': {
                'required': 'Account Type is required.'
            },
            'first_Name': {
                'required': 'First name is required.',
                'minlength': 'First name must be at least 4 characters long.',
                'maxlength': 'First name cannot be more than 20 characters long.'
            },
            'last_Name': {
                'required': 'Last name is required.',
                'minlength': 'Last name must be at least 4 characters long.',
                'maxlength': 'Last name cannot be more than 20 characters long.'
            },
            'phone_number': {
                'required': 'Phone number is required.',
                'pattern': 'Phone number is invalid.',
                'maxlength': 'Phone number cannot be more than 20 number long.'
            },
            'email': {
                'required': 'E-mail is required.',
                'pattern': 'E-mail is invalid.',
                'maxlength': 'E-mail cannot be more than 100 characters long.'
            },
            'job_title': {
                'required': 'Job title is required.',
                'minlength': 'Job title must be at least 4 characters long.',
                'maxlength': 'Job title cannot be more than 40 characters long.'
            },
            'department': {
                'required': 'Department is required.',
            },
            'country': {
                'required': 'Country is required.',
            },
            'user_Type': {
                'required': 'User Type is required.'
            },
            'password': {
                'required': 'Password is required.',
                'minlength': 'Password must be at least 4 characters long.',
                'maxlength': 'Password cannot be more than 35 characters long.'
            },
            'confirm_password': {
                'required': 'Confirm password is required.',
                'invalid': 'Password do not match!'
            },
            'functional_role': {
                'required': 'Functional role is required.'
            },
            'functional_level': {
                'required': 'Functional role level is required.'
            },
            'regional_role': {
                'required': 'Regional role is required.'
            },
            'shift_work_hours': {
                'required': 'Shift work hours - global shift equivalent schedule (GSES) is required.'
            },
        };
    }

    getDropdownValues() {
        this._preloaderService.showPreloader();
        const paramObj = {};
        paramObj['models'] = ['Account', 'Partner', 'UserType', 'Country', 'Department', 'Region', 'Group', 'WorkerShift',
            'FunctionalRole', 'FunctionalRoleLevel'];
        if (this.currentAccessType !== 'internal') {
            paramObj['accountId'] = this.currentAccountId;
        }
        // get data for filters
        this._filterServiceApi.getAllFiltersData(paramObj).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    // accounts
                    if (data['accounts'] && data['accounts']['list']) {
                        this.modelList.account = data['accounts']['list'];
                        this.setCurrentAccount(this.modelList.account, this.currentAccountId);
                        this.setMemberType();
                    }
                    // department
                    if (data['department'] && data['department']['list']) {
                        this.modelList.department = data['department']['list'];
                        this.modelList.departmentRole = data['department']['list'];
                        this.setFormArray(this.modelList.departmentRole, 'department_role');
                    }
                    // partners
                    if (data['partners'] && data['partners']['list']) {
                        this.modelList.partner = data['partners']['list'];
                        this.selectedPartnerId = '';
                        if (this.modelList.partner.length) {
                            this.selectedPartnerId = this.modelList.partner[0].sfdcId;
                        }
                        this.getMasterProgram(this.selectedPartnerId, true);
                    }
                    // userTypes
                    if (data['userTypes'] && data['userTypes']['list']) {
                        this.modelList.userType = data['userTypes']['list'];
                    }
                    // countrys
                    if (data['countries'] && data['countries']['list']) {
                        this.modelList.country = data['countries']['list'];
                    }
                    // department roll this is not implemented
                    if (data['departmentRoles'] && data['departmentRoles']['list']) {
                        this.modelList.departmentRole = data['departmentRoles']['list'];
                    }
                    // region
                    if (data['regions'] && data['regions']['list']) {
                        this.modelList.region = data['regions']['list'];
                    }
                    // group
                    if (data['groups'] && data['groups']['list']) {
                        this.modelList.group = data['groups']['list'];
                    }
                    // workerShift
                    if (data['workerShifts'] && data['workerShifts']['list']) {
                        this.modelList.workerShift = data['workerShifts']['list'];
                    }
                    // functionalRoles
                    if (data['functionalRoles'] && data['functionalRoles']['list']) {
                        this.modelList.functionalRole = data['functionalRoles']['list'];
                    }
                    // functionalRoleLevel
                    if (data['functionalRoleLevels'] && data['functionalRoleLevels']['list']) {
                        this.modelList.functionalRoleLevel = data['functionalRoleLevels']['list'];
                    }
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                this._preloaderService.hidePreloader();
            }
        );
    }

    setCurrentAccount(accounts, accountId) {
        if (accounts.length && accountId) {
            for (let i = 0; i < accounts.length; i++) {
                if (this.currentAccountId === accounts[i]['sfdcId']) {
                    this.selectedAccount = accounts[i];
                    break;
                }
            }
        }
    }

    setMemberType() {
        if (this.selectedAccount && this.selectedAccount['RecordTypeId']) {
            this._recordTypeApi.find({
                fields: ['sfdcId', 'Name'],
                where: { 'sfdcId': this.selectedAccount['RecordTypeId'] }
            }).subscribe(
                res => {
                    if (res && res.length) {
                        this.currentMemberType = res[0]['Name'];
                    }
                },
                err => {
                    this._alertService.error(err.message);
                }
            );
        }
    }

    setFormArray(data, control) {
        const arrayItem = data.map(item => {
            const obj = Object.assign({}, item);
            obj.selectedArr = '';
            return this._fb.group(obj)
        });
        const roleItems = this._fb.array(arrayItem);
        this.registrationForm.setControl(control, roleItems);
    }

    getMasterProgram(accountId, onLoad) {
        if (accountId) {
            this._preloaderService.showPreloader();
            this._projectApi.getMasterProjects({ accountId: accountId, fields: ['sfdcId', 'Name', 'Project__c', 'Status__c'] }).subscribe(
                res => {
                    if (res && res.programs) {
                        this.modelList['Program'] = res.programs;
                        this.setProgramRoles(this.modelList['Program']);
                        this.setFormArray(this.modelList['Program'], 'program');
                    }
                    if (onLoad && this.viewMode !== 'add') {
                        this.getCurrentUser(this.viewId);
                    }
                    this._preloaderService.hidePreloader();
                },
                err => {
                    this._preloaderService.hidePreloader();
                }
            )
        } else {
            this.getCurrentUser(this.viewId);
        }
    }

    getCurrentUser(userId) {
        this.currentUser = {};
        this.headerTxt = '';
        if (userId) {
            this._preloaderService.showPreloader();
            const obj = { where: { 'id': userId } };
            if (this.viewType === 'contact') {
                obj['activeTab'] = 'tab-2'
            }
            this._usersApi.getUserList(obj).subscribe(
                res => {
                    if (res && res.length) {
                        this.currentUser = res[0];
                        if (this.viewType === 'contact') {
                            this.currentUser = this.getCurrentContact(res[0]);
                            if (this.viewMode === 'update' && !this.currentUser['email']) {
                                this.registrationForm.controls.email.enable();
                            }
                        }
                        this.headerTxt = this.currentUser['firstname'] + ' ' + this.currentUser['lastname'];
                        this.currentAccountId = this.currentUser['AccountId'];
                        this.setCurrentAccount(this.modelList.account, this.currentAccountId);
                        this.setMemberType();
                        this.setProgramRoles(this.modelList['Program']);
                        this.setDepartmentRoles(this.modelList['departmentRole']);
                        this.setWorkerShift(this.modelList['workerShift']);
                        this.setFormValues();
                    } else {
                        this._alertService.error('No record found for the selected user!');
                    }
                    this._preloaderService.hidePreloader();
                },
                err => {
                    this._alertService.error(err.message);
                    this._preloaderService.hidePreloader();
                }
            );
        }
    }

    getCurrentContact(data) {
        const contact = {};
        contact['AccountId'] = data['AccountId'];
        contact['email'] = data['Email'];
        contact['firstname'] = data['FirstName'];
        contact['lastname'] = data['LastName'];
        contact['memberRoles'] = data['worker'] && data['worker']['memberRoles'] ? data['worker']['memberRoles'] : [];
        contact['departmentRoles'] = data['worker'] && data['worker']['departmentRoles'] ? data['worker']['departmentRoles'] : [];

        contact['profile'] = {};
        contact['profile']['id'] = data['id'];
        contact['profile']['Phone'] = data['Phone'];
        contact['profile']['Department'] = data['Department'];
        contact['profile']['MailingCountry'] = data['MailingCountry'];
        contact['profile']['Title'] = data['Title'];

        contact['profile']['worker'] = {};
        contact['profile']['worker']['id'] = data['worker'] ? data['worker']['id'] : '';
        contact['profile']['worker']['Functional_Role_Level__c'] = data['worker'] ? data['worker']['Functional_Role_Level__c'] : '';
        contact['profile']['worker']['Functional_Role__c'] = data['worker'] ? data['worker']['Functional_Role__c'] : '';
        contact['profile']['worker']['Global_Shift_Equivalent_Schedule_GSES__c'] = data['worker'] ?
            data['worker']['Global_Shift_Equivalent_Schedule_GSES__c'] : '';
        contact['profile']['worker']['Regional_Role__c'] = data['worker'] ? data['worker']['Regional_Role__c'] : '';

        return contact;
    }

    setFormValues() {
        this.registrationForm.patchValue({ department_role: this.modelList['departmentRole'] });
        this.registrationForm.patchValue({ program: this.modelList['Program'] });
        this.registrationForm.patchValue({ account_Type: this.currentUser['AccountId'] });
        this.registrationForm.patchValue({ first_Name: this.currentUser['firstname'] });
        this.registrationForm.patchValue({ last_Name: this.currentUser['lastname'] });
        this.registrationForm.patchValue({ email: this.currentUser['email'] });
        this.registrationForm.patchValue({ user_Type: this.currentUser['userTypeId'] });

        if (this.currentUser['profile']) {
            this.registrationForm.patchValue({ phone_number: this.currentUser['profile']['Phone'] });
            this.registrationForm.patchValue({ job_title: this.currentUser['profile']['Title'] });
            this.registrationForm.patchValue({ department: this.currentUser['profile']['Department'] });
            this.registrationForm.patchValue({ country: this.currentUser['profile']['MailingCountry'] });

            if (this.currentUser['profile']['worker']) {
                this.registrationForm.patchValue({
                    functional_role: this.currentUser['profile']['worker']['Functional_Role__c']
                });
                this.registrationForm.patchValue({
                    functional_level: this.currentUser['profile']['worker']['Functional_Role_Level__c']
                });
                this.registrationForm.patchValue({
                    shift_work_hours: this.currentUser['profile']['worker']['Global_Shift_Equivalent_Schedule_GSES__c']
                });
                let role = [];
                if (this.currentUser['profile']['worker']['Regional_Role__c']) {
                    role = this.currentUser['profile']['worker']['Regional_Role__c'].split(';')
                }
                this.registrationForm.patchValue({ regional_role: role });
            }
        }
    }

    passwordconfirmation(c: AbstractControl): any {
        if (!c.parent || !c) { return; }
        const pwd = c.parent.get('password');
        const cpwd = c.parent.get('confirm_password')

        if (!pwd.value || !cpwd.value) { return; }
        if (pwd.value !== cpwd.value) {
            return { invalid: true };
        }
    }

    generatePassword() {
        this._preloaderService.showPreloader();
        this._usersApi.passwordGenerator({ length: 10 }).subscribe(pass => {
            this.registrationForm.controls['password'].setValue(pass)
            this.registrationForm.controls['confirm_password'].setValue(pass)
            this._preloaderService.hidePreloader();
        }, err => {
            this._alertService.warn('Oops! something went wrong.');
            this._preloaderService.hidePreloader();
        }
        )
    }

    clearConfirmPass() {
        this.registrationForm.controls['confirm_password'].setValue(null)
    }

    onFormChanged(data?: any) {
        if (!this.registrationForm) { return; }
        const form = this.registrationForm;
        // tslint:disable-next-line:forin
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                // tslint:disable-next-line:forin
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    onAccountChanged(e) {
        this.currentAccountId = e && e.target && e.target.selectedOptions[0] && e.target.selectedOptions[0].value;
        this.selectedAccount = {};
        this.currentMemberType = '';
        this.setCurrentAccount(this.modelList['account'], this.currentAccountId);
        this.setMemberType();
    }

    onPartnerChanged(e) {
        const partnerId = e && e.target && e.target.selectedOptions[0] && e.target.selectedOptions[0].value;
        if (partnerId) {
            this.getMasterProgram(partnerId, false);
        } else {
            this.modelList['Program'] = [];
            this.setFormArray(this.modelList['Program'], 'program');
        }
    }

    onDepartmentChanged(e) {
        const id = e && e.target && e.target.selectedOptions[0] && e.target.selectedOptions[0].value;
        this.registrationForm.value['department_role'].forEach((item, i) => {
            item.selectedArr = '';
            if (item.sfdcId === id) {
                item.selectedArr = 'Active';
            }
        });
        if (this.viewMode === 'update' && this.currentUser['departmentRoles']) {
            this.currentUser['departmentRoles'].forEach(role => {
                this.registrationForm.value['department_role'].forEach(item => {
                    if (item.sfdcId === role.PgMO_Departments__c) {
                        item.selectedArr = role.Access__c;
                    }
                });
            });
        }
        this.registrationForm.patchValue({ 'department_role': this.registrationForm.value['department_role'] });
    }

    setProgramRoles(programs) {
        // disable selection and show only selected values for program in view mode
        if (this.currentUser && this.currentUser['memberRoles'] && this.currentUser['memberRoles'].length) {
            if (this.viewMode === 'view') {
                const memberRolePrograms = [];
                this.currentUser['memberRoles'].forEach(item => {
                    if (item.Project__c && item.project && this.memberRoleIds.indexOf(item.Project__c) === -1) {
                        memberRolePrograms.push(item.project);
                        this.memberRoleIds.push(item.Project__c);
                    }
                });
                this.modelList['Program'] = memberRolePrograms;
            } else {
                if (!this.memberRoleIds.length) {
                    this.currentUser['memberRoles'].forEach(item => {
                        if (item.Project__c) {
                            this.memberRoleIds.push(item.Project__c);
                        }
                    });
                }
            }
        }
    }

    setDepartmentRoles(departments) {
        // department roles
        if (departments.length && this.currentUser && this.currentUser['departmentRoles']) {
            this.currentUser['departmentRoles'].forEach(item => {
                departments.forEach(department => {
                    if (department.sfdcId === item.PgMO_Departments__c) {
                        department.selectedArr = item.Access__c;
                        department.IsSelected = true;
                    }
                });
            });
        }
        // disable selection and show only selected values for department roles in view mode
        if (this.viewMode === 'view') {
            // const control = <FormArray>this.registrationForm.controls.department_role;
            // for (let i = 0; i < this.registrationForm.value.department_role.length; i++) {
            //     const fg = control.get([i])
            //     fg.get('selectedArr').disable();
            // }
            const modelListDeptRoles = [];
            departments.forEach(item => {
                if (item.IsSelected) {
                    modelListDeptRoles.push(item);
                }
            });
            this.modelList['departmentRole'] = modelListDeptRoles;
        }
    }

    setWorkerShift(workerShifts) {
        if (this.viewMode === 'view') {
            const modelListWorkerShifts = [];
            if (workerShifts.length && this.currentUser && this.currentUser['profile'] && this.currentUser['profile']['worker']) {
                workerShifts.forEach(item => {
                    if (item.sfdcId === this.currentUser['profile']['worker']['Global_Shift_Equivalent_Schedule_GSES__c']) {
                        modelListWorkerShifts.push(item);
                    }
                });
            }
            this.modelList['workerShift'] = modelListWorkerShifts;
        }
    }

    getDepartmentOrProgramRoles(source) {
        const roles = [];
        if (source === 'Program') {
            this.registrationForm.value.program.map(item => {
                if (item.selectedArr) {
                    roles.push({
                        sfdcId: item.sfdcId, Name: item.Name, Project__c: item.Project__c, Status__c: item.Status__c
                    })
                }
            })
        } else if (source === 'Department') {
            this.registrationForm.value.department_role.map(item => {
                if (item.selectedArr) {
                    roles.push({ sfdcId: item.sfdcId, Name: item.Name, status: item.selectedArr })
                }
            })
        }
        return roles;
    }

    reset() {
        this.initialLoad();
    }

    onEditClick() {
        this._router.navigate(['/pms/user-management/update', this.viewId], { queryParams: { type: this.viewType } });
    }

    prepareUserData() {
        const reqObj = {};
        reqObj['type'] = 'user';
        reqObj['notify_user'] = this.registrationForm.value['notify_user'] ? this.registrationForm.value['notify_user'] : '';
        reqObj['department_role'] = this.getDepartmentOrProgramRoles('Department');
        reqObj['program'] = this.getDepartmentOrProgramRoles('Program');
        reqObj['user'] = {
            'AccountId': this.currentAccessType === 'internal' ? this.registrationForm.value['account_Type'] : this.currentAccountId,
            'firstname': this.registrationForm.value['first_Name'],
            'lastname': this.registrationForm.value['last_Name'],
            'email': this.registrationForm.value['email'] ? this.registrationForm.value['email'] : this.currentUser['email'],
            'accessType': this.currentMemberType,
            'status': 1,
            'isActive': 1,
            'username': this.registrationForm.value['first_Name'] + ' ' + this.registrationForm.value['last_Name'],
            'promptPasswordChange': this.registrationForm.value['password_reset'] ? 1 : 0,
            'userTypeId': this.registrationForm.value['user_Type']
        };
        reqObj['contact'] = {
            'AccountId': this.currentAccessType === 'internal' ? this.registrationForm.value['account_Type'] : this.currentAccountId,
            'FirstName': this.registrationForm.value['first_Name'],
            'LastName': this.registrationForm.value['last_Name'],
            'Email': this.registrationForm.value['email'] ? this.registrationForm.value['email'] : this.currentUser['email'],
            'Phone': this.registrationForm.value['phone_number'],
            'Title': this.registrationForm.value['job_title'],
            'Department': this.registrationForm.value['department'],
            'MailingCountry': this.registrationForm.value['country']
        };
        reqObj['worker'] = {
            'Functional_Role__c': this.registrationForm.value['functional_role'],
            'Functional_Role_Level__c': this.registrationForm.value['functional_level'],
            'Regional_Role__c': (this.registrationForm.value['regional_role']).join(';'),
            'Global_Shift_Equivalent_Schedule_GSES__c': this.registrationForm.value['shift_work_hours']
        };
        if (this.viewMode === 'add') {
            reqObj['user']['password'] = this.registrationForm.value['password'];
            reqObj['action'] = 'add';
        } else if (this.viewMode === 'update') {
            reqObj['user']['id'] = this.currentUser['id'];
            if (this.currentUser['profile'] && this.currentUser['profile']['id']) {
                reqObj['contact']['id'] = this.currentUser['profile']['id'];
            }
            if (this.currentUser['profile'] && this.currentUser['profile']['worker'] && this.currentUser['profile']['worker']['id']) {
                reqObj['worker']['id'] = this.currentUser['profile']['worker']['id'];
            }
            reqObj['action'] = 'update';
        }
        return reqObj;
    }

    prepareContactData() {
        const reqObj = {};
        reqObj['type'] = 'contact';
        reqObj['notify_user'] = this.registrationForm.value['notify_user'] ? this.registrationForm.value['notify_user'] : '';
        reqObj['department_role'] = this.getDepartmentOrProgramRoles('Department');
        reqObj['program'] = this.getDepartmentOrProgramRoles('Program');
        reqObj['contact'] = {
            'AccountId': this.currentAccountId,
            'FirstName': this.registrationForm.value['first_Name'],
            'LastName': this.registrationForm.value['last_Name'],
            'Email': this.registrationForm.value['email'] ? this.registrationForm.value['email'] : this.currentUser['email'],
            'Phone': this.registrationForm.value['phone_number'],
            'Title': this.registrationForm.value['job_title'],
            'Department': this.registrationForm.value['department'],
            'MailingCountry': this.registrationForm.value['country']
        };
        reqObj['worker'] = {
            'Functional_Role__c': this.registrationForm.value['functional_role'],
            'Functional_Role_Level__c': this.registrationForm.value['functional_level'],
            'Regional_Role__c': (this.registrationForm.value['regional_role']).join(';'),
            'Global_Shift_Equivalent_Schedule_GSES__c': this.registrationForm.value['shift_work_hours']
        };
        if (this.viewMode === 'add') {
            // if add contact feature required in future
        } else if (this.viewMode === 'update') {
            reqObj['contact']['id'] = this.currentUser['profile']['id'];
            if (this.currentUser['profile']['worker']['id']) {
                reqObj['worker']['id'] = this.currentUser['profile']['worker']['id'];
            }
            reqObj['action'] = 'update';
        }
        return reqObj;
    }

    onClickSave() {
        let reqObj = {};
        if (this.viewType === 'user') {
            reqObj = this.prepareUserData();
        } else if (this.viewType === 'contact') {
            reqObj = this.prepareContactData();
        }
        this.createOrUpdateUser(reqObj);
    }

    createOrUpdateUser(reqObj) {
        this._preloaderService.showPreloader();
        this._usersApi.createUser({ 'values': reqObj }).subscribe(res => {
            if (res === 'USER_EXIST') {
                this._alertService.error('Email already exists!');
                // this.formErrors['email'] = 'Email already exists';
            } else if (res === 'SUCCESS') {
                this._alertService.success('Record updated successfully.')
                if (this.viewMode === 'add') {
                    this.reset();
                }
            }
            window.scrollTo(0, 0);
            this._preloaderService.hidePreloader();
        }, err => {
            this._alertService.error(err.message);
            window.scrollTo(0, 0);
            this._preloaderService.hidePreloader();
        })
    }

}
