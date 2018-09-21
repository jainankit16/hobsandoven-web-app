/* tslint:disable */
import {
  Department,
  Worker,
  Group
} from '../index';

declare var Object: any;
export interface DepartmentRoleInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "RecordType"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "Access__c"?: string;
  "Community__c"?: string;
  "Department_Role_Name__c"?: string;
  "Group_Community__c"?: string;
  "Group_Record_Type__c"?: string;
  "Member_Role__c"?: string;
  "Membership__c"?: string;
  "PgMO_Departments__c"?: string;
  "Worker__c"?: string;
  "PgMO_Groups__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  department?: Department;
  worker?: Worker;
  group?: Group;
}

export class DepartmentRole implements DepartmentRoleInterface {
  "sfdcId": string;
  "Name": string;
  "RecordType": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "Access__c": string;
  "Community__c": string;
  "Department_Role_Name__c": string;
  "Group_Community__c": string;
  "Group_Record_Type__c": string;
  "Member_Role__c": string;
  "Membership__c": string;
  "PgMO_Departments__c": string;
  "Worker__c": string;
  "PgMO_Groups__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  department: Department;
  worker: Worker;
  group: Group;
  constructor(data?: DepartmentRoleInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DepartmentRole`.
   */
  public static getModelName() {
    return "DepartmentRole";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DepartmentRole for dynamic purposes.
  **/
  public static factory(data: DepartmentRoleInterface): DepartmentRole{
    return new DepartmentRole(data);
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
      name: 'DepartmentRole',
      plural: 'DepartmentRoles',
      path: 'DepartmentRoles',
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
        "RecordType": {
          name: 'RecordType',
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
        "Access__c": {
          name: 'Access__c',
          type: 'string'
        },
        "Community__c": {
          name: 'Community__c',
          type: 'string'
        },
        "Department_Role_Name__c": {
          name: 'Department_Role_Name__c',
          type: 'string'
        },
        "Group_Community__c": {
          name: 'Group_Community__c',
          type: 'string'
        },
        "Group_Record_Type__c": {
          name: 'Group_Record_Type__c',
          type: 'string'
        },
        "Member_Role__c": {
          name: 'Member_Role__c',
          type: 'string'
        },
        "Membership__c": {
          name: 'Membership__c',
          type: 'string'
        },
        "PgMO_Departments__c": {
          name: 'PgMO_Departments__c',
          type: 'string'
        },
        "Worker__c": {
          name: 'Worker__c',
          type: 'string'
        },
        "PgMO_Groups__c": {
          name: 'PgMO_Groups__c',
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
        department: {
          name: 'department',
          type: 'Department',
          model: 'Department',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Departments__c',
          keyTo: 'sfdcId'
        },
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'Worker__c',
          keyTo: 'sfdcId'
        },
        group: {
          name: 'group',
          type: 'Group',
          model: 'Group',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Groups__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
