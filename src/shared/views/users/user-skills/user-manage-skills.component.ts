import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ModalService } from '../../../services/modal.service';
import { AlertService } from '../../../services/alert.service';
import { PreloaderService } from '../../../services/preloader.service';

import { UsersApi, SkillApi, Skill, UserSkillApi } from '../../../sdk';

@Component({
    selector: 'app-manage-skills',
    templateUrl: './user-manage-skills.component.html'
})

export class UserManageSkillsComponent implements OnInit {
    @Input() modelName: string;
    @Output('addSkill') skillAdded = new EventEmitter<any>();
    userSkillForm: FormGroup;
    addSkillForm: FormGroup;
    skillLists: any = [];
    error: string;
    userSkill: any;

    constructor(
        private fb: FormBuilder,
        private alertService: AlertService,
        private modalService: ModalService,
        private preloaderService: PreloaderService,
        private _skillApi: SkillApi,
        private _usersApi: UsersApi,
        private _userSkillApi: UserSkillApi
    ) {
    }

    ngOnInit() {
        this.error = '';
        this._skillApi.find().subscribe(skills => {
            const checkSkill = [];
            skills.forEach((skill, index) => {
                this._userSkillApi.count({ UserId: this._usersApi.getCurrentId(), SkillId: skill['id'] }).subscribe(countSkill => {
                    if (countSkill.count > 0) {
                        skill['isChecked'] = true;
                        this.setSkillID(skill['id'], true);
                    } else {
                        skill['isChecked'] = false;
                    }
                    checkSkill.push(skill);
                });
            });
            this.skillLists = checkSkill;
        });
        // to manage skill
        this.formManageSkill();
        // to add new skill
        this.formAddSkill();
    }

    formManageSkill() {
        this.userSkillForm = this.fb.group({
            UserId: [this._usersApi.getCurrentId()],
            SkillId: this.fb.array([])
        });
    }

    formAddSkill() {
        this.addSkillForm = this.fb.group({
            UserId: [this._usersApi.getCurrentId()],
            Name: ['', [Validators.required]]
        });
    }

    addSkill() {
        if (this.addSkillForm.value) {
            this._userSkillApi.addSkill(this.addSkillForm.value).subscribe(success => {
                // need to emit data to auto-update page
                if (success.skills) {
                    success.skills['isChecked'] = true;
                }
                this.skillLists.push(success.skills);
                this.skillAdded.emit(success.userskills);
                this.alertService.success(success.message);
                this.preloaderService.hidePreloader();
            }, error => {
                this.alertService.error(error.message);
                this.preloaderService.hidePreloader();
            });
        }
    }

    manageSkill() {
        if (this.userSkillForm.value) {
            this.preloaderService.showPreloader();
            this._userSkillApi.manageSkill(this.userSkillForm.value).subscribe(success => {
                setTimeout(() => {
                    // need to emit data to auto-update listing page
                    if (success.userskills) {
                        this.skillAdded.emit(success.userskills);
                    }
                    this.modalService.closed();
                    this.alertService.clear();
                    this.alertService.success(success.message);
                    this.preloaderService.hidePreloader();
                }, 2000);
            }, error => {
                console.log(error);
                this.alertService.error(error.message);
                this.preloaderService.hidePreloader();
            });
        }
    }

    setSkillID(skillId: string, isChecked: boolean) {
        const skillIdArray = <FormArray>this.userSkillForm.controls.SkillId;
        if (isChecked) {
            skillIdArray.push(new FormControl(skillId));
        } else {
            const index = skillIdArray.controls.findIndex(x => x.value === skillId)
            skillIdArray.removeAt(index);
        }
    }
}

