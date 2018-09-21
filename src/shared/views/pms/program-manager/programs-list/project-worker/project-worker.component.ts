import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SharedService } from '../../../../../services/pms/shared.services';
import { ProjectApi } from '../../../../../sdk';
import { UtilityService } from '../../../../../services/utility.service'

@Component({
  selector: 'project-worker',
  templateUrl: './project-worker.component.html',
  styleUrls: ['./project-worker.component.css']
})
export class ProjectWorkerComponent implements OnInit, AfterViewInit {
  userState: any;
  programName: string;
  // params for pagination
  tableData = [];
  loadingIndicator = false;
  itemsPerPage = 10;
  isLoadMore = false;
  itemsPerBatch = 200;
  errorMessage: any;
  columns: any[];
  allColumns: any[];
  @ViewChild('myTable') table: any;
  filterObj = {};
  filteredItems: any;
  noRecords: any;

  constructor(
    public _sharedservice: SharedService,
    private _project: ProjectApi,
    private _utilityService: UtilityService,
    private el: ElementRef
  ) { }

  ngAfterViewInit() {
    let elHeader = this.el.nativeElement.querySelector('.datatable-header')
    let elBody = this.el.nativeElement.querySelector('datatable-body');
    elHeader.onscroll = () => {
      elBody.scrollLeft = elHeader.scrollLeft
    }
    elBody.onscroll = () => {
      elHeader.scrollLeft = elBody.scrollLeft
    }
  }

  ngOnInit() {
    this.columns = [
      { name: 'Program Name', prop: 'programName', width: 350, visible: true, sortable: true },
      { name: 'Project Name', prop: 'Name', width: 350, visible: true, sortable: true },
      { name: 'Worker Name', prop: 'workerName', width: 300, visible: true, sortable: true },
      { name: 'Worker Email', prop: 'wokerEmail', width: 250, visible: true, sortable: true },
      { name: 'Worker Phone', prop: 'wokerPhone', width: 250, visible: true, sortable: true }

    ];
    this.allColumns = this.columns.slice(); // Used for Columns Toggling
    this._sharedservice.getUserState().subscribe(current => {
      this.userState = current;
      if (this.userState.program && this.userState.program.programSFId) {
        this.programName = this.userState.program.programName + ' (' + this.userState.program.programReferCode + ')';
        this.isLoadMore = false;
        this.loadProjectWorker(0);
      }
    });
  }

  loadProjectWorker(offset: number) {
    if (this.userState.program.programSFId) {
      const paramObj = {
        programId: this.userState.program.programSFId,
        limit: this.itemsPerBatch,
        skip: offset
      };
      this.loadingIndicator = true;
      this._project.getProjectWorker(paramObj)
        .subscribe(
          res => {
            const results = this.modifyData(res.data);
            this.noRecords = (results.length < this.itemsPerBatch) ? true : false;
            if (!this.isLoadMore) {
              this.tableData = results;
              this.errorMessage = results.length ? '' : 'No record found';
            } else {
              results.forEach(c => {
                this.tableData.push(c);
              });
              this.tableData = [...this.tableData];
            }
            if (this.tableData) {
              this.filteredItems = this.tableData.slice();
            }
            this.setEmptyMessage();
            this.loadingIndicator = false;
          },
          err => {
            this.errorMessage = err.Message;
            this.loadingIndicator = false;
          });
    } else {
      this.errorMessage = 'Project id Is missing !';
    }

  }

  modifyData(data) {
    if (data.length) {
      data.forEach(element => {
        element['programName'] = this.programName;
        element['workerName'] = (element['worker'] && element['worker']['worker'] && element['worker']['worker']['Contact'] && element['worker']['worker']['Contact']['LastName']) ? element['worker']['worker']['Contact']['LastName'] : '';
        element['workerEmail'] = (element['worker'] && element['worker']['worker'] && element['worker']['worker']['Contact'] && element['worker']['worker']['Contact']['Email']) ? element['worker']['worker']['Contact']['Email'] : '';
        element['wokerPhone'] = (element['worker'] && element['worker']['worker'] && element['worker']['worker']['Contact'] && element['worker']['worker']['Contact']['Phone']) ? element['worker']['worker']['Contact']['Phone'] : '';

      });
      return data;
    }
    else {
      return [];
    }

  }

  /*Data Table function start here*/
  loadMoreRecords() {
    this.isLoadMore = true;
    this.loadProjectWorker(this.tableData.length);
  }

  toggle1(col) {
    col.visible = !col.visible;
  }
  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  refreshView() {
    this.isLoadMore = false;
    this.table.offset = 0
    let inputs;
    let index;
    inputs = document.getElementById('dataTable1').getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
      inputs[index].value = '';
    }
    this.filterObj = {};
    this.loadProjectWorker(0);
  }

  filterData(event) {
    if (event.target.value === '') {
      this.filterObj = this.__remove(this.filterObj, event.currentTarget.id);
    } else {
      this.filterObj[event.currentTarget.id] = event.target.value;
    }
    this.tableData = this.filterDataTable(this.filteredItems, this.filterObj);
    this.table.offset = 0;
    this.setEmptyMessage();
  }

  filterDataTable(items, filterObj) {
    return items.filter(item => {
      let notMatchingField = Object.keys(filterObj).find(key =>
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

  exportCSV() {
    this._sharedservice.exportNgxData(this.tableData, this.columns, 'ProjectWorker');
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

}
