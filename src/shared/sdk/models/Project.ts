/* tslint:disable */
import {
  Account,
  Pricelist,
  Jobsite,
  JobsiteProjects,
  GeoMetro,
  TalentType,
  QuoteManager,
  RecordType
} from '../index';

declare var Object: any;
export interface ProjectInterface {
  "sfdcId"?: string;
  "APVP_Group_Number__c"?: string;
  "APVP_Record_Count__c"?: string;
  "Account__c"?: string;
  "Customer_Service_Type__c"?: string;
  "Deadline__c"?: Date;
  "Description__c"?: string;
  "Duration__c"?: number;
  "Field_Service_Program_Type__c"?: string;
  "Jobsite_Contact_Email_Service_Desk__c"?: string;
  "Jobsite_Contact_Email_Technical_Esc__c"?: string;
  "Jobsite_Contact_Name_Service_Desk__c"?: string;
  "Jobsite_Contact_Name_Technical_Esc__c"?: string;
  "Jobsite_Contact_Phone_Service_Desk__c"?: string;
  "Jobsite_Contact_Phone_Technical_Esc__c"?: string;
  "Jobsite_Contact_Selection__c"?: string;
  "Kick_off__c"?: Date;
  "Name"?: string;
  "Partner_Name_Text__c"?: string;
  "Partner_Pricelist__c"?: string;
  "Program_Activation__c"?: string;
  "Progress__c"?: string;
  "Project_Standard__c"?: string;
  "Project__c"?: string;
  "RecordTypeId"?: string;
  "Resource_Pool_Type_Used_for_backfill__c"?: string;
  "Service_Dispatch_SLA_Priority__c"?: string;
  "Service_Technical_Level__c"?: string;
  "SoW_Equipment_Tracking_Vendor__c"?: string;
  "Status__c"?: string;
  "Vendor_Pricelist__c"?: string;
  "Vendor_Type__c"?: string;
  "CreatedDate"?: Date;
  "Service_Description__c"?: string;
  "Special_Service_Instructions__c"?: string;
  "SOW_Description_Customer_Long__c"?: string;
  "Required_Tools__c"?: string;
  "Talent_Type__c"?: string;
  "SLA__c"?: string;
  "Geo_Code__c"?: string;
  "GEO_Country__c"?: string;
  "Product_Id__c"?: string;
  "Master_Project__c"?: string;
  "Vendor__c"?: string;
  "Lastmodifieddate"?: Date;
  "Project_Profile__c"?: string;
  "PPE_Hours__c"?: string;
  "Customer_Service_Type_Master__c"?: string;
  "Talent_Type_From_Profile__c"?: string;
  "Service_Dispatch_SLA_Priority_Master__c"?: string;
  "Service_Technical_Level_Master__c"?: string;
  "Project_Routing_Profile__c"?: string;
  "Global_Talent_Pool__c"?: string;
  "Community_Type__c"?: string;
  "Distribution_Type__c"?: string;
  "temp_jobsite_sfdcId"?: string;
  "FileCounter"?: number;
  "FolderLastModifiedOn"?: Date;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  StandardProject?: Project;
  Partner?: Account;
  PartnerPricelist?: Pricelist;
  VendorPricelist?: Pricelist;
  Vendor?: Account;
  childProject?: Project[];
  projectProfile?: Project[];
  projectRoutingProfile?: Project;
  jobsites?: Jobsite[];
  JobsiteProjectes?: JobsiteProjects[];
  GeoMetro?: GeoMetro;
  TalentType?: TalentType;
  QuoteManagers?: QuoteManager[];
  RecordType?: RecordType;
  globalTalentPool?: any;
}

