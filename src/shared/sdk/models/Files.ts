/* tslint:disable */
import {
  Account,
  FileCategory,
  Milestone,
  Task,
  Program,
  Project2
} from '../index';

declare var Object: any;
export interface FilesInterface {
  "sfdcId": string;
  "Name"?: string;
  "OwnerId"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "Account__c"?: string;
  "Created_By__c"?: string;
  "Category__c"?: string;
  "Date_Created__c"?: Date;
  "Date_Updated__c"?: Date;
  "Description__c"?: string;
  "File_Category__c"?: string;
  "File_Category_Name__c"?: string;
  "Link_Azure_Storage__c"?: string;
  "Milestone__c"?: string;
  "Modified_by__c"?: string;
  "PgMO_Tasks__c"?: string;
  "Program_Name__c"?: string;
  "Project_Name__c"?: string;
  "Title__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  account?: Account;
  fileCategory?: FileCategory;
  milestone?: Milestone;
  task?: Task;
  program?: Program;
  project?: Project2;
}

export class Files implements FilesInterface {
  "sfdcId": string;
  "Name": string;
  "OwnerId": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "Account__c": string;
  "Created_By__c": string;
  "Category__c": string;
  "Date_Created__c": Date;
  "Date_Updated__c": Date;
  "Description__c": string;
  "File_Category__c": string;
  "File_Category_Name__c": string;
  "Link_Azure_Storage__c": string;
  "Milestone__c": string;
  "Modified_by__c": string;
  "PgMO_Tasks__c": string;
  "Program_Name__c": string;
  "Project_Name__c": string;
  "Title__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  account: Account;
  fileCategory: FileCategory;
  milestone: Milestone;
  task: Task;
  program: Program;
  project: Project2;
  constructor(data?: FilesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Files`.
   */
  public static getModelName() {
    return "Files";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Files for dynamic purposes.
  **/
  public static factory(data: FilesInterface): Files{
    return new Files(data);
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
      name: 'Files',
      plural: 'Files',
      path: 'Files',
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
        "OwnerId": {
          name: 'OwnerId',
          type: 'string'
        },
        "LastModifiedById": {
          name: 'LastModifiedById',
          type: 'string'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "Account__c": {
          name: 'Account__c',
          type: 'string'
        },
        "Created_By__c": {
          name: 'Created_By__c',
          type: 'string'
        },
        "Category__c": {
          name: 'Category__c',
          type: 'string'
        },
        "Date_Created__c": {
          name: 'Date_Created__c',
          type: 'Date'
        },
        "Date_Updated__c": {
          name: 'Date_Updated__c',
          type: 'Date'
        },
        "Description__c": {
          name: 'Description__c',
          type: 'string'
        },
        "File_Category__c": {
          name: 'File_Category__c',
          type: 'string'
        },
        "File_Category_Name__c": {
          name: 'File_Category_Name__c',
          type: 'string'
        },
        "Link_Azure_Storage__c": {
          name: 'Link_Azure_Storage__c',
          type: 'string'
        },
        "Milestone__c": {
          name: 'Milestone__c',
          type: 'string'
        },
        "Modified_by__c": {
          name: 'Modified_by__c',
          type: 'string'
        },
        "PgMO_Tasks__c": {
          name: 'PgMO_Tasks__c',
          type: 'string'
        },
        "Program_Name__c": {
          name: 'Program_Name__c',
          type: 'string'
        },
        "Project_Name__c": {
          name: 'Project_Name__c',
          type: 'string'
        },
        "Title__c": {
          name: 'Title__c',
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
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Account__c',
          keyTo: 'sfdcId'
        },
        fileCategory: {
          name: 'fileCategory',
          type: 'FileCategory',
          model: 'FileCategory',
          relationType: 'belongsTo',
                  keyFrom: 'File_Category__c',
          keyTo: 'sfdcId'
        },
        milestone: {
          name: 'milestone',
          type: 'Milestone',
          model: 'Milestone',
          relationType: 'belongsTo',
                  keyFrom: 'Milestone__c',
          keyTo: 'sfdcId'
        },
        task: {
          name: 'task',
          type: 'Task',
          model: 'Task',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Tasks__c',
          keyTo: 'sfdcId'
        },
        program: {
          name: 'program',
          type: 'Program',
          model: 'Program',
          relationType: 'belongsTo',
                  keyFrom: 'Program_Name__c',
          keyTo: 'sfdcId'
        },
        project: {
          name: 'project',
          type: 'Project2',
          model: 'Project2',
          relationType: 'belongsTo',
                  keyFrom: 'Project_Name__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
