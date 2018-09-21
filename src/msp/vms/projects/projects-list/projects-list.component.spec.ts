import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProjectsListComponent } from './projects-list.component';
import { DataTableModule } from '@serviceo/ng-datatable';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectApi } from '../../../../sdk/services/custom/Project';
import { PreloaderService } from '../../../../services/preloader.service';
import { DataTable, DataTableResource } from '@serviceo/ng-datatable';
import { ModalService } from '../../../../services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ProjectsListComponent', () => {

  let comp: ProjectsListComponent;
  let fixture: ComponentFixture<ProjectsListComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const fakeErrorMessage = 'project';
  const fakepageTitle = 'fake poject title';
  const fakepageSubTitle = 'fake poject SubTitle';
  const fakeerrorMessage = 'fake Loading...';
  const faketableDataCount = 0;
  const fakeitemsPerPage = 20;
  const fakeisLoadMore = true;
  const fakeitemsPerBatch = 1000;
  const fakeorderBy = 'fake Name DESC';
  const faketableData = [{
    'sfdcId': 'a1x1a000001i01BAAQ',
    'APVP_Group_Number__c': 'A1',
    'APVP_Record_Count__c': '0.0',
    'Account__c': '0011a00000bGvDbAAK',
    'Customer_Service_Type__c': 'Desk-side Support',
    'Deadline__c': '2017-10-12T11:35:15.000Z',
    'Description__c': '.',
    'Duration__c': 1,
    'Field_Service_Program_Type__c': 'Dispatch FE',
    'Jobsite_Contact_Email_Service_Desk__c': 'dispatch3ps-vendor@serviceglobal.com',
    'Jobsite_Contact_Email_Technical_Esc__c': 'dispatch3ps-vendor@serviceglobal.com',
    'Jobsite_Contact_Name_Service_Desk__c': 'IRON Help Desk',
    'Jobsite_Contact_Name_Technical_Esc__c': 'IRON Help Desk',
    'Jobsite_Contact_Phone_Service_Desk__c': '0014089400940',
    'Jobsite_Contact_Phone_Technical_Esc__c': '0014089400940',
    'Jobsite_Contact_Selection__c': '(a) Use IRON Technical Escalation',
    'Kick_off__c': '2017-10-12T11:35:15.000Z',
    'Name': 'Yonezawa-shi (992-0021) - JPN -SG001705- IJS02168',
    'Partner_Name_Text__c': 'MagicLink Bank Corporation Client Demo',
    'Partner_Pricelist__c': '01s1a000002WN0UAAW',
    'Program_Activation__c': 'Yes',
    'Progress__c': '',
    'Project_Standard__c': '',
    'Project__c': 'PROJ-0631',
    'RecordTypeId': '0121a0000006QJEAA2',
    'Resource_Pool_Type_Used_for_backfill__c': 'Pool',
    'Service_Dispatch_SLA_Priority__c': 'P1 (SBD4H)',
    'Service_Technical_Level__c': 'L1',
    'SoW_Equipment_Tracking_Vendor__c': '',
    'Status__c': 'Active',
    'Vendor_Pricelist__c': '',
    'Vendor_Type__c': 'External',
    'CreatedDate': '2017-10-04T19:31:44.000Z',
    'Service_Description__c': '',
    'Special_Service_Instructions__c': '',
    'SOW_Description_Customer_Long__c': '',
    'Required_Tools__c': '',
    'Talent_Type__c': '',
    'SLA__c': 'NBD',
    'Geo_Code__c': null,
    'GEO_Country__c': '',
    'Product_Id__c': null,
    'Master_Project__c': 'a1x1a000000NSZhAAO',
    'Vendor__c': '0011a00000X9fsxAAB',
    'Lastmodifieddate': null,
    'id': 130,
    'createdAt': null,
    'updatedAt': '2017-12-05T18:58:56.453Z'
  },
  {
    'sfdcId': 'a1x1a000001i01BAAQ',
    'APVP_Group_Number__c': 'A1',
    'APVP_Record_Count__c': '0.0',
    'Account__c': '0011a00000bGvDbAAK',
    'Customer_Service_Type__c': 'Desk-side Support',
    'Deadline__c': '2017-10-12T11:35:15.000Z',
    'Description__c': '.',
    'Duration__c': 1,
    'Field_Service_Program_Type__c': 'Dispatch FE',
    'Jobsite_Contact_Email_Service_Desk__c': 'dispatch3ps-vendor@serviceglobal.com',
    'Jobsite_Contact_Email_Technical_Esc__c': 'dispatch3ps-vendor@serviceglobal.com',
    'Jobsite_Contact_Name_Service_Desk__c': 'IRON Help Desk',
    'Jobsite_Contact_Name_Technical_Esc__c': 'IRON Help Desk',
    'Jobsite_Contact_Phone_Service_Desk__c': '0014089400940',
    'Jobsite_Contact_Phone_Technical_Esc__c': '0014089400940',
    'Jobsite_Contact_Selection__c': '(a) Use IRON Technical Escalation',
    'Kick_off__c': '2017-10-12T11:35:15.000Z',
    'Name': 'Yonezawa-shi (992-0021) - JPN -SG001705- IJS02168',
    'Partner_Name_Text__c': 'MagicLink Bank Corporation Client Demo',
    'Partner_Pricelist__c': '01s1a000002WN0UAAW',
    'Program_Activation__c': 'Yes',
    'Progress__c': '',
    'Project_Standard__c': '',
    'Project__c': 'PROJ-0631',
    'RecordTypeId': '0121a0000006QJEAA2',
    'Resource_Pool_Type_Used_for_backfill__c': 'Pool',
    'Service_Dispatch_SLA_Priority__c': 'P1 (SBD4H)',
    'Service_Technical_Level__c': 'L1',
    'SoW_Equipment_Tracking_Vendor__c': '',
    'Status__c': 'Active',
    'Vendor_Pricelist__c': '',
    'Vendor_Type__c': 'External',
    'CreatedDate': '2017-10-04T19:31:44.000Z',
    'Service_Description__c': '',
    'Special_Service_Instructions__c': '',
    'SOW_Description_Customer_Long__c': '',
    'Required_Tools__c': '',
    'Talent_Type__c': '',
    'SLA__c': 'NBD',
    'Geo_Code__c': null,
    'GEO_Country__c': '',
    'Product_Id__c': null,
    'Master_Project__c': 'a1x1a000000NSZhAAO',
    'Vendor__c': '0011a00000X9fsxAAB',
    'Lastmodifieddate': null,
    'id': 130,
    'createdAt': null,
    'updatedAt': '2017-12-05T18:58:56.453Z'
  },
  {
    'sfdcId': 'a1x1a000001i01BAAQ',
    'APVP_Group_Number__c': 'A1',
    'APVP_Record_Count__c': '0.0',
    'Account__c': '0011a00000bGvDbAAK',
    'Customer_Service_Type__c': 'Desk-side Support',
    'Deadline__c': '2017-10-12T11:35:15.000Z',
    'Description__c': '.',
    'Duration__c': 1,
    'Field_Service_Program_Type__c': 'Dispatch FE',
    'Jobsite_Contact_Email_Service_Desk__c': 'dispatch3ps-vendor@serviceglobal.com',
    'Jobsite_Contact_Email_Technical_Esc__c': 'dispatch3ps-vendor@serviceglobal.com',
    'Jobsite_Contact_Name_Service_Desk__c': 'IRON Help Desk',
    'Jobsite_Contact_Name_Technical_Esc__c': 'IRON Help Desk',
    'Jobsite_Contact_Phone_Service_Desk__c': '0014089400940',
    'Jobsite_Contact_Phone_Technical_Esc__c': '0014089400940',
    'Jobsite_Contact_Selection__c': '(a) Use IRON Technical Escalation',
    'Kick_off__c': '2017-10-12T11:35:15.000Z',
    'Name': 'Yonezawa-shi (992-0021) - JPN -SG001705- IJS02168',
    'Partner_Name_Text__c': 'MagicLink Bank Corporation Client Demo',
    'Partner_Pricelist__c': '01s1a000002WN0UAAW',
    'Program_Activation__c': 'Yes',
    'Progress__c': '',
    'Project_Standard__c': '',
    'Project__c': 'PROJ-0631',
    'RecordTypeId': '0121a0000006QJEAA2',
    'Resource_Pool_Type_Used_for_backfill__c': 'Pool',
    'Service_Dispatch_SLA_Priority__c': 'P1 (SBD4H)',
    'Service_Technical_Level__c': 'L1',
    'SoW_Equipment_Tracking_Vendor__c': '',
    'Status__c': 'Active',
    'Vendor_Pricelist__c': '',
    'Vendor_Type__c': 'External',
    'CreatedDate': '2017-10-04T19:31:44.000Z',
    'Service_Description__c': '',
    'Special_Service_Instructions__c': '',
    'SOW_Description_Customer_Long__c': '',
    'Required_Tools__c': '',
    'Talent_Type__c': '',
    'SLA__c': 'NBD',
    'Geo_Code__c': null,
    'GEO_Country__c': '',
    'Product_Id__c': null,
    'Master_Project__c': 'a1x1a000000NSZhAAO',
    'Vendor__c': '0011a00000X9fsxAAB',
    'Lastmodifieddate': null,
    'id': 130,
    'createdAt': null,
    'updatedAt': '2017-12-05T18:58:56.453Z'
  }];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsListComponent],
      imports: [DataTableModule, RouterModule, RouterTestingModule, NgbModule.forRoot()],
      providers: [{ provide: ProjectApi, useValue: faketableData }, PreloaderService, ModalService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsListComponent);
    comp = fixture.componentInstance;
    this.projectApi = TestBed.get(ProjectApi);
    de = fixture.debugElement.query(By.css('h3'));
    el = de.nativeElement;
    // fixture.detectChanges();
  });
  afterEach((done) => {
    fixture.componentInstance.ngOnDestroy();
    done();
  });

  function getFakeProjectsList(offset: number) {
    const filterData = faketableData.slice(offset, comp.itemsPerBatch);
    if (!comp.isLoadMore) {
      comp.tableData = filterData;
      comp.tableResource = new DataTableResource(filterData);
      comp.errorMessage = comp.tableData.length > 0 ? '' : 'Project not available.';
    } else {
      comp.tableResource.add(filterData);
    }
    comp.tableResource.count().then(count => (comp.tableDataCount = count));
    return filterData;
  }

  it('should instantiate ProjectsListComponent', () => {
    expect(fixture.componentInstance instanceof ProjectsListComponent).toBe(true, 'should create Projects List component');
  });

  it('should test fake title of ProjectListComponent', () => {
    comp.pageTitle = fakepageTitle;
    comp.pageSubTitle = fakepageSubTitle;
    expect(comp.pageTitle).toBe(fakepageTitle, 'fake test project title');
    expect(comp.pageSubTitle).toBe(fakepageSubTitle, 'fake test project Sub title');
  });

  it('should have assign data in `tableData` of ProjectListComponent', () => {
    comp.tableData = faketableData;
    expect(comp.tableData).toBe(faketableData, 'fake table data');
  });

  it('should error message of ProjectListComponent', () => {
    comp.errorMessage = fakeErrorMessage;
    expect(comp.errorMessage).toEqual(fakeErrorMessage, 'fake error meggage');
  })

  it('should test variable of ProjectListComponent', () => {
    comp.tableDataCount = faketableDataCount;
    comp.itemsPerPage = fakeitemsPerPage;
    comp.isLoadMore = fakeisLoadMore;
    comp.itemsPerBatch = fakeitemsPerBatch;
    comp.orderBy = fakeorderBy;
    expect(comp.tableDataCount).toBeDefined('test table data count');
    expect(comp.itemsPerPage).toBeDefined('test item per page');
    expect(comp.isLoadMore).toBeDefined('test is load more');
    expect(comp.itemsPerBatch).toBeDefined('test item per batch');
    expect(comp.orderBy).toBeDefined('test order by');
    expect(comp.tableDataCount).not.toBeNull('test not table data count');
    expect(comp.itemsPerPage).not.toBeNull('test not items per page');
    expect(comp.isLoadMore).not.toBeNull('test not is load more');
    expect(comp.itemsPerBatch).not.toBeNull('test not items per batch');
    expect(comp.orderBy).not.toBeNull('test not order by');
  })

  it('should test fake variable of ProjectListComponent', () => {
    comp.tableDataCount = faketableDataCount;
    comp.itemsPerPage = fakeitemsPerPage;
    comp.isLoadMore = fakeisLoadMore;
    comp.itemsPerBatch = fakeitemsPerBatch;
    comp.orderBy = fakeorderBy;
    expect(comp.tableDataCount).toBe(faketableDataCount, 'fake test tableDataCount');
    expect(comp.itemsPerPage).toBe(fakeitemsPerPage, 'fake test itemsPerPage');
    expect(comp.isLoadMore).toBe(fakeisLoadMore, 'fake test isLoadMore');
    expect(comp.itemsPerBatch).toBe(fakeitemsPerBatch, 'fake test itemsPerBatch');
    expect(comp.orderBy).toBe(fakeorderBy, 'fake test orderBy');
  })
  it('should have call `getFakeProjectsList` of ProjectListComponent', () => {
    comp.itemsPerBatch = 2;
    const filteredData = getFakeProjectsList(0);
    expect(comp.tableData).toBeDefined('test to be defined data table');
    expect(comp.tableData).not.toBeNull('test not to be null data table');
    expect(comp.tableData).toBe(filteredData, 'fake  getFakeProjectsList call');
    expect(comp.tableData.length).toEqual(comp.itemsPerBatch, 'test to equal filtered data lenght or table data count')
  });
});
