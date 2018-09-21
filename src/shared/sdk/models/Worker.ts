/* tslint:disable */
import {
  Users,
  Vendorsite,
  Contact,
  Skilling,
  DepartmentRole,
  MemberRole,
  WorkerShift
} from '../index';

declare var Object: any;
export interface WorkerInterface {
  "Name"?: string;
  "sfdcId"?: string;
  "Available__c"?: boolean;
  "Contact__c": string;
  "CreatedById"?: string;
  "CreatedDate"?: Date;
  "Dispatch_Worker_num__c"?: string;
  "Work_Phone_Number__c"?: string;
  "Primary_Worker_Skilling_Profile__c"?: string;
  "IsDeleted"?: boolean;
  "RecordTypeId"?: string;
  "Vendorsite__c"?: string;
  "Worker_Type__c"?: string;
  "WM_Worker_Id__c"?: string;
  "WM_Profile_Link__c"?: string;
  "WM_Account_Creation_Date__c"?: Date;
  "Worker_Rating__c"?: string;
  "GEO_Code__c"?: string;
  "Global_Shift_Equivalent_Schedule_GSES__c"?: string;
  "Regional_Role__c"?: string;
  "Functional_Role__c"?: string;
  "Functional_Role_Level__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  user?: Users;
  vendorsite?: Vendorsite;
  contact?: Contact;
  skilling?: Skilling;
  departmentRoles?: DepartmentRole[];
  memberRoles?: MemberRole[];
  workershift?: WorkerShift;
}

export class Worker implements WorkerInterface {
  "Name": string;
  "sfdcId": string;
  "Available__c": boolean;
  "Contact__c": string;
  "CreatedById": string;
  "CreatedDate": Date;
  "Dispatch_Worker_num__c": string;
  "Work_Phone_Number__c": string;
  "Primary_Worker_Skilling_Profile__c": string;
  "IsDeleted": boolean;
  "RecordTypeId": string;
  "Vendorsite__c": string;
  "Worker_Type__c": string;
  "WM_Worker_Id__c": string;
  "WM_Profile_Link__c": string;
  "WM_Account_Creation_Date__c": Date;
  "Worker_Rating__c": string;
  "GEO_Code__c": string;
  "Global_Shift_Equivalent_Schedule_GSES__c": string;
  "Regional_Role__c": string;
  "Functional_Role__c": string;
  "Functional_Role_Level__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  user: Users;
  vendorsite: Vendorsite;
  contact: Contact;
  skilling: Skilling;
  departmentRoles: DepartmentRole[];
  memberRoles: MemberRole[];
  workershift: WorkerShift;
  constructor(data?: WorkerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Worker`.
   */
  public static getModelName() {
    return "Worker";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Worker for dynamic purposes.
  **/
  public static factory(data: WorkerInterface): Worker{
    return new Worker(data);
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
      name: 'Worker',
      plural: 'Workers',
      path: 'Workers',
      idName: 'id',
      properties: {
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Available__c": {
          name: 'Available__c',
          type: 'boolean'
        },
        "Contact__c": {
          name: 'Contact__c',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "Dispatch_Worker_num__c": {
          name: 'Dispatch_Worker_num__c',
          type: 'string'
        },
        "Work_Phone_Number__c": {
          name: 'Work_Phone_Number__c',
          type: 'string'
        },
        "Primary_Worker_Skilling_Profile__c": {
          name: 'Primary_Worker_Skilling_Profile__c',
          type: 'string'
        },
        "IsDeleted": {
          name: 'IsDeleted',
          type: 'boolean'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
          type: 'string'
        },
        "Vendorsite__c": {
          name: 'Vendorsite__c',
          type: 'string'
        },
        "Worker_Type__c": {
          name: 'Worker_Type__c',
          type: 'string'
        },
        "WM_Worker_Id__c": {
          name: 'WM_Worker_Id__c',
          type: 'string'
        },
        "WM_Profile_Link__c": {
          name: 'WM_Profile_Link__c',
          type: 'string'
        },
        "WM_Account_Creation_Date__c": {
          name: 'WM_Account_Creation_Date__c',
          type: 'Date'
        },
        "Worker_Rating__c": {
          name: 'Worker_Rating__c',
          type: 'string'
        },
        "GEO_Code__c": {
          name: 'GEO_Code__c',
          type: 'string'
        },
        "Global_Shift_Equivalent_Schedule_GSES__c": {
          name: 'Global_Shift_Equivalent_Schedule_GSES__c',
          type: 'string'
        },
        "Regional_Role__c": {
          name: 'Regional_Role__c',
          type: 'string'
        },
        "Functional_Role__c": {
          name: 'Functional_Role__c',
          type: 'string'
        },
        "Functional_Role_Level__c": {
          name: 'Functional_Role_Level__c',
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
        user: {
          name: 'user',
          type: 'Users',
          model: 'Users',
          relationType: 'belongsTo',
                  keyFrom: 'CreatedById',
          keyTo: 'sfdcId'
        },
        vendorsite: {
          name: 'vendorsite',
          type: 'Vendorsite',
          model: 'Vendorsite',
          relationType: 'belongsTo',
                  keyFrom: 'Vendorsite__c',
          keyTo: 'sfdcId'
        },
        contact: {
          name: 'contact',
          type: 'Contact',
          model: 'Contact',
          relationType: 'belongsTo',
                  keyFrom: 'Contact__c',
          keyTo: 'sfdcId'
        },
        skilling: {
          name: 'skilling',
          type: 'Skilling',
          model: 'Skilling',
          relationType: 'belongsTo',
                  keyFrom: 'Primary_Worker_Skilling_Profile__c',
          keyTo: 'sfdcId'
        },
        departmentRoles: {
          name: 'departmentRoles',
          type: 'DepartmentRole[]',
          model: 'DepartmentRole',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Worker__c'
        },
        memberRoles: {
          name: 'memberRoles',
          type: 'MemberRole[]',
          model: 'MemberRole',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Member__c'
        },
        workershift: {
          name: 'workershift',
          type: 'WorkerShift',
          model: 'WorkerShift',
          relationType: 'belongsTo',
                  keyFrom: 'Global_Shift_Equivalent_Schedule_GSES__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
