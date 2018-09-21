/* tslint:disable */
import {
  Account,
  Project
} from '../index';

declare var Object: any;
export interface ProgramInterface {
  "sfdcId": string;
  "Name"?: string;
  "Owner"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "RecordType"?: string;
  "Account__c"?: string;
  "Category__c"?: string;
  "Description__c"?: string;
  "Master_Project__c"?: string;
  "Opportunity__c"?: string;
  "ProgramName__c"?: string;
  "Program_Status__c"?: string;
  "Sub_Catergory__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  account?: Account;
  project?: Project;
}

export class Program implements ProgramInterface {
  "sfdcId": string;
  "Name": string;
  "Owner": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "RecordType": string;
  "Account__c": string;
  "Category__c": string;
  "Description__c": string;
  "Master_Project__c": string;
  "Opportunity__c": string;
  "ProgramName__c": string;
  "Program_Status__c": string;
  "Sub_Catergory__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  account: Account;
  project: Project;
  constructor(data?: ProgramInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Program`.
   */
  public static getModelName() {
    return "Program";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Program for dynamic purposes.
  **/
  public static factory(data: ProgramInterface): Program{
    return new Program(data);
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
      name: 'Program',
      plural: 'Programs',
      path: 'Programs',
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
        "Category__c": {
          name: 'Category__c',
          type: 'string'
        },
        "Description__c": {
          name: 'Description__c',
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
        "ProgramName__c": {
          name: 'ProgramName__c',
          type: 'string'
        },
        "Program_Status__c": {
          name: 'Program_Status__c',
          type: 'string'
        },
        "Sub_Catergory__c": {
          name: 'Sub_Catergory__c',
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
        project: {
          name: 'project',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Master_Project__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
