import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FilterServiceApi, GroupApi, DepartmentRoleApi } from 'shared/sdk';
import { PreloaderService } from 'shared/services/preloader.service';
import { AlertService } from 'shared/services/alert.service';
import { ModalService } from 'shared/services/modal.service';
import { CommonService } from 'shared/services/common.service';
@Component({
    selector: 'app-create-group-team',
    templateUrl: './create-group-team.component.html',
    styleUrls: ['./create-group-team.component.css'],
    providers: [CommonService]
})

export class CreateGroupTeamComponent implements OnInit {
    viewMode: any;
    @Input() editId: string;
    @Input() communityC: string;
    @Output() loadGroupTeam: EventEmitter<any> = new EventEmitter<any>();
    accountId: any;
    accessType: any;
    active = true;
    passive = false;
    disabled = false;
    showAccount = false;
    showDepartment = true;
    showAccountFilter = false
    headerTxt: any;
    groupTeamForm: FormGroup;
    formErrors = {};
    orderBy = 'createdAt Asc';
    validationMessages = {};
    ddlCommunity: any;
    ddlDepartment: any;
    ddlAccount: any;
    ddlgroupRecordType: any;
    groupTeamData = {};
    selectedGroupMemberArr = [];
    selectedGroupMemberArrShow = [];
    selectedDeptArr: any;
    selectedAccountArr = {};
    selectedAccount: string;
    selectedMemberArr: any;;
    selectedType = '0121a000000F1BHAA0';
    selectedCommunity = 'MSP';
    accessibilityType = 'Private';
    onlyMspCommunity = false;
    showMemberFilter = false;
    groupMemberDataClone = [];
    memberDataClone = [];
    accountMembers = [];
    activeTab = '';
    groupId: number;
    availableToCommunity: any;
    externalCommunity = 'PMS';
    mspCommunity = [
        { id: 'MSP', name: 'MSP' }
    ];
    groupRecordType = [
        { sfdcId: '0121a000000F1BHAA0', Name: 'Group (Custom)' },
        { sfdcId: '0121a000000Vll8AAC', Name: 'Team' }
    ];
    ddlObj = {
        departments: [],
        members: [],
        accounts: []
    }
    ddlSelectedObj = {
        department: '',
        member: '',
    }

    constructor(
        private _fb: FormBuilder,
        private _alertService: AlertService,
        private _filterServiceApi: FilterServiceApi,
        private _preloaderService: PreloaderService,
        private _groupApi: GroupApi,
        private _modalService: ModalService,
        private _departmentRoleApi: DepartmentRoleApi,
        private _commonService: CommonService

    ) {

    }

    ngOnInit() {
        this.activeTab = (this.communityC) ? this.communityC : 'MSP'
        this.initialLoad();
    }
    initialLoad() {
        this.headerTxt = 'Add Group/Team';
        if (this.editId) {
            this.headerTxt = 'Update Group/Team'
            this.getGroupTeamById();
            this.getGroupMemberById();
            this.disabled = true;
            this.groupRecordType.push({ sfdcId: '0121a000000Vll7AAC', Name: 'Group (General)' })
        }
        this.getDropdownValues();
        this.creatForms(this.disabled);
        this.setFormErrors();
    }
    getGroupTeamById() {
        this._preloaderService.showPreloader();
        this._groupApi.find({ where: { sfdcId: this.editId } }).subscribe(
            res => {
                if (res) {
                    this.groupTeamData = res[0];
                    this.groupId = this.groupTeamData['id'];
                    this.availableToCommunity = this.groupTeamData['Available_to_Communities__c'];
                    if (this.groupTeamData['RecordType'] == '0121a000000F1BHAA0' && this.communityC == 'PMS') {
                        this.showAccount = true;
                    }
                    if (this.groupTeamData['RecordType'] == '0121a000000Vll7AAC') {
                        this.showDepartment = false;
                    }
                    this.accessibilityType = (this.groupTeamData['Accessibility_Type__c']) ? this.groupTeamData['Accessibility_Type__c'] : '';
                    this.selectedType = this.groupTeamData['RecordType'];
                    this.selectedCommunity = this.groupTeamData['Community__c'];
                    this.externalCommunity = (this.selectedCommunity == 'MSP') ? 'PMS' : 'MSP'
                    this.setGroupTeamFormValue();
                }
                this._preloaderService.hidePreloader();
            },
            err => {
                this._alertService.warn('Oops! something went wrong.');
                this._preloaderService.hidePreloader();
            }
        )
    }

