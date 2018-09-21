/* tslint:disable */
import {
  Jobsite,
  Project,
  Program,
  Account
} from '../index';

declare var Object: any;
export interface Project2Interface {
  "sfdcId": string;
  "Name"?: string;
  "Owner"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "RecordType"?: string;
  "Account__c"?: string;
  "Description__c"?: string;
  "Jobsite__c"?: string;
  "Master_Project__c"?: string;
  "Opportunity__c"?: string;
  "PgMO_Program__c"?: string;
  "PgMO_Project_Delivery__c"?: string;
  "PgMO_Project_Opportunity__c"?: string;
  "PgMO_Projects_Master__c"?: string;
  "Project_No__c"?: string;
  "ProjectName__c"?: string;
  "Vendor_Account__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  jobsite?: Jobsite;
  project?: Project;
  program?: Program;
  project2?: Project2;
  projectOpportunity?: Project2;
  projectMaster?: Project2;
  vendor?: Account;
}

export class Project2 implements Project2Interface {
  "sfdcId": string;
  "Name": string;
  "Owner": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "RecordType": string;
  "Account__c": string;
  "Description__c": string;
  "Jobsite__c": string;
  "Master_Project__c": string;
  "Opportunity__c": string;
  "PgMO_Program__c": string;
  "PgMO_Project_Delivery__c": string;
  "PgMO_Project_Opportunity__c": string;
  "PgMO_Projects_Master__c": string;
  "Project_No__c": string;
  "ProjectName__c": string;
  "Vendor_Account__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  jobsite: Jobsite;
  project: Project;
  program: Program;
  project2: Project2;
  projectOpportunity: Project2;
  projectMaster: Project2;
  vendor: Account;
  constructor(data?: Project2Interface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Project2`.
   */
  public static getModelName() {
    return "Project2";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Project2 for dynamic purposes.
  **/
  public static factory(data: Project2Interface): Project2{
    return new Project2(data);
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
      name: 'Project2',
      plural: 'Project2s',
      path: 'Project2s',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Owner": {
          name: 'Owner',
          type: 'string'
        },
        "LastModifiedBy": {
          name: 'LastModifiedBy',
          type: 'string'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "CreatedBy": {
          name: 'CreatedBy',
          type: 'string'
        },
        "RecordType": {
          name: 'RecordType',
          type: 'string'
        },
        "Account__c": {
          name: 'Account__c',
          type: 'string'
        },
        "Description__c": {
          name: 'Description__c',
          type: 'string'
        },
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "Master_Project__c": {
          name: 'Master_Project__c',
          type: 'string'
        },
        "Opportunity__c": {
          name: 'Opportunity__c',
          type: 'string'
        },
        "PgMO_Program__c": {
          name: 'PgMO_Program__c',
          type: 'string'
        },
        "PgMO_Project_Delivery__c": {
          name: 'PgMO_Project_Delivery__c',
          type: 'string'
        },
        "PgMO_Project_Opportunity__c": {
          name: 'PgMO_Project_Opportunity__c',
          type: 'string'
        },
        "PgMO_Projects_Master__c": {
          name: 'PgMO_Projects_Master__c',
          type: 'string'
        },
        "Project_No__c": {
          name: 'Project_No__c',
          type: 'string'
        },
        "ProjectName__c": {
          name: 'ProjectName__c',
          type: 'string'
        },
        "Vendor_Account__c": {
          name: 'Vendor_Account__c',
          type: 'string'
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
        jobsite: {
          name: 'jobsite',
          type: 'Jobsite',
          model: 'Jobsite',
          relationType: 'belongsTo',
                  keyFrom: 'Jobsite__c',
          keyTo: 'sfdcId'
        },
        project: {
          name: 'project',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Master_Project__c',
          keyTo: 'sfdcId'
        },
        program: {
          name: 'program',
          type: 'Program',
          model: 'Program',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Program__c',
          keyTo: 'sfdcId'
        },
        project2: {
          name: 'project2',
          type: 'Project2',
          model: 'Project2',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Project_Delivery__c',
          keyTo: 'sfdcId'
        },
        projectOpportunity: {
          name: 'projectOpportunity',
          type: 'Project2',
          model: 'Project2',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Project_Opportunity__c',
          keyTo: 'sfdcId'
        },
        projectMaster: {
          name: 'projectMaster',
          type: 'Project2',
          model: 'Project2',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Projects_Master__c',
          keyTo: 'sfdcId'
        },
        vendor: {
          name: 'vendor',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Vendor_Account__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
