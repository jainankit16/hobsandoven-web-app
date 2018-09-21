/* tslint:disable */

declare var Object: any;
export interface DepartmentInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "RecordType"?: string;
  "Owner"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedBy"?: string;
  "Community__c"?: string;
  "Default__c"?: boolean;
  "IsActive"?: boolean;
  "Department_Access__c"?: string;
  "Department_Acronym__c"?: string;
  "Department_Name__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Department implements DepartmentInterface {
  "sfdcId": string;
  "Name": string;
  "RecordType": string;
  "Owner": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "CreatedBy": string;
  "Community__c": string;
  "Default__c": boolean;
  "IsActive": boolean;
  "Department_Access__c": string;
  "Department_Acronym__c": string;
  "Department_Name__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: DepartmentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Department`.
   */
  public static getModelName() {
    return "Department";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Department for dynamic purposes.
  **/
  public static factory(data: DepartmentInterface): Department{
    return new Department(data);
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
      name: 'Department',
      plural: 'Departments',
      path: 'Departments',
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
        "Community__c": {
          name: 'Community__c',
          type: 'string'
        },
        "Default__c": {
          name: 'Default__c',
          type: 'boolean'
        },
        "IsActive": {
          name: 'IsActive',
          type: 'boolean'
        },
        "Department_Access__c": {
          name: 'Department_Access__c',
          type: 'string'
        },
        "Department_Acronym__c": {
          name: 'Department_Acronym__c',
          type: 'string'
        },
        "Department_Name__c": {
          name: 'Department_Name__c',
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
      }
    }
  }
}