    setGroupTeamFormValue() {
        let obj;
        for (const key in this.groupTeamData) {
            if (key) {
                obj = {};
                obj[key] = this.groupTeamData[key];
                this.groupTeamForm.patchValue(obj);
            }
        }
        if (this.availableToCommunity) {
            this.groupTeamForm.patchValue({ 'Available_to_Communities__c': this.availableToCommunity.split(',') });
        }
    }

    getGroupMemberById() {
        this._preloaderService.showPreloader();
        const filterObj = {}
        filterObj['PgMO_Groups__c'] = this.editId;
        const findQuery = {
            'where': filterObj,
            'order': this.orderBy,
            include: [
                {
                    relation: 'department',
                    scope: {
                        fields: ['sfdcId', 'Name']
                    }
                },
                {
                    relation: 'worker',
                    scope: {
                        fields: ['sfdcId', 'Name', 'Contact__c'],
                        include: {
                            relation: 'contact',
                            scope: {
                                fields: ['sfdcId', 'AccountId'],
                                include: {
                                    relation: 'account',
                                    scope: {
                                        fields: ['sfdcId', 'Name']

                                    }
                                }
                            }
                        }
                    }
                }
            ]
        }
        this._departmentRoleApi.find(findQuery).subscribe(
            data => {
                if (data.length > 0) {
                    data.forEach(element => {
                        let departmentSfdc = (element['department'] && element['department']['sfdcId']) ? element['department']['sfdcId'] : '';
                        let departmentName = (element['department'] && element['department']['Name']) ? element['department']['Name'] : '';
                        let workerSfdc = (element['worker'] && element['worker']['sfdcId']) ? element['worker']['sfdcId'] : '';
                        let workerName = (element['worker'] && element['worker']['Name']) ? element['worker']['Name'] : '';
                        let accountSfdc = (element['worker'] && element['worker']['contact'] && element['worker']['contact']['account'] && element['worker']['contact']['account']['sfdcId']) ? element['worker']['contact']['account']['sfdcId'] : '';
                        let accountName = (element['worker'] && element['worker']['contact'] && element['worker']['contact']['account'] && element['worker']['contact']['account']['Name']) ? element['worker']['contact']['account']['Name'] : '';
                        let valueObjDept = { id: departmentSfdc, name: departmentName };
                        let valueObjWorker = { id: workerSfdc, name: workerName };
                        let valueObjAccount = { id: accountSfdc, name: accountName }
                        this.selectedGroupMemberArr.push({ dept: valueObjDept, member: valueObjWorker, account: valueObjAccount, community: element['Community__c'] });
                    });
                    this.groupMemberDataClone = this.selectedGroupMemberArr.slice();
                    this.tabControl();
                }
            },
            err => {
                this._preloaderService.hidePreloader();
            }
        );
    }

