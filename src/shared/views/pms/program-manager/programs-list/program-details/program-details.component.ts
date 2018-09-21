import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SharedService } from '../../../../../services/pms/shared.services';
import { ProjectApi, JobsiteProjectsApi, ApprovedProjectVendorPoolApi } from './../../../../../sdk';
import { UtilityService } from '../../../../../services/utility.service'

@Component({
  selector: 'program-details',
  templateUrl: './program-details.component.html',
})
export class ProgramDetailsComponent implements OnInit, AfterViewInit {
  userState: any;
  programName: string;

  // setup for pagination
  tableData = [];
  loadingIndicator = false;
  isLoadMore = false;
  itemsPerBatch = 200;
  errorMessage: any;
  columns: any[];
  allColumns: any[];
  @ViewChild('myTable') table: any;
  filterObj = {};
  filteredItems: any;
  noRecords = false;

  constructor(
    public _sharedservice: SharedService,
    private _projectApi: ProjectApi,
    private _jobsiteProjectsApi: JobsiteProjectsApi,
    private _approvedProjectVendorPool: ApprovedProjectVendorPoolApi,
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
      { name: 'Program Name', prop: 'programName', width: 400, visible: true, sortable: true },
      { name: 'Jobsite Name', prop: 'Jobsite_Name', width: 150, visible: true, sortable: true },
      { name: 'Service Dispatch SLA Priority', prop: 'Dispatch_SLA', width: 200, visible: true, sortable: true },
      {
        name: 'Talent Type', prop: 'Talent_Type',
        width: 150, visible: true, sortable: true
      },
      { name: 'Service Technical Level', prop: 'Technical_Level', width: 200, visible: true, sortable: true },
      { name: 'Service Location', prop: 'Service_Location', width: 150, visible: true, sortable: true },
      {
        name: 'APVP Routing',
        prop: 'APVP_Routing', width: 150, visible: true, sortable: true
      },
      { name: 'Community Type', prop: 'CommunityType', width: 150, visible: true, sortable: true },
      { name: 'Distribution Type', prop: 'DistributionType', width: 150, visible: true, sortable: true },
      { name: 'Global Talent Pool', prop: 'GlobalTalentPoolName', width: 150, visible: true, sortable: true }
    ];
    this.allColumns = this.columns.slice(); // Used for Columns Toggling

    this._sharedservice.getUserState().subscribe(current => {
      this.userState = current;
      if (this.userState.program && this.userState.program.programSFId) {
        this.programName = this.userState.program.programName + ' (' + this.userState.program.programReferCode + ')';
        this.isLoadMore = false;
        this.loadSelectedProgramDetails(0);
      }
    });
  }

  loadSelectedProgramDetails(offset: number) {
    this.loadingIndicator = true;
    const paramObj = {
      programId: this.userState.program.programSFId,
      source: 'program-details',
      limit: this.itemsPerBatch,
      skip: offset
    };
    this._jobsiteProjectsApi
      .getJobsiteProjectsByMasterProject(paramObj)
      .subscribe(
        data => {
          // const results = data ? data.jobsiteProjects : [];
          const results = this.modifyData(data.jobsiteProjects);
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
        }

      );
  }

  modifyData(data) {
    if (data.length) {
      data.forEach(element => {
        element['programName'] = this.programName;
      });
      return data;
    }
    else {
      return [];
    }

  }


  /*Data Table funcation start here*/
  loadMoreRecords() {
    this.isLoadMore = true;
    this.loadSelectedProgramDetails(this.tableData.length);
  }

  toggle(col) {
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
    inputs = document.querySelector('div.datatable-row-center').getElementsByTagName('input');
    for (index = 0; index < inputs.length; ++index) {
      inputs[index].value = '';
    }
    this.filterObj = {};
    this.loadSelectedProgramDetails(0);
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
    this._sharedservice.exportNgxData(this.tableData, this.columns, 'ProgramDetails');
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
