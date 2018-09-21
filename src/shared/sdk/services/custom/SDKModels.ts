/* tslint:disable */
import { Injectable } from '@angular/core';
import { Account } from '../../models/Account';
import { Job } from '../../models/Job';
import { JobInstruction } from '../../models/JobInstruction';
import { JobComment } from '../../models/JobComment';
import { Timecard } from '../../models/Timecard';
import { Users } from '../../models/Users';
import { Payment } from '../../models/Payment';
import { Invoice } from '../../models/Invoice';
import { PurchaseOrder } from '../../models/PurchaseOrder';
import { PurchaseOrderItem } from '../../models/PurchaseOrderItem';
import { Pricelist } from '../../models/Pricelist';
import { PricelistItem } from '../../models/PricelistItem';
import { Jobsite } from '../../models/Jobsite';
import { Document } from '../../models/Document';
import { DocumentShare } from '../../models/DocumentShare';
import { Timezone } from '../../models/Timezone';
import { UserType } from '../../models/UserType';
import { Country } from '../../models/Country';
import { Deliverable } from '../../models/Deliverable';
import { Vendorsite } from '../../models/Vendorsite';
import { VendorsiteContact } from '../../models/VendorsiteContact';
import { Appointment } from '../../models/Appointment';
import { Worker } from '../../models/Worker';
import { Container } from '../../models/Container';
import { DocumentCategory } from '../../models/DocumentCategory';
import { DocumentTitle } from '../../models/DocumentTitle';
import { Skill } from '../../models/Skill';
import { UserSkill } from '../../models/UserSkill';
import { Project } from '../../models/Project';
import { Case } from '../../models/Case';
import { JobsiteProjects } from '../../models/JobsiteProjects';
import { Product } from '../../models/Product';
import { ApprovedProjectVendorPool } from '../../models/ApprovedProjectVendorPool';
import { Contact } from '../../models/Contact';
import { CountryCode } from '../../models/CountryCode';
import { GeoMetro } from '../../models/GeoMetro';
import { JobsiteContact } from '../../models/JobsiteContact';
import { TalentType } from '../../models/TalentType';
import { WorkOrder } from '../../models/WorkOrder';
import { QuoteLineManager } from '../../models/QuoteLineManager';
import { QuoteManager } from '../../models/QuoteManager';
import { MetroVirtualVendorPool } from '../../models/MetroVirtualVendorPool';
import { JobOrderItem } from '../../models/JobOrderItem';
import { ServiceCategorySetting } from '../../models/ServiceCategorySetting';
import { RecordType } from '../../models/RecordType';
import { CaseComment } from '../../models/CaseComment';
import { Workflow } from '../../models/Workflow';
import { WorkflowStage } from '../../models/WorkflowStage';
import { WorkflowStatus } from '../../models/WorkflowStatus';
import { WorkflowTransition } from '../../models/WorkflowTransition';
import { Order } from '../../models/Order';
import { FilterService } from '../../models/FilterService';
import { Dashboard } from '../../models/Dashboard';
import { RequestFormReceipt } from '../../models/RequestFormReceipt';
import { RequestFormReceiptLine } from '../../models/RequestFormReceiptLine';
import { IronCustomField } from '../../models/IronCustomField';
import { Asset } from '../../models/Asset';
import { Skilling } from '../../models/Skilling';
import { CsqdCaseComment } from '../../models/CsqdCaseComment';
import { AssetGroup } from '../../models/AssetGroup';
import { Contract } from '../../models/Contract';
import { Attachment } from '../../models/Attachment';
import { PmsIccPmcRecordTypeMapping } from '../../models/PmsIccPmcRecordTypeMapping';
import { GeoMessage } from '../../models/GeoMessage';
import { SupportedAssetModelNumbers } from '../../models/SupportedAssetModelNumbers';
import { FSLFRUTransactionList } from '../../models/FSLFRUTransactionList';
import { MapSettings } from '../../models/MapSettings';
import { NeighboringCountries } from '../../models/NeighboringCountries';
import { NeighboringCountriesHeader } from '../../models/NeighboringCountriesHeader';
import { GeoSessionLog } from '../../models/GeoSessionLog';
import { CsqdActivity } from '../../models/CsqdActivity';
import { ServiceActivityMapping } from '../../models/ServiceActivityMapping';
import { GoogleService } from '../../models/GoogleService';
import { WorkflowStageLog } from '../../models/WorkflowStageLog';
import { VatMaster } from '../../models/VatMaster';
import { Alert } from '../../models/Alert';
import { UserAlert } from '../../models/UserAlert';
import { Activity } from '../../models/Activity';
import { ProjectWorker } from '../../models/ProjectWorker';
import { Comment } from '../../models/Comment';
import { Department } from '../../models/Department';
import { EmailService } from '../../models/EmailService';
import { OrderItem } from '../../models/OrderItem';
import { ContactType } from '../../models/ContactType';
import { AccessControl } from '../../models/AccessControl';
import { Assignment } from '../../models/Assignment';
import { DepartmentRole } from '../../models/DepartmentRole';
import { Group } from '../../models/Group';
import { MemberRole } from '../../models/MemberRole';
import { Milestone } from '../../models/Milestone';
import { ProgramGroup } from '../../models/ProgramGroup';
import { Program } from '../../models/Program';
import { Project2 } from '../../models/Project2';
import { Task } from '../../models/Task';
import { WorkerShift } from '../../models/WorkerShift';
import { Channel } from '../../models/Channel';
import { ConversationFile } from '../../models/ConversationFile';
import { ConversationParticipant } from '../../models/ConversationParticipant';
import { ConversationRelation } from '../../models/ConversationRelation';
import { ConversationTracker } from '../../models/ConversationTracker';
import { Conversation } from '../../models/Conversation';
import { FileCategory } from '../../models/FileCategory';
import { Files } from '../../models/Files';
import { LibraryDetail } from '../../models/LibraryDetail';
import { LibraryHeader } from '../../models/LibraryHeader';
import { Library } from '../../models/Library';
import { TaskAttribute } from '../../models/TaskAttribute';
import { TaskGroupAttribute } from '../../models/TaskGroupAttribute';
import { TaskGroup } from '../../models/TaskGroup';
import { EdiTransaction } from '../../models/EdiTransaction';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Account: Account,
    Job: Job,
    JobInstruction: JobInstruction,
    JobComment: JobComment,
    Timecard: Timecard,
    Users: Users,
    Payment: Payment,
    Invoice: Invoice,
    PurchaseOrder: PurchaseOrder,
    PurchaseOrderItem: PurchaseOrderItem,
    Pricelist: Pricelist,
    PricelistItem: PricelistItem,
    Jobsite: Jobsite,
    Document: Document,
    DocumentShare: DocumentShare,
    Timezone: Timezone,
    UserType: UserType,
    Country: Country,
    Deliverable: Deliverable,
    Vendorsite: Vendorsite,
    VendorsiteContact: VendorsiteContact,
    Appointment: Appointment,
    Worker: Worker,
    Container: Container,
    DocumentCategory: DocumentCategory,
    DocumentTitle: DocumentTitle,
    Skill: Skill,
    UserSkill: UserSkill,
    Project: Project,
    Case: Case,
    JobsiteProjects: JobsiteProjects,
    Product: Product,
    ApprovedProjectVendorPool: ApprovedProjectVendorPool,
    Contact: Contact,
    CountryCode: CountryCode,
    GeoMetro: GeoMetro,
    JobsiteContact: JobsiteContact,
    TalentType: TalentType,
    WorkOrder: WorkOrder,
    QuoteLineManager: QuoteLineManager,
    QuoteManager: QuoteManager,
    MetroVirtualVendorPool: MetroVirtualVendorPool,
    JobOrderItem: JobOrderItem,
    ServiceCategorySetting: ServiceCategorySetting,
    RecordType: RecordType,
    CaseComment: CaseComment,
    Workflow: Workflow,
    WorkflowStage: WorkflowStage,
    WorkflowStatus: WorkflowStatus,
    WorkflowTransition: WorkflowTransition,
    Order: Order,
    FilterService: FilterService,
    Dashboard: Dashboard,
    RequestFormReceipt: RequestFormReceipt,
    RequestFormReceiptLine: RequestFormReceiptLine,
    IronCustomField: IronCustomField,
    Asset: Asset,
    Skilling: Skilling,
    CsqdCaseComment: CsqdCaseComment,
    AssetGroup: AssetGroup,
    Contract: Contract,
    Attachment: Attachment,
    PmsIccPmcRecordTypeMapping: PmsIccPmcRecordTypeMapping,
    GeoMessage: GeoMessage,
    SupportedAssetModelNumbers: SupportedAssetModelNumbers,
    FSLFRUTransactionList: FSLFRUTransactionList,
    MapSettings: MapSettings,
    NeighboringCountries: NeighboringCountries,
    NeighboringCountriesHeader: NeighboringCountriesHeader,
    GeoSessionLog: GeoSessionLog,
    CsqdActivity: CsqdActivity,
    ServiceActivityMapping: ServiceActivityMapping,
    GoogleService: GoogleService,
    WorkflowStageLog: WorkflowStageLog,
    VatMaster: VatMaster,
    Alert: Alert,
    UserAlert: UserAlert,
    Activity: Activity,
    ProjectWorker: ProjectWorker,
    Comment: Comment,
    Department: Department,
    EmailService: EmailService,
    OrderItem: OrderItem,
    ContactType: ContactType,
    AccessControl: AccessControl,
    Assignment: Assignment,
    DepartmentRole: DepartmentRole,
    Group: Group,
    MemberRole: MemberRole,
    Milestone: Milestone,
    ProgramGroup: ProgramGroup,
    Program: Program,
    Project2: Project2,
    Task: Task,
    WorkerShift: WorkerShift,
    Channel: Channel,
    ConversationFile: ConversationFile,
    ConversationParticipant: ConversationParticipant,
    ConversationRelation: ConversationRelation,
    ConversationTracker: ConversationTracker,
    Conversation: Conversation,
    FileCategory: FileCategory,
    Files: Files,
    LibraryDetail: LibraryDetail,
    LibraryHeader: LibraryHeader,
    Library: Library,
    TaskAttribute: TaskAttribute,
    TaskGroupAttribute: TaskGroupAttribute,
    TaskGroup: TaskGroup,
    EdiTransaction: EdiTransaction,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