    getDropdownValues() {
        this._preloaderService.showPreloader();
        this._filterServiceApi.getAllFiltersData({ 'models': ['Account', 'Department', 'Community', 'GroupRecordType', 'Worker'] }).subscribe(
            data => {
                if (data.data) {
                    data = data.data;
                    // accounts
                    if (data['accounts'] && data['accounts']['list']) {
                        this.ddlAccount = data['accounts']['list'];
                        this.ddlObj.accounts = data['accounts']['list'];
                    }

                    if (data['department'] && data['department']['list']) {
                        this.ddlDepartment = data['department']['list'];
                        this.ddlObj.departments = data['department']['list'];
                    }
                    // Community
                    if (this.onlyMspCommunity) {
                        this.ddlCommunity = this.mspCommunity;
                    } else {
                        if (data['communities'] && data['communities']['list']) {
                            this.ddlCommunity = data['communities']['list'];
                        }
                    }
                    if (this.groupRecordType) {
                        this.ddlgroupRecordType = this.groupRecordType
                    }

                    if (data['workers'] && data['workers']['list']) {
                        this.ddlObj.members = data['workers']['list'];
                        this.memberDataClone = this.ddlObj.members.slice();
                    }
                }
                this._preloaderService.hidePreloader();
            },
            error => {
                this._preloaderService.hidePreloader();
            }
        );
    }

