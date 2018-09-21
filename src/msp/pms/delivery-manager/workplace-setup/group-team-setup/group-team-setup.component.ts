import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { GroupApi, DepartmentRoleApi } from 'shared/sdk';
import { AppStateService } from 'shared/services/app-state.service';
import { UtilityService } from 'shared/services/utility.service';
import { PreloaderService } from 'shared/services/preloader.service';
import { ModalService } from 'shared/services/modal.service';
import { AlertService } from 'shared/services/alert.service';

@Component({
  selector: 'app-group-team-setup',
  templateUrl: './group-team-setup.component.html',
  styleUrls: ['./group-team-setup.component.css']
})
export class GroupTeamSetupComponent implements OnInit {

  tableData = [];
  itemsPerPage = 10;
  isLoadMore = false;
  itemsPerBatch = 200;
  orderBy = 'createdAt Desc';
  loadingIndicator = true;
  columns: any[];
  allColumns: any[];
  filterObj = {};
  filteredItems: any;
  @ViewChild('myTable') table: any;
  offset = 0;
  orderType: string;
  userState: any;
  private appStateSub: Subscription;
  appState: any;
  errorMessage = '';
  filterQuery: any;
  initialMessage: any;
  noRecords = false;
  isCollapsed = false;
  activeTab = 'tab-0';
  tableDataClone = [];
  memberInfoData: any;
  memberInfoCom = 'MSP';
  groupSfdcId: string;
  groupName: string;
  groupDepartment: string;
  editSfdcId: string;
  communityC: string;

  constructor(
    private _groupApi: GroupApi,
    private _departmentRoleApi: DepartmentRoleApi,
    private _preloaderService: PreloaderService,
    private _appState: AppStateService,
    private _utilityService: UtilityService,
    private _modalService: ModalService,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
    this.columns = [
      { name: 'Action', prop: 'action', width: 120, visible: true, sortable: false },
      { name: 'Community', prop: 'Community__c', width: 150, visible: true, sortable: true },
      { name: 'Department Name', prop: 'DepartmentName', width: 300, visible: true, sortable: true },
      { name: 'Type', prop: 'RecordType', width: 180, visible: true, sortable: true },
      { name: 'Group/Team Name', prop: 'groupTeamName', width: 200, visible: true, sortable: true },
      { name: 'Department-Group-Code', prop: 'Department_Group_Code__c', width: 250, visible: true, sortable: true },
      { name: 'Created Date', prop: 'createdAt', width: 190, visible: true, sortable: true },
    ];
    this.getGroupTeam(0);
  }

  /**
    * get all group tema data.
    * @param Offset skip nomber of rows.
    */
  getGroupTeam(Offset: number) {
    this._preloaderService.showPreloader();
    this.loadingIndicator = true;
    let whereCondition = {}
    const findQuery = {
      'where': this.filterQuery,
      'order': this.orderBy,
      'skip': Offset,
      'limit': this.itemsPerBatch,
      include: [
        {
          relation: 'department',
          scope: {
            fields: ['sfdcId', 'Name', 'Department_Acronym__c']
          }
        },
        {
          relation: 'recordType',
          scope: {
            fields: ['sfdcId', 'Name']
          }
        }
      ]
    }

    this._groupApi.find(findQuery).subscribe(
      data => {
        const results = this.modifyData(data);
        this.noRecords = (results.length < this.itemsPerBatch) ? true : false;
        if (!this.isLoadMore) {
          this.tableData = (results) ? results : [];
        } else {
          if (results.length) {
            results.forEach(c => {
              this.tableData.push(c);
            });
            this.tableData = [...this.tableData];
          }
        }
        this._preloaderService.hidePreloader();
        this.loadingIndicator = false;
        this.tableDataClone = this.tableData.slice();
      },
      err => {
        this.initialMessage = err.messages;
        this._preloaderService.hidePreloader();
        this.loadingIndicator = false;
      }
    );
  }

  modifyData(data) {
    if (data.length) {
      data.forEach((item, index) => {
        item['Community__c'] = (item.Community__c) ? item.Community__c : '';
        if (item.department && item.department.Name) {
          item['DepartmentName'] = item.department.Name;
          if (item.department && item.department.Department_Acronym__c) {
            item['DepartmentName'] += ' (' + item.department.Department_Acronym__c + ')';
          }
        }
        item['RecordType'] = (item.recordType && item.recordType.Name) ? item.recordType.Name : '';
        item['groupTeamName'] = (item.Name) ? item.Name : '';
        item['Department_Group_Code__c'] = (item.Department_Group_Code__c) ? item.Department_Group_Code__c : '';
        item['createdAt'] = (item.createdAt) ? this._utilityService.dateFormate(item.createdAt) : '';
      });
      return data;
    } else {
      return [];
    }
  }

