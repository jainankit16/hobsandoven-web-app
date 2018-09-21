import { Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { NgForm, FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { ModalService } from '../../../services/modal.service';
import { AlertService } from '../../../services/alert.service';
import { PreloaderService } from '../../../services/preloader.service';

import { UsersApi, SkillApi, Skill, UserSkillApi } from '../../../sdk';

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.css']
})
export class UserSkillsComponent implements OnInit {
  userskill: Array<any>;
  errorMessage: any;
  selectedSkills: Array<any>;
  constructor(
    private modalService: ModalService,
    private alertService: AlertService,
    private _usersApi: UsersApi,
    private _userSkillApi: UserSkillApi,
    private _skillApi: SkillApi) {
  }

  ngOnInit() {

    this._usersApi.getCurrent({include: ['skills']}).subscribe(user => {
      this.userskill = user.skills;
      this.errorMessage = (this.userskill.length > 0) ? '' : 'Add skills in your account using Manage Skill option.';
  }, error => {
    this.errorMessage = error.message;
  });

  }


/**
 *
 *
 * @param {any} content
 * @param {any} size
 * @memberof UserSkillsComponent
 */
  open(content, size) {
    this.modalService.open(content, size);
  }

/**
 *
 * @param {number } id *
 * delete user skill one by one
 */
  deleteUserSkill(id: number, name: string) {
    if (confirm('Are you sure, you want to delete ' + '"' + name + '"' + ' from your skills set ?')) {
      this._userSkillApi.removeSkill({ UserId: this._usersApi.getCurrentId(), SkillId: id }).subscribe(data => {
        // to remove element from timecards list
        this.userskill = this.userskill.filter(
          userskl => userskl.id !== id
        );
        if (this.userskill.length === 0) {
          this.errorMessage = 'Add skills in your account using Manage Skill option';
        }
        this.alertService.clear();
        this.alertService.success(data.message);
      }, error => {
        this.alertService.error(error.message);
      });

    }
  }

  /**
   * 
   * @param event
   * to auto update user skill listing page
   */
  skillAdded(event) {
    event.forEach((userSkill, index) => {
      this.userskill = [];
      this._skillApi.findById(userSkill['SkillId']).subscribe(skill => {
        if (skill) {
          this.userskill.push(skill);
          this.errorMessage = '';
        }
      });
    });
  }
}
