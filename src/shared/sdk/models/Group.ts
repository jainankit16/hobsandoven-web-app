/* tslint:disable */
import {
  Account,
  Department,
  RecordType
} from '../index';

declare var Object: any;
export interface GroupInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Owner"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "RecordType"?: string;
  "Accessibility_Type__c"?: string;
  "Account__c"?: string;
  "Activity_Feed__c"?: string;
  "Available_to_Communities__c"?: string;
  "Community__c"?: string;
  "Default__c"?: boolean;
  "Department_Group_Code__c"?: string;
  "Escalation_Feed__c"?: string;
  "Group_Code__c"?: string;
  "Group_Code_Auto__c"?: string;
  "PgMO_group_code__c"?: string;
  "Group_Code_Name__c"?: string;
  "Department__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  account?: Account;
  department?: Department;
  recordType?: RecordType;
}

export class Group implements GroupInterface {
  "sfdcId": string;
  "Name": string;
  "Owner": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "RecordType": string;
  "Accessibility_Type__c": string;
  "Account__c": string;
  "Activity_Feed__c": string;
  "Available_to_Communities__c": string;
  "Community__c": string;
  "Default__c": boolean;
  "Department_Group_Code__c": string;
  "Escalation_Feed__c": string;
  "Group_Code__c": string;
  "Group_Code_Auto__c": string;
  "PgMO_group_code__c": string;
  "Group_Code_Name__c": string;
  "Department__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  account: Account;
  department: Department;
  recordType: RecordType;
  constructor(data?: GroupInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Group`.
   */
  public static getModelName() {
    return "Group";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Group for dynamic purposes.
  **/
  public static factory(data: GroupInterface): Group{
    return new Group(data);
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
      name: 'Group',
      plural: 'Groups',
      path: 'Groups',
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
        "Accessibility_Type__c": {
          name: 'Accessibility_Type__c',
          type: 'string'
        },
        "Account__c": {
          name: 'Account__c',
          type: 'string'
        },
        "Activity_Feed__c": {
          name: 'Activity_Feed__c',
          type: 'string'
        },
        "Available_to_Communities__c": {
          name: 'Available_to_Communities__c',
          type: 'string'
        },
        "Community__c": {
          name: 'Community__c',
          type: 'string'
        },
        "Default__c": {
          name: 'Default__c',
          type: 'boolean'
        },
        "Department_Group_Code__c": {
          name: 'Department_Group_Code__c',
          type: 'string'
        },
        "Escalation_Feed__c": {
          name: 'Escalation_Feed__c',
          type: 'string'
        },
        "Group_Code__c": {
          name: 'Group_Code__c',
          type: 'string'
        },
        "Group_Code_Auto__c": {
          name: 'Group_Code_Auto__c',
          type: 'string'
        },
        "PgMO_group_code__c": {
          name: 'PgMO_group_code__c',
          type: 'string'
        },
        "Group_Code_Name__c": {
          name: 'Group_Code_Name__c',
          type: 'string'
        },
        "Department__c": {
          name: 'Department__c',
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
        department: {
          name: 'department',
          type: 'Department',
          model: 'Department',
          relationType: 'belongsTo',
                  keyFrom: 'Department__c',
          keyTo: 'sfdcId'
        },
        recordType: {
          name: 'recordType',
          type: 'RecordType',
          model: 'RecordType',
          relationType: 'belongsTo',
                  keyFrom: 'RecordType',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
