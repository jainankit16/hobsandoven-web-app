import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AccountsListComponent } from './accounts-list.component';
import { DataTableModule } from '@serviceo/ng-datatable';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountApi } from '../../sdk/services/custom/Account';
import { SDKBrowserModule } from '../../sdk/index'
import { PreloaderService } from '../../services/preloader.service';
import { DataTable, DataTableResource } from '@serviceo/ng-datatable';
import { RouterLinkStubDirective } from '../../test/routerlinkstub.directive';
import { ModalService } from '../../services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


describe('AccountsListComponent', () => {

  let comp: AccountsListComponent;
  let fixture: ComponentFixture<AccountsListComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let linkDes: any;
  let links: any;
  const fakeErrorMessage = 'account';
  const fakepageTitle = 'fake account title';
  const fakepageSubTitle = 'fake account SubTitle';
  const fakeerrorMessage = 'fake Loading...';
  const faketableDataCount = 0;
  const fakeitemsPerPage = 20;
  const fakeisLoadMore = true;
  const fakeitemsPerBatch = 1000;
  const fakeorderBy = 'fake Name DESC';
  const faketableData = [{
    'sfdcId': '0011a00000o68J1AAI',
    'AccountSource': null,
    'Business_Size_c__c': 'Not Known',
    'CreatedDate': '2018-01-26T15:57:07.000Z',
    'IsPartner': false,
    'Name': 'Black & Veatch Corporation (25 Serangoon )',
    'Service_Global_Ref__c': 'SG026511',
    'Vendor_Type__c': null
  }, {
    'sfdcId': '0011a00000nXlljAAC',
    'AccountSource': null,
    'Business_Size_c__c': 'Not Known',
    'CreatedDate': '2018-01-23T14:28:51.000Z',
    'IsPartner': false,
    'Name': 'Efif (Sonderhoj 9)',
    'Service_Global_Ref__c': 'SG026510',
    'Vendor_Type__c': null
  }, {
    'sfdcId': '0011a00000nXkCZAA0',
    'AccountSource': null,
    'Business_Size_c__c': 'Not Known',
    'CreatedDate': '2018-01-23T09:15:53.000Z',
    'IsPartner': false,
    'Name': 'Centro Hospitalar São João (Lagoas Park, )',
    'Service_Global_Ref__c': 'SG026509',
    'Vendor_Type__c': null
  }, {
    'sfdcId': '0011a00000nXfTJAA0',
    'AccountSource': null,
    'Business_Size_c__c': 'Not Known',
    'CreatedDate': '2018-01-22T21:56:33.000Z',
    'IsPartner': false,
    'Name': 'AdvanceCare - Gestao de Serviços de, Saude, S.A (Rua Alfredo G)',
    'Service_Global_Ref__c': 'SG026508',
    'Vendor_Type__c': null
  }];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsListComponent, RouterLinkStubDirective],
      imports: [DataTableModule, RouterModule, SDKBrowserModule.forRoot(), RouterTestingModule, NgbModule.forRoot()],
      providers: [AccountApi, PreloaderService, Location, ModalService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AccountsListComponent);
    comp = fixture.componentInstance;
  });

  afterEach((done) => {
    fixture.componentInstance.ngOnDestroy();
    done();
  });

  function getFakeAccountList(offset: number) {
    const filterData = faketableData.slice(offset, comp.itemsPerBatch);
    if (!comp.isLoadMore) {
      comp.tableData = filterData;
      comp.tableResource = new DataTableResource(filterData);
      comp.errorMessage = comp.tableData.length > 0 ? '' : 'account not available.';
    } else {
      comp.tableResource.add(filterData);
    }
    comp.tableResource.count().then(count => (comp.tableDataCount = count));
    return filterData;
  }

  it('should instantiate AccountsListComponent', () => {
    expect(fixture.componentInstance instanceof AccountsListComponent).toBe(true, 'should create account List Component');
  });

  // it('should get the RouterLinks from template', () => {
  //   comp.itemsPerBatch = 2;
  //   const filteredData = getFakeAccountList(0);
  //   fixture.detectChanges();
  //   linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
  //   links = linkDes.map(deR => deR.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  //   expect(links.length).toEqual(2, 'should have 2 links');
  //   expect(links[0].linkParams).toContain('/vms/accounts', '1st link should go to accounts');
  //   expect(links[1].linkParams).toContain('/vms/accounts', '2nd link should go to accounts');
  // });

  it('should test fake title of AccountsListComponent', () => {
    comp.pageTitle = fakepageTitle;
    comp.pageSubTitle = fakepageSubTitle;
    expect(comp.pageTitle).toBe(fakepageTitle, 'fake test account title');
    expect(comp.pageSubTitle).toBe(fakepageSubTitle, 'fake test account Sub title');
  });

  it('should have assign data in `tableData` of AccountsListComponent', () => {
    comp.tableData = faketableData;
    expect(comp.tableData).toBe(faketableData, 'fake table data');
  });

  it('should error message of AccountsListComponent', () => {
    comp.errorMessage = fakeErrorMessage;
    expect(comp.errorMessage).toEqual(fakeErrorMessage, 'fake error meggage');
  })

  it('should test variable of AccountsListComponent', () => {
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

  it('should test fake variable of AccountsListComponent', () => {
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
  it('should have call `getFakeAccountList` of AccountsListComponent', () => {
    comp.itemsPerBatch = 2;
    const filteredData = getFakeAccountList(0);
    expect(comp.tableData).toBeDefined('test to be defined data table');
    expect(comp.tableData).not.toBeNull('test not to be null data table');
    expect(comp.tableData).toBe(filteredData, 'fake  getFakeAccountList call');
    expect(comp.tableData.length).toEqual(comp.itemsPerBatch, 'test to equal filtered data lenght or table data count')
  });
});
