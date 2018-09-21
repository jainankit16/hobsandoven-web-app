/* tslint:disable */
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root 
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { SocketBrowser } from './sockets/socket.browser';
import { SocketDriver } from './sockets/socket.driver';
import { SocketConnection } from './sockets/socket.connections';
import { RealTime } from './services/core/real.time';
import { AccountApi } from './services/custom/Account';
import { JobApi } from './services/custom/Job';
import { JobInstructionApi } from './services/custom/JobInstruction';
import { JobCommentApi } from './services/custom/JobComment';
import { TimecardApi } from './services/custom/Timecard';
import { UsersApi } from './services/custom/Users';
import { PaymentApi } from './services/custom/Payment';
import { InvoiceApi } from './services/custom/Invoice';
import { PurchaseOrderApi } from './services/custom/PurchaseOrder';
import { PurchaseOrderItemApi } from './services/custom/PurchaseOrderItem';
import { PricelistApi } from './services/custom/Pricelist';
import { PricelistItemApi } from './services/custom/PricelistItem';
import { JobsiteApi } from './services/custom/Jobsite';
import { DocumentApi } from './services/custom/Document';
import { DocumentShareApi } from './services/custom/DocumentShare';
import { TimezoneApi } from './services/custom/Timezone';
import { UserTypeApi } from './services/custom/UserType';
import { CountryApi } from './services/custom/Country';
import { DeliverableApi } from './services/custom/Deliverable';
import { VendorsiteApi } from './services/custom/Vendorsite';
import { VendorsiteContactApi } from './services/custom/VendorsiteContact';
import { AppointmentApi } from './services/custom/Appointment';
import { WorkerApi } from './services/custom/Worker';
import { ContainerApi } from './services/custom/Container';
import { DocumentCategoryApi } from './services/custom/DocumentCategory';
import { DocumentTitleApi } from './services/custom/DocumentTitle';
import { SkillApi } from './services/custom/Skill';
import { UserSkillApi } from './services/custom/UserSkill';
import { ProjectApi } from './services/custom/Project';
import { CaseApi } from './services/custom/Case';
import { JobsiteProjectsApi } from './services/custom/JobsiteProjects';
import { ProductApi } from './services/custom/Product';
import { ApprovedProjectVendorPoolApi } from './services/custom/ApprovedProjectVendorPool';
import { ContactApi } from './services/custom/Contact';
import { CountryCodeApi } from './services/custom/CountryCode';
import { GeoMetroApi } from './services/custom/GeoMetro';
import { JobsiteContactApi } from './services/custom/JobsiteContact';
import { TalentTypeApi } from './services/custom/TalentType';
import { WorkOrderApi } from './services/custom/WorkOrder';
import { QuoteLineManagerApi } from './services/custom/QuoteLineManager';
import { QuoteManagerApi } from './services/custom/QuoteManager';
import { MetroVirtualVendorPoolApi } from './services/custom/MetroVirtualVendorPool';
import { JobOrderItemApi } from './services/custom/JobOrderItem';
import { ServiceCategorySettingApi } from './services/custom/ServiceCategorySetting';
import { RecordTypeApi } from './services/custom/RecordType';
import { CaseCommentApi } from './services/custom/CaseComment';
import { WorkflowApi } from './services/custom/Workflow';
import { WorkflowStageApi } from './services/custom/WorkflowStage';
import { WorkflowStatusApi } from './services/custom/WorkflowStatus';
import { WorkflowTransitionApi } from './services/custom/WorkflowTransition';
import { OrderApi } from './services/custom/Order';
import { FilterServiceApi } from './services/custom/FilterService';
import { DashboardApi } from './services/custom/Dashboard';
import { RequestFormReceiptApi } from './services/custom/RequestFormReceipt';
import { RequestFormReceiptLineApi } from './services/custom/RequestFormReceiptLine';
import { IronCustomFieldApi } from './services/custom/IronCustomField';
import { AssetApi } from './services/custom/Asset';
import { SkillingApi } from './services/custom/Skilling';
import { CsqdCaseCommentApi } from './services/custom/CsqdCaseComment';
import { AssetGroupApi } from './services/custom/AssetGroup';
import { ContractApi } from './services/custom/Contract';
import { AttachmentApi } from './services/custom/Attachment';
import { PmsIccPmcRecordTypeMappingApi } from './services/custom/PmsIccPmcRecordTypeMapping';
import { GeoMessageApi } from './services/custom/GeoMessage';
import { SupportedAssetModelNumbersApi } from './services/custom/SupportedAssetModelNumbers';
import { FSLFRUTransactionListApi } from './services/custom/FSLFRUTransactionList';
import { MapSettingsApi } from './services/custom/MapSettings';
import { NeighboringCountriesApi } from './services/custom/NeighboringCountries';
import { NeighboringCountriesHeaderApi } from './services/custom/NeighboringCountriesHeader';
import { GeoSessionLogApi } from './services/custom/GeoSessionLog';
import { CsqdActivityApi } from './services/custom/CsqdActivity';
import { ServiceActivityMappingApi } from './services/custom/ServiceActivityMapping';
import { GoogleServiceApi } from './services/custom/GoogleService';
import { WorkflowStageLogApi } from './services/custom/WorkflowStageLog';
import { VatMasterApi } from './services/custom/VatMaster';
import { AlertApi } from './services/custom/Alert';
import { UserAlertApi } from './services/custom/UserAlert';
import { ActivityApi } from './services/custom/Activity';
import { ProjectWorkerApi } from './services/custom/ProjectWorker';
import { CommentApi } from './services/custom/Comment';
import { DepartmentApi } from './services/custom/Department';
import { EmailServiceApi } from './services/custom/EmailService';
import { OrderItemApi } from './services/custom/OrderItem';
import { ContactTypeApi } from './services/custom/ContactType';
import { AccessControlApi } from './services/custom/AccessControl';
import { AssignmentApi } from './services/custom/Assignment';
import { DepartmentRoleApi } from './services/custom/DepartmentRole';
import { GroupApi } from './services/custom/Group';
import { MemberRoleApi } from './services/custom/MemberRole';
import { MilestoneApi } from './services/custom/Milestone';
import { ProgramGroupApi } from './services/custom/ProgramGroup';
import { ProgramApi } from './services/custom/Program';
import { Project2Api } from './services/custom/Project2';
import { TaskApi } from './services/custom/Task';
import { WorkerShiftApi } from './services/custom/WorkerShift';
import { ChannelApi } from './services/custom/Channel';
import { ConversationFileApi } from './services/custom/ConversationFile';
import { ConversationParticipantApi } from './services/custom/ConversationParticipant';
import { ConversationRelationApi } from './services/custom/ConversationRelation';
import { ConversationTrackerApi } from './services/custom/ConversationTracker';
import { ConversationApi } from './services/custom/Conversation';
import { FileCategoryApi } from './services/custom/FileCategory';
import { FilesApi } from './services/custom/Files';
import { LibraryDetailApi } from './services/custom/LibraryDetail';
import { LibraryHeaderApi } from './services/custom/LibraryHeader';
import { LibraryApi } from './services/custom/Library';
import { TaskAttributeApi } from './services/custom/TaskAttribute';
import { TaskGroupAttributeApi } from './services/custom/TaskGroupAttribute';
import { TaskGroupApi } from './services/custom/TaskGroup';
import { EdiTransactionApi } from './services/custom/EdiTransaction';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler,
    SocketConnection
  ]
})
export class SDKBrowserModule {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        SDKModels,
        RealTime,
        AccountApi,
        JobApi,
        JobInstructionApi,
        JobCommentApi,
        TimecardApi,
        UsersApi,
        PaymentApi,
        InvoiceApi,
        PurchaseOrderApi,
        PurchaseOrderItemApi,
        PricelistApi,
        PricelistItemApi,
        JobsiteApi,
        DocumentApi,
        DocumentShareApi,
        TimezoneApi,
        UserTypeApi,
        CountryApi,
        DeliverableApi,
        VendorsiteApi,
        VendorsiteContactApi,
        AppointmentApi,
        WorkerApi,
        ContainerApi,
        DocumentCategoryApi,
        DocumentTitleApi,
        SkillApi,
        UserSkillApi,
        ProjectApi,
        CaseApi,
        JobsiteProjectsApi,
        ProductApi,
        ApprovedProjectVendorPoolApi,
        ContactApi,
        CountryCodeApi,
        GeoMetroApi,
        JobsiteContactApi,
        TalentTypeApi,
        WorkOrderApi,
        QuoteLineManagerApi,
        QuoteManagerApi,
        MetroVirtualVendorPoolApi,
        JobOrderItemApi,
        ServiceCategorySettingApi,
        RecordTypeApi,
        CaseCommentApi,
        WorkflowApi,
        WorkflowStageApi,
        WorkflowStatusApi,
        WorkflowTransitionApi,
        OrderApi,
        FilterServiceApi,
        DashboardApi,
        RequestFormReceiptApi,
        RequestFormReceiptLineApi,
        IronCustomFieldApi,
        AssetApi,
        SkillingApi,
        CsqdCaseCommentApi,
        AssetGroupApi,
        ContractApi,
        AttachmentApi,
        PmsIccPmcRecordTypeMappingApi,
        GeoMessageApi,
        SupportedAssetModelNumbersApi,
        FSLFRUTransactionListApi,
        MapSettingsApi,
        NeighboringCountriesApi,
        NeighboringCountriesHeaderApi,
        GeoSessionLogApi,
        CsqdActivityApi,
        ServiceActivityMappingApi,
        GoogleServiceApi,
        WorkflowStageLogApi,
        VatMasterApi,
        AlertApi,
        UserAlertApi,
        ActivityApi,
        ProjectWorkerApi,
        CommentApi,
        DepartmentApi,
        EmailServiceApi,
        OrderItemApi,
        ContactTypeApi,
        AccessControlApi,
        AssignmentApi,
        DepartmentRoleApi,
        GroupApi,
        MemberRoleApi,
        MilestoneApi,
        ProgramGroupApi,
        ProgramApi,
        Project2Api,
        TaskApi,
        WorkerShiftApi,
        ChannelApi,
        ConversationFileApi,
        ConversationParticipantApi,
        ConversationRelationApi,
        ConversationTrackerApi,
        ConversationApi,
        FileCategoryApi,
        FilesApi,
        LibraryDetailApi,
        LibraryHeaderApi,
        LibraryApi,
        TaskAttributeApi,
        TaskGroupAttributeApi,
        TaskGroupApi,
        EdiTransactionApi,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser },
        { provide: SocketDriver, useClass: SocketBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';