    creatForms(disabled) {
        this.groupTeamForm = this._fb.group({
            Name: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            Group_Code__c: [{ value: '', disabled: false }, [Validators.required]],
            RecordType: [{ value: '0121a000000F1BHAA0', disabled: disabled }, [Validators.required]],
            Account__c: [{ value: '', disabled: disabled }],
            Community__c: [{ value: 'MSP', disabled: disabled }, [Validators.required]],
            Available_to_Communities__c: [{ value: this.selectedCommunity.split(','), disabled: disabled }],
            Department__c: [{ value: '', disabled: disabled }, [Validators.required]]

        });
        this.groupTeamForm.valueChanges.subscribe(data => this.onFormChanged(data));
    }
    onFormChanged(data?: any) {
        if (!this.groupTeamForm) { return; }
        const form = this.groupTeamForm;
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
    setFormErrors() {
        this.formErrors = {
            'Name': '',
            'RecordType': '',
            'Account__c': '',
            'Community__c': '',
            'Group_Code__c': '',
            'Department__c': ''
        };
        this.validationMessages = {
            'Name': {
                'required': ' Group/Team Name is required.',
                'minlength': ' Group/Team Name must be at least 3 characters long.',
                'maxlength': ' Group/Team Name cannot be more than 100 characters long.'
            },
            'Department__c': {
                'required': 'Department is required.'
            },
            'RecordType': {
                'required': 'RecordType is required.'
            },
            'Community__c': {
                'required': 'Community is required.'
            },
            'Group_Code__c': {
                'required': 'Group/Team Code is required.'
            },
        };
    }

    onClickSave() {
        const groupData = {}
        let reqObj;
        if (this.editId) {
            reqObj = {
                'id': this.groupId,
                'Name': this.groupTeamForm.value['Name'],
                'Group_Code__c': this.groupTeamForm.value['Group_Code__c'],
            }
        } else {
            reqObj = {
                'Name': this.groupTeamForm.value['Name'],
                'Group_Code__c': this.groupTeamForm.value['Group_Code__c'],
                'Community__c': this.groupTeamForm.value['Community__c'],
                'RecordType': this.groupTeamForm.value['RecordType'],
                'Account__c': (this.groupTeamForm.value['Account__c']) ? this.groupTeamForm.value['Account__c'] : null,
                'Department__c': this.groupTeamForm.value['Department__c'],
                'Accessibility_Type__c': this.accessibilityType,
                'Available_to_Communities__c': (this.groupTeamForm.value['Available_to_Communities__c']) ? this.groupTeamForm.value['Available_to_Communities__c'].join(',') : ''
            }
        }
        groupData['groupData'] = reqObj
        groupData['groupMember'] = this.selectedGroupMemberArr;
        this.createOrUpdate(groupData);
    }

    createOrUpdate(data) {
        this._preloaderService.showPreloader();
        this._groupApi.createUpdateGroupTeam(data).subscribe(
            result => {
                if (result.data && result.data.status == 200) {
                    this.loadGroupTeam.emit({
                        data: 'loadGroup'
                    });
                    this.cancelForm();
                    this._alertService.success(result.data.message);
                    this._preloaderService.hidePreloader();
                }
            },
            err => {
                this._modalService.closed();
                this._alertService.warn(err.message);
                this._preloaderService.hidePreloader();
            })
    }
    cancelForm() {
        //this._modalService.closed();
        var button = document.querySelector("button.close");
        button.dispatchEvent(new Event("click"));
    }

    selectType(type, e) {
        this.selectedGroupMemberArr = [];
        this.groupMemberDataClone = [];
        this.selectedGroupMemberArrShow = [];
        this.showMemberFilter = false;
        if (type == 'recordType') {
            this.selectedType = e;
        }
        if (type == 'community') {
            this.selectedCommunity = e;
            if (this.selectedCommunity == 'VMS') {
                this.showAccountFilter = true;
            }
            else {
                this.showAccountFilter = false;
            }
            this.groupTeamForm.patchValue({ 'Available_to_Communities__c': e.split(',') });
        }
        if (this.selectedType == '0121a000000Vll8AAC') {
            this.selectedCommunity = 'MSP';
            this.accessibilityType = 'Internal';
            this.groupTeamForm.get('Community__c').setValue('MSP');
            this.groupTeamForm.patchValue({ 'Available_to_Communities__c': this.selectedCommunity.split(',') });
        }

        if ((this.selectedType == '0121a000000F1BHAA0' && this.selectedCommunity == 'VMS') || this.selectedType == '0121a000000F1BHAA0' && this.selectedCommunity == 'PMS') {
            this.accessibilityType = 'Public';
        }
        else if (this.selectedType == '0121a000000F1BHAA0' && this.selectedCommunity == 'MSP') {
            this.accessibilityType = 'Private';
        }

        if (this.selectedType == '0121a000000F1BHAA0' && this.selectedCommunity == 'PMS') {
            this.showAccount = true;
            this.groupTeamForm.get('Account__c').setValidators([Validators.required]);
        }
        else {
            this.showAccount = false;
            this.groupTeamForm.get('Account__c').setValue('');
            this.groupTeamForm.get('Account__c').clearValidators();
            this.groupTeamForm.get('Account__c').updateValueAndValidity();
        }

        if (this.selectedType == '0121a000000Vll8AAC') {
            this.onlyMspCommunity = true;
            this.showAccountFilter = false;
        }
        else {
            this.onlyMspCommunity = false;
        }

        this.externalCommunity = (this.selectedCommunity == 'MSP') ? 'PMS' : 'MSP'
        this.activeTab = this.selectedCommunity;

        this.getDropdownValues();
    }

    onChangeDDL(selectedOption, e) {
        let sfdcId = e.target.value;
        let name = e.target.selectedOptions[0].text;
        let valueObj = { id: sfdcId, name: name };
        if (selectedOption === 'department') {
            this.selectedDeptArr = {};
            this.selectedDeptArr = valueObj;
        } else if (selectedOption === 'member') {
            this.selectedMemberArr = {};
            this.selectedMemberArr = (valueObj);
            this.selectedGroupMemberArr.push({ dept: this.selectedDeptArr, member: this.selectedMemberArr, account: this.selectedAccountArr, community: this.activeTab });
            this.groupMemberDataClone = this.selectedGroupMemberArr.slice();
            this.selectedDeptArr = {};
            this.selectedAccountArr = {};
            this.showMemberFilter = false;
            this.tabControl();
        }
    }

    onTabChange(e) {
        this.activeTab = e.nextId;
        this.showMemberFilter = false;
        if (this.activeTab == 'VMS') {
            this.showAccountFilter = true;
        }
        else if (this.activeTab == 'PMS' && this.selectedCommunity == 'MSP') {
            this.showAccountFilter = true;
        }
        else {
            this.showAccountFilter = false;
        }
        this.tabControl();
    }
    addMemberFilter() {
        this.selectedAccountArr = {};
        this.selectedAccount = '';
        this.ddlObj.members = this.memberDataClone.slice();
        if (this.activeTab) {
            switch (this.activeTab) {
                case "MSP":
                    this.accessType = 'internal';
                    break;
                case "PMS":
                    this.accessType = 'partner';
                    break;
                case "VMS":
                    this.accessType = 'vendor';
                    break;
                default:
                    this.accessType = 'internal';
            }
        }
        let dataFinal = []
        dataFinal = this.ddlObj.members.filter(data => {
            if ((data['accessType'] == this.accessType)) {
                return data;
            }
        });

        this.ddlObj.members = dataFinal.slice();

        for (var i = this.ddlObj.members.length - 1; i >= 0; i--) {
            for (var j = 0; j < this.selectedGroupMemberArr.length; j++) {
                if (this.ddlObj.members[i] &&
                    (this.ddlObj.members[i].WorkerSfdcId === this.selectedGroupMemberArr[j].member.id) &&
                    this.selectedGroupMemberArr[j].community === this.activeTab) {
                    this.ddlObj.members.splice(i, 1);
                }
            }
        }
        this.accountMembers = this.ddlObj.members.slice();
        this.showMemberFilter = true;
    }
    deleteMember(index, memberId) {
        this._preloaderService.showPreloader();
        this.selectedGroupMemberArrShow.splice(index, 1);
        let dataFinal = []
        dataFinal = this.selectedGroupMemberArr.filter(data => {
            if ((data['community'] !== this.activeTab) || (data['member']['id'] !== memberId)) {
                return data;
            }
        });
        this.selectedGroupMemberArr = dataFinal;
        this.groupMemberDataClone = dataFinal;
        this._preloaderService.hidePreloader();
        this.showMemberFilter = false;
    }
    // Filter members based on community
    tabControl() {
        this.selectedGroupMemberArr = this.groupMemberDataClone.slice();
        let filterData = [];
        if (this.activeTab == 'MSP') {
            filterData = this.selectedGroupMemberArr.filter(data => {
                if (data['community'] == 'MSP') {
                    return data;
                }
            });
        }
        if (this.activeTab == 'PMS') {
            filterData = this.selectedGroupMemberArr.filter(data => {
                if (data['community'] == 'PMS') {
                    return data;
                }
            });
        }
        if (this.activeTab == 'VMS') {
            filterData = this.selectedGroupMemberArr.filter(data => {
                if (data['community'] == 'VMS') {
                    return data;
                }
            });
        }
        this.selectedGroupMemberArrShow = filterData;
    }

    removeMemberFilter() {
        this.showMemberFilter = false;
    }


    // For Account Selection
    openAccountPopup(content, size) {
        this._commonService.setAccountTypeFilter('');
        this._commonService.setAccountTypeList('');
        this._modalService.open(content, size);
    }

    // Select member based on Account Selection
    getAccountMember(account, type) {
        this._preloaderService.showPreloader();
        let accountId = '';
        let accountName = '';
        if (type === 'ddl') {
            accountId = account.target.value;
            accountName = account.target.selectedOptions[0].text;
        } else {
            accountId = (account && account.sfdcId) ? account.sfdcId[0] : '';
            accountName = (account && account.Name) ? account.Name[0] : '';
            this.selectedAccount = accountName;
        }

        this.ddlObj.members = this.accountMembers.slice();
        if (accountId != '--None--') {
            let accountMember = []
            accountMember = this.ddlObj.members.filter(data => {
                if ((data['AccountId'] == accountId)) {
                    return data;
                }
            });
            this.ddlObj.members = accountMember;
        }
        let valueObj = { id: accountId, name: accountName };
        this.selectedAccountArr = {};
        this.selectedAccountArr = valueObj;
        this._preloaderService.hidePreloader();
    }

}
