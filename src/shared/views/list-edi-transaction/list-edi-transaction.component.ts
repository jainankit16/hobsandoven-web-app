import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from './../../services/alert.service';
import { PreloaderService } from './../../services/preloader.service';
import { AppStateService } from './../../services/app-state.service'
import { ConfirmDialogService } from './../../services/confirm-dialog.service';
import { EdiTransactionApi } from './../../sdk/services/custom/EdiTransaction';
import { ModalService } from './../../services/modal.service';
import { SharedService } from './../../services/pms/shared.services';
import { UtilityService } from './../../services/utility.service';

@Component({
  selector: 'app-list-edi-transaction',
  templateUrl: './list-edi-transaction.component.html',
  styleUrls: ['./list-edi-transaction.component.css']
})
export class ListEdiTransactionComponent implements OnInit {

  isInternalUser = false;
  noRecords = false;
  singleRowData: any;

  /*Boot-Datatable params */
  loadingIndicator = false;
  tableData = [];
  itemsPerPage = 10;
  isLoadMore = false;
  itemsPerBatch = 200;
  orderBy = 'createdAt DESC';
  columns: any;
  allColumns: any;
  filterObj = {};
  filteredItems: any;
  @ViewChild('myTable') table: any;
  offset = 0;

  constructor(
    private _preloaderService: PreloaderService,
    private _appState: AppStateService,
    private _alertService: AlertService,
    private _modalService: ModalService,
    private _confirmDialogService: ConfirmDialogService,
    private _ediTransactionApi: EdiTransactionApi,
    private _sharedservice: SharedService,
    private _utilityService: UtilityService,
  ) { }

  ngOnInit() {
    this.columns = [
      { prop: "AccountName", name: "Account Name", visible: true, width: 220, sortable: true },
      { prop: "ProgramName", name: "Program Name", visible: true, width: 220, sortable: true },
      { prop: "Type", name: "Type", visible: true, width: 120, sortable: true },
      { prop: "Message", name: "Message", visible: true, width: 220, sortable: true },
      { prop: "createdAt", name: "Date", visible: true, width: 120, sortable: true },
      { prop: "Action", name: "Action", visible: true, width: 100, sortable: false },
    ];
    this.allColumns = this.columns.slice(); // Used for Columns Toggling

    if (this._appState.getAccessType() === 'internal' || this._appState.getAccessType() === 'admin') {
      this.isInternalUser = true;
      this.getEdiTransactionList(0);
    }
  }

  getEdiTransactionList(offset) {
    this.loadingIndicator = true;
    this._preloaderService.showPreloader();
    const obj = {
      limit: this.itemsPerBatch,
      order: this.orderBy,
      skip: offset,
      include: [{ relation: 'program', scope: { fields: ['Name'] } }]
    }
    this._ediTransactionApi.find(obj).subscribe(
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
        if (this.tableData) {
          this.filteredItems = this.tableData.slice();
        }
        this.loadingIndicator = false;
        this.setEmptyMessage();
        this._preloaderService.hidePreloader();
      },
      error => {
        this._alertService.warn('Oops! something went wrong.');
        this.loadingIndicator = false;
        this._preloaderService.hidePreloader();
      })
  }

  modifyData(data) {
    if (data.length) {
      data.forEach((item, index) => {
        item['AccountName'] = (item.AccountName) ? item.AccountName : '';
        item['ProgramName'] = (item.program && item.program.Name) ? item.program.Name : '';
        item['Type'] = (item.Type) ? item.Type : '';
        item['Message'] = (item.Message) ? item.Message : '';
        item['createdAt'] = (item.createdAt) ? this._utilityService.dateFormate(item.createdAt) : '';
      });
      return data;
    } else {
      return [];
    }
  }

  onDeleteClick(item) {
    const _thisEvnt = this;
    this._confirmDialogService.confirmThis(
      {
        title: 'Warning!!',
        titleIcon: 'mdi mdi-alert text-warning',
        text: 'Do you want to delete this Edi Transaction ?'
      },
      function () {
        _thisEvnt._preloaderService.showPreloader();
        _thisEvnt._ediTransactionApi.deleteById(item.id).subscribe(res => {
          _thisEvnt.isLoadMore = false;
          _thisEvnt.getEdiTransactionList(0);
          _thisEvnt._alertService.success('Edi Transaction deleted successfully!')
          _thisEvnt._preloaderService.hidePreloader();
        }, err => {
          _thisEvnt._alertService.warn('Oops! something went wrong.');
          _thisEvnt._preloaderService.hidePreloader();
        })
      },
      function () {
        // Do nothing on cancel
        _thisEvnt._preloaderService.hidePreloader();
      }
    );
  }


  openDetails(content, size, row) {
    this.singleRowData = row;
    this._modalService.open(content, size);
  }
  /*Data Table funcation start here*/

  loadMoreRecords() {
    this.isLoadMore = true;
    this.loadingIndicator = true;
    this.offset = this.tableData.length;
    this.getEdiTransactionList(this.tableData.length);
  }
  refreshView() {
    this.isLoadMore = false;
    this.table.offset = 0
    let inputs;
    let index;
    inputs = document.getElementById('dataTable').getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
      inputs[index].value = '';
    }
    this.getEdiTransactionList(0);
  }

  filterData(event) {
    if (event.target.value === '') {
      this.filterObj = this.__remove(this.filterObj, event.currentTarget.id);
    } else {
      this.filterObj[event.currentTarget.id] = event.target.value;
    }
    this.tableData = this.searchfilterData(this.filteredItems, this.filterObj);
    this.table.offset = 0;
    this.setEmptyMessage();
  }

  searchfilterData(items, filterObj) {
    return items.filter(item => {
      const notMatchingField = Object.keys(filterObj).find(key =>
        this.checkFilterValidity(item, filterObj, key));
      return !notMatchingField; // true if matches all fields
    });
  }

  private __remove(array, element) {
    if (array[element]) {
      delete array[element];
    }

    return array;
  }

  checkFilterValidity(a, b, c) {
    return this._utilityService.dataTableSearch(a, b, c);
  }

  setEmptyMessage() {
    const msg = 'No data to display.';
    if (!this.tableData.length) {
      this.tableData = [{
        'message': msg
      }];
      this.tableData[0][this.columns[0]['prop']] = msg;
    }
  }

  toggle(col) {
    col.visible = !col.visible;
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  exportCSV() {
    this._sharedservice.exportNgxData(this.tableData, this.columns, 'EdiTransactionList');
  }

}
