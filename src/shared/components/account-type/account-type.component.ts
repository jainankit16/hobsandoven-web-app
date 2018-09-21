import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountApi, RecordTypeApi } from './../../sdk';

import { ModalService } from './../../services/modal.service';
import { PreloaderService } from 'shared/services/preloader.service';
import { CommonService } from './../../services/common.service';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css']
})
export class AccountTypeComponent implements OnInit {
  @Input() isMultiSelect: Boolean = true;
  @Input() accountType: string;
  @Output() setAccountArr: EventEmitter<Object> = new EventEmitter<Object>();
  whereCondition: any;
  recordTypeId: any;
  txtAccountName: any;
  selectedCharCode = 'A';
  charCodesObj: any;
  checkedAccountId = [];
  checkedAccountName = [];
  loadingIndicator = false;
  tableData: any;
  itemsPerPage = 10;
  isLoadMore = false;
  ngxOffset = 0;
  itemsPerBatch = 200;
  noRecords: any;
  constructor(
    private _accountApi: AccountApi,
    private _recordType: RecordTypeApi,
    private _modalService: ModalService,
    private _commonService: CommonService,
    private _preloaderService: PreloaderService
  ) {
    this.whereCondition = { Name: { like: this.selectedCharCode + '%', options: 'i' } }
  }

  ngOnInit() {
    this.getAtoZCharCodes();
    if (this.accountType) {
      this.getRecordType();
    } else {
      this.getTableData();
    }
  }

  getAtoZCharCodes() {
    this.charCodesObj = [];
    for (let i = 65; i <= 90; i++) {
      this.charCodesObj.push({ name: String.fromCharCode(i) });
    }
  }

  getRecordType() {
    const acocuntfilter = this._commonService.getAccountTypeFilter();
    if (acocuntfilter.value && acocuntfilter['value']['recordTypeId']) {
      this.getTableData();
    } else {
      this._recordType.find({ fields: ['sfdcId'], where: { Name: this.accountType, SobjectType: 'Account' } }).subscribe(
        res => {
          this.recordTypeId = res[0]['sfdcId'];
          this.getTableData();
        },
        err => {
          console.log(err);
        });
    }
  }

  getTableData() {
    const acocuntList = this._commonService.getAccountTypeList();
    if (acocuntList.value) {
      this.setAccountFilter();
      this.tableData = acocuntList.value;
    } else {
      this.getAccountList(0);
    }
  }

  setAccountFilter() {
    const acocuntfilter = this._commonService.getAccountTypeFilter();
    if (acocuntfilter.value && acocuntfilter['value']['recordTypeId']) {
      const filter = acocuntfilter.value;
      this.ngxOffset = filter['ngxOffset'];
      this.recordTypeId = filter['recordTypeId'];
      this.txtAccountName = filter['txtAccountName'];
      this.selectedCharCode = filter['selectedCharCode'];
      this.checkedAccountId = filter['checkedAccountId'];
    }
  }

  getAccountList(offset) {
    this._preloaderService.showPreloader();
    if (this.recordTypeId) {
      this.whereCondition['RecordTypeId'] = this.recordTypeId;
    }
    const obj = {
      fields: ['sfdcId', 'Name'],
      limit: this.itemsPerBatch,
      skip: offset,
      where: this.whereCondition
    }
    this._accountApi.find(obj).subscribe(results => {
      this.noRecords = (results.length < this.itemsPerBatch) ? true : false;
      if (!this.isLoadMore) {
        this.tableData = results;
      } else {
        results.forEach(c => {
          this.tableData.push(c);
        });
        this.tableData = [...this.tableData];
      }
      this.loadingIndicator = false;
      this.setAccountService(this.tableData);
      this._preloaderService.hidePreloader();
    },
      error => {
        this.loadingIndicator = false;
        this._preloaderService.hidePreloader();
      }
    )
  }

  setAccountService(data) {
    this._commonService.setAccountTypeFilter({
      ngxOffset: this.ngxOffset,
      recordTypeId: this.recordTypeId,
      txtAccountName: this.txtAccountName,
      selectedCharCode: this.selectedCharCode,
      checkedAccountId: this.checkedAccountId
    });
    this._commonService.setAccountTypeList(data);
  }

  resetBtn() {
    this.selectedCharCode = 'A';
    this.txtAccountName = '';
    this.checkedAccountId = [];
    this.checkedAccountName = [];
    this.whereCondition = {
      Name: { like: this.selectedCharCode + '%', options: 'i' },
    }
    this.isLoadMore = false;
    this._commonService.setAccountTypeFilter({});
    this._commonService.setAccountTypeList([]);
    this.getAccountList(0);
  }

  onFilterChanged(e) {
    if (e !== 'ddl' && this.txtAccountName) {
      this.selectedCharCode = this.txtAccountName.charAt(0).toUpperCase();
      this.whereCondition = { Name: { like: this.txtAccountName + '%', options: 'i' } }
    } else {
      this.whereCondition = { Name: { like: this.selectedCharCode + '%', options: 'i' } }
    }
    this.isLoadMore = false;
    this.getAccountList(0);
  }

  updateChecked(option, event) {
    const index = this.checkedAccountId.indexOf(option.sfdcId);
    if (event.target.checked) {
      if (index === -1) {
        this.checkedAccountId.push(option.sfdcId);
        this.checkedAccountName.push(option.Name);
      }
    } else {
      if (index !== -1) {
        this.checkedAccountId.splice(index, 1);
        this.checkedAccountName.push(index, 1);
      }
    }
  }

  selectAccountId(account) {
    this.checkedAccountId = [account.sfdcId];
    this.checkedAccountName = [account.Name];
    this.notifyAccountValues();
  }

  notifyAccountValues() {
    if (this.checkedAccountId) {
      this.setAccountService(this.tableData);
      this.setAccountArr.emit({ sfdcId: this.checkedAccountId, Name: this.checkedAccountName });
      this._modalService.closed();
    }
  }

  /*Data Table funcation start here*/
  loadMoreRecords() {
    this.isLoadMore = true;
    this.getAccountList(this.tableData.length);
  }
  page(e) {
    if (e) {
      this.ngxOffset = e.offset;
      this.setAccountService(this.tableData);
    }
  }


}
