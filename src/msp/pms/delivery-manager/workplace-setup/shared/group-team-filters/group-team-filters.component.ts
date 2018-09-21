import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterServiceApi, ProjectApi } from 'shared/sdk';
import { ActivatedRoute, Router } from '@angular/router';

import { AppStateService } from 'shared/services/app-state.service';
import { PreloaderService } from 'shared/services/preloader.service';

@Component({
  selector: 'app-group-team-filters',
  templateUrl: './group-team-filters.component.html',
  styleUrls: ['./group-team-filters.component.css']
})

export class GroupTeamFiltersComponent implements OnInit {
  @Output() filterDataList: EventEmitter<Object> = new EventEmitter<Object>();
  selectedAccountId: string;
  isInternalUser = false;
  isVendor = false;
  ddlObj = {
    departments: [],
    communities: [],
    groupRecordTypes: []
  }
  ddlSelectedObj = {
    department: '',
    community: '',
    groupRecordType: ''
  }
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _preloaderService: PreloaderService,
    private _appState: AppStateService,
    private _filterServiceApi: FilterServiceApi,
  ) {
    if (this._appState.getAccessType() === 'internal') {
      this.isInternalUser = true;
    }
    if ((this._appState.getAccessType() === 'vendor') || this._activatedRoute.snapshot.data.page === 'vms') {
      this.isVendor = true;
    }
  }
  ngOnInit() {
    this.getSelectedGroup();
  }
  getSelectedGroup() {
    const paramObj = {
      'models': ['Department', 'Community', 'GroupRecordType']
    };
    this.loadDropdownData(paramObj);

  }

  loadDropdownData(paramObj) {
    // get data for filters
    this._filterServiceApi.getAllFiltersData(paramObj).subscribe(
      data => {
        if (data.data) {
          data = data.data;
          // department
          if (data['department'] && data['department']['list']) {
            this.ddlObj.departments = data['department']['list'];
          }
          // Community
          if (data['communities'] && data['communities']['list']) {
            this.ddlObj.communities = data['communities']['list'];
          }
          // Record Type
          if (data['groupRecordTypes'] && data['groupRecordTypes']['list']) {
            this.ddlObj.groupRecordTypes = data['groupRecordTypes']['list'];
          }
          this.notifyFilterValues();
        }
      },
      error => {
        console.log('Error fetching data>>', error.message);
        this._preloaderService.hidePreloader();
      }
    );
  }


  onFilterChange(source) {
    this.notifyFilterValues();
  }

  // Emit selected filter values
  notifyFilterValues() {
    const filterObj = {}
    if (this.ddlSelectedObj.department) {
      filterObj['Department__c'] = this.ddlSelectedObj.department
    }
    if (this.ddlSelectedObj.community) {
      filterObj['Community__c'] = this.ddlSelectedObj.community
    }
    if (this.ddlSelectedObj.groupRecordType) {
      filterObj['RecordType'] = this.ddlSelectedObj.groupRecordType
    }
    this.filterDataList.emit(filterObj);
  }
  reset() {
    this.ddlSelectedObj.department = '';
    this.ddlSelectedObj.community = '';
    this.ddlSelectedObj.groupRecordType = '';
    this.notifyFilterValues();
  }
}