export class Project implements ProjectInterface {
  "sfdcId": string;
  "APVP_Group_Number__c": string;
  "APVP_Record_Count__c": string;
  "Account__c": string;
  "Customer_Service_Type__c": string;
  "Deadline__c": Date;
  "Description__c": string;
  "Duration__c": number;
  "Field_Service_Program_Type__c": string;
  "Jobsite_Contact_Email_Service_Desk__c": string;
  "Jobsite_Contact_Email_Technical_Esc__c": string;
  "Jobsite_Contact_Name_Service_Desk__c": string;
  "Jobsite_Contact_Name_Technical_Esc__c": string;
  "Jobsite_Contact_Phone_Service_Desk__c": string;
  "Jobsite_Contact_Phone_Technical_Esc__c": string;
  "Jobsite_Contact_Selection__c": string;
  "Kick_off__c": Date;
  "Name": string;
  "Partner_Name_Text__c": string;
  "Partner_Pricelist__c": string;
  "Program_Activation__c": string;
  "Progress__c": string;
  "Project_Standard__c": string;
  "Project__c": string;
  "RecordTypeId": string;
  "Resource_Pool_Type_Used_for_backfill__c": string;
  "Service_Dispatch_SLA_Priority__c": string;
  "Service_Technical_Level__c": string;
  "SoW_Equipment_Tracking_Vendor__c": string;
  "Status__c": string;
  "Vendor_Pricelist__c": string;
  "Vendor_Type__c": string;
  "CreatedDate": Date;
  "Service_Description__c": string;
  "Special_Service_Instructions__c": string;
  "SOW_Description_Customer_Long__c": string;
  "Required_Tools__c": string;
  "Talent_Type__c": string;
  "SLA__c": string;
  "Geo_Code__c": string;
  "GEO_Country__c": string;
  "Product_Id__c": string;
  "Master_Project__c": string;
  "Vendor__c": string;
  "Lastmodifieddate": Date;
  "Project_Profile__c": string;
  "PPE_Hours__c": string;
  "Customer_Service_Type_Master__c": string;
  "Talent_Type_From_Profile__c": string;
  "Service_Dispatch_SLA_Priority_Master__c": string;
  "Service_Technical_Level_Master__c": string;
  "Project_Routing_Profile__c": string;
  "Global_Talent_Pool__c": string;
  "Community_Type__c": string;
  "Distribution_Type__c": string;
  "temp_jobsite_sfdcId": string;
  "FileCounter": number;
  "FolderLastModifiedOn": Date;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  StandardProject: Project;
  Partner: Account;
  PartnerPricelist: Pricelist;
  VendorPricelist: Pricelist;
  Vendor: Account;
  childProject: Project[];
  projectProfile: Project[];
  projectRoutingProfile: Project;
  jobsites: Jobsite[];
  JobsiteProjectes: JobsiteProjects[];
  GeoMetro: GeoMetro;
  TalentType: TalentType;
  QuoteManagers: QuoteManager[];
  RecordType: RecordType;
  globalTalentPool: any;
  constructor(data?: ProjectInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Project`.
   */
  public static getModelName() {
    return "Project";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Project for dynamic purposes.
  **/
  public static factory(data: ProjectInterface): Project{
    return new Project(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Project',
      plural: 'Projects',
      path: 'Projects',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "APVP_Group_Number__c": {
          name: 'APVP_Group_Number__c',
          type: 'string'
        },
        "APVP_Record_Count__c": {
          name: 'APVP_Record_Count__c',
          type: 'string'
        },
        "Account__c": {
          name: 'Account__c',
          type: 'string'
        },
        "Customer_Service_Type__c": {
          name: 'Customer_Service_Type__c',
          type: 'string'
        },
        "Deadline__c": {
          name: 'Deadline__c',
          type: 'Date'
        },
        "Description__c": {
          name: 'Description__c',
          type: 'string'
        },
        "Duration__c": {
          name: 'Duration__c',
          type: 'number'
        },
        "Field_Service_Program_Type__c": {
          name: 'Field_Service_Program_Type__c',
          type: 'string'
        },
        "Jobsite_Contact_Email_Service_Desk__c": {
          name: 'Jobsite_Contact_Email_Service_Desk__c',
          type: 'string'
        },
        "Jobsite_Contact_Email_Technical_Esc__c": {
          name: 'Jobsite_Contact_Email_Technical_Esc__c',
          type: 'string'
        },
        "Jobsite_Contact_Name_Service_Desk__c": {
          name: 'Jobsite_Contact_Name_Service_Desk__c',
          type: 'string'
        },
        "Jobsite_Contact_Name_Technical_Esc__c": {
          name: 'Jobsite_Contact_Name_Technical_Esc__c',
          type: 'string'
        },
        "Jobsite_Contact_Phone_Service_Desk__c": {
          name: 'Jobsite_Contact_Phone_Service_Desk__c',
          type: 'string'
        },
        "Jobsite_Contact_Phone_Technical_Esc__c": {
          name: 'Jobsite_Contact_Phone_Technical_Esc__c',
          type: 'string'
        },
        "Jobsite_Contact_Selection__c": {
          name: 'Jobsite_Contact_Selection__c',
          type: 'string'
        },
        "Kick_off__c": {
          name: 'Kick_off__c',
          type: 'Date'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Partner_Name_Text__c": {
          name: 'Partner_Name_Text__c',
          type: 'string'
        },
        "Partner_Pricelist__c": {
          name: 'Partner_Pricelist__c',
          type: 'string'
        },
        "Program_Activation__c": {
          name: 'Program_Activation__c',
          type: 'string'
        },
        "Progress__c": {
          name: 'Progress__c',
          type: 'string'
        },
        "Project_Standard__c": {
          name: 'Project_Standard__c',
          type: 'string'
        },
        "Project__c": {
          name: 'Project__c',
          type: 'string'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
          type: 'string'
        },
        "Resource_Pool_Type_Used_for_backfill__c": {
          name: 'Resource_Pool_Type_Used_for_backfill__c',
          type: 'string'
        },
        "Service_Dispatch_SLA_Priority__c": {
          name: 'Service_Dispatch_SLA_Priority__c',
          type: 'string'
        },
        "Service_Technical_Level__c": {
          name: 'Service_Technical_Level__c',
          type: 'string'
        },
        "SoW_Equipment_Tracking_Vendor__c": {
          name: 'SoW_Equipment_Tracking_Vendor__c',
          type: 'string'
        },
        "Status__c": {
          name: 'Status__c',
          type: 'string'
        },
        "Vendor_Pricelist__c": {
          name: 'Vendor_Pricelist__c',
          type: 'string'
        },
        "Vendor_Type__c": {
          name: 'Vendor_Type__c',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "Service_Description__c": {
          name: 'Service_Description__c',
          type: 'string'
        },
        "Special_Service_Instructions__c": {
          name: 'Special_Service_Instructions__c',
          type: 'string'
        },
        "SOW_Description_Customer_Long__c": {
          name: 'SOW_Description_Customer_Long__c',
          type: 'string'
        },
        "Required_Tools__c": {
          name: 'Required_Tools__c',
          type: 'string'
        },
        "Talent_Type__c": {
          name: 'Talent_Type__c',
          type: 'string'
        },
        "SLA__c": {
          name: 'SLA__c',
          type: 'string'
        },
        "Geo_Code__c": {
          name: 'Geo_Code__c',
          type: 'string'
        },
        "GEO_Country__c": {
          name: 'GEO_Country__c',
          type: 'string'
        },
        "Product_Id__c": {
          name: 'Product_Id__c',
          type: 'string'
        },
        "Master_Project__c": {
          name: 'Master_Project__c',
          type: 'string'
        },
        "Vendor__c": {
          name: 'Vendor__c',
          type: 'string'
        },
        "Lastmodifieddate": {
          name: 'Lastmodifieddate',
          type: 'Date'
        },
        "Project_Profile__c": {
          name: 'Project_Profile__c',
          type: 'string'
        },
        "PPE_Hours__c": {
          name: 'PPE_Hours__c',
          type: 'string'
        },
        "Customer_Service_Type_Master__c": {
          name: 'Customer_Service_Type_Master__c',
          type: 'string'
        },
        "Talent_Type_From_Profile__c": {
          name: 'Talent_Type_From_Profile__c',
          type: 'string'
        },
        "Service_Dispatch_SLA_Priority_Master__c": {
          name: 'Service_Dispatch_SLA_Priority_Master__c',
          type: 'string'
        },
        "Service_Technical_Level_Master__c": {
          name: 'Service_Technical_Level_Master__c',
          type: 'string'
        },
        "Project_Routing_Profile__c": {
          name: 'Project_Routing_Profile__c',
          type: 'string'
        },
        "Global_Talent_Pool__c": {
          name: 'Global_Talent_Pool__c',
          type: 'string'
        },
        "Community_Type__c": {
          name: 'Community_Type__c',
          type: 'string'
        },
        "Distribution_Type__c": {
          name: 'Distribution_Type__c',
          type: 'string'
        },
        "temp_jobsite_sfdcId": {
          name: 'temp_jobsite_sfdcId',
          type: 'string'
        },
        "FileCounter": {
          name: 'FileCounter',
          type: 'number'
        },
        "FolderLastModifiedOn": {
          name: 'FolderLastModifiedOn',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        StandardProject: {
          name: 'StandardProject',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Project_Standard__c',
          keyTo: 'sfdcId'
        },
        Partner: {
          name: 'Partner',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Account__c',
          keyTo: 'sfdcId'
        },
        PartnerPricelist: {
          name: 'PartnerPricelist',
          type: 'Pricelist',
          model: 'Pricelist',
          relationType: 'belongsTo',
                  keyFrom: 'Partner_Pricelist__c',
          keyTo: 'sfdcId'
        },
        VendorPricelist: {
          name: 'VendorPricelist',
          type: 'Pricelist',
          model: 'Pricelist',
          relationType: 'belongsTo',
                  keyFrom: 'Vendor_Pricelist__c',
          keyTo: 'sfdcId'
        },
        Vendor: {
          name: 'Vendor',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Vendor__c',
          keyTo: 'sfdcId'
        },
        childProject: {
          name: 'childProject',
          type: 'Project[]',
          model: 'Project',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Master_Project__c'
        },
        projectProfile: {
          name: 'projectProfile',
          type: 'Project[]',
          model: 'Project',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Project_Profile__c'
        },
        projectRoutingProfile: {
          name: 'projectRoutingProfile',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Project_Routing_Profile__c',
          keyTo: 'sfdcId'
        },
        jobsites: {
          name: 'jobsites',
          type: 'Jobsite[]',
          model: 'Jobsite',
          relationType: 'hasMany',
          modelThrough: 'JobsiteProjects',
          keyThrough: 'jobsiteId',
          keyFrom: 'id',
          keyTo: 'Project__c'
        },
        JobsiteProjectes: {
          name: 'JobsiteProjectes',
          type: 'JobsiteProjects[]',
          model: 'JobsiteProjects',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Project__c'
        },
        GeoMetro: {
          name: 'GeoMetro',
          type: 'GeoMetro',
          model: 'GeoMetro',
          relationType: 'belongsTo',
                  keyFrom: 'Geo_Code__c',
          keyTo: 'sfdcId'
        },
        TalentType: {
          name: 'TalentType',
          type: 'TalentType',
          model: 'TalentType',
          relationType: 'belongsTo',
                  keyFrom: 'Talent_Type__c',
          keyTo: 'sfdcId'
        },
        QuoteManagers: {
          name: 'QuoteManagers',
          type: 'QuoteManager[]',
          model: 'QuoteManager',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Project_SOP__c'
        },
        RecordType: {
          name: 'RecordType',
          type: 'RecordType',
          model: 'RecordType',
          relationType: 'belongsTo',
                  keyFrom: 'RecordTypeId',
          keyTo: 'sfdcId'
        },
        globalTalentPool: {
          name: 'globalTalentPool',
          type: 'any',
          model: '',
          relationType: 'belongsTo',
                  keyFrom: 'Global_Talent_Pool__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