  /**
    * This method call when we change `ngb-tabset`.
    * @param e
    * @e is a object of seleted `ngb-tab`.
    */
  onTabChange(e) {
    this.tableData = this.tableDataClone.slice();
    let filterData = [];
    this.activeTab = e.nextId;
    if (this.activeTab == 'tab-0') {
      filterData = this.tableData
      this.columns[3].visible = true;
    }
    if (this.activeTab == 'tab-1') {
      this.columns[3].visible = false;

      filterData = this.tableData.filter(data => {
        if (data['RecordType'] == 'Group (General)') {
          return data;
        }
      });
    }
    if (this.activeTab == 'tab-2') {
      this.columns[3].visible = false;
      filterData = this.tableData.filter(data => {
        if (data['RecordType'] == 'Group (Custom)') {
          return data;
        }
      });
    }
    if (this.activeTab == 'tab-3') {
      filterData = this.tableData.filter(data => {
        if (data['RecordType'] == 'Team') {
          return data;
        }
      });
      this.columns[3].visible = false;
    }
    this.tableData = filterData;
    this.isLoadMore = false;

  }

  filterDataList(filterObj) {
    if (filterObj) {
      filterObj['sfdcId'] = { neq: null };
      this.activeTab = 'tab-0';
      this.columns[3].visible = true;
      this.filterQuery = filterObj;
      this.isLoadMore = false;
      this.groupSfdcId = '';
      this.memberInfoCom = 'MSP';
      this.table.offset = 0;
      this.errorMessage = '';
      this.getGroupTeam(0);
    }
  }

  addGroupTeam(content, _size, editId, communityC) {
    this.errorMessage = ''
    this.editSfdcId = editId;
    this.communityC = communityC;
    this._modalService.open(content, _size);
  }
  memberInfo(groupId, groupName, groupDepartment) {
    if (groupId) {
      this.loadingIndicator = true;
      this._preloaderService.showPreloader();
      this.groupSfdcId = groupId;
      this.groupName = groupName;
      this.groupDepartment = groupDepartment;
      const filterObj = {}
      filterObj['Community__c'] = this.memberInfoCom;
      filterObj['PgMO_Groups__c'] = groupId;
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
          const results = data;
          if (results.length > 0) {
            this.memberInfoData = results;
            this.loadingIndicator = false;
            this.errorMessage = '';
            this._preloaderService.hidePreloader();
            this.loadingIndicator = false;
            window.scrollTo(0, 800)
          } else {
            this.memberInfoData = [];
            this.errorMessage = 'No ' + this.memberInfoCom + ' Members found for Selected Group : ' + this.groupName;
            this._preloaderService.hidePreloader();
            this.loadingIndicator = false;
            window.scrollTo(0, 0)
          }

        },
        err => {
          this.initialMessage = err.messages;
          this._preloaderService.hidePreloader();
          this.loadingIndicator = false;
        }
      );
    }
    else {
      this._alertService.warn('SfdcId does not exists for this Group / Team');
    }
  }
  communityChange(e) {
    this.memberInfoCom = e.nextId;
    this.memberInfo(this.groupSfdcId, this.groupName, this.groupDepartment);

  }

  deleteGroup(groupSfdc, groupName) {
    if (groupSfdc) {
      if (confirm('Are you sure to delete Group / Team: ' + groupName)) {
        this.loadingIndicator = true;
        this._preloaderService.showPreloader();
        this._groupApi.deleteGroupTeam({ sfdcId: groupSfdc }).subscribe(
          result => {
            if (result.data && result.data.status == 200) {
              this.getGroupTeam(0);
              this._alertService.success(result.data.message);
            }
          },
          err => {
            this.initialMessage = err.messages;
            this._preloaderService.hidePreloader();
            this.loadingIndicator = false;

          }
        );
      }
    }
    else {
      this._alertService.warn('SfdcId does not exists for this Group / Team');
    }
  }

  loadGroupTeam(event) {
    if (event.data) {
      this.table.offset = 0
      this.getGroupTeam(0);
    }
  }

}
