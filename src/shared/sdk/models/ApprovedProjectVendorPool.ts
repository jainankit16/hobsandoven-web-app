/* tslint:disable */
import {
  Project,
  Account,
  MetroVirtualVendorPool
} from '../index';

declare var Object: any;
export interface ApprovedProjectVendorPoolInterface {
  "sfdcId"?: string;
  "Vendor__c"?: string;
  "Name"?: string;
  "Metro_Virtual_Vendor_Pool__c"?: string;
  "Project_Priority_Rating__c"?: number;
  "Metro_Rating__c"?: number;
  "Project_GEO_Metro__c"?: string;
  "Rating_Weighted_Average__c"?: number;
  "Rating_Weighted_Average_Auto__c"?: number;
  "Status__c"?: string;
  "Project__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  project?: Project;
  account?: Account;
  MetroVirtualVendorPool?: MetroVirtualVendorPool;
}

export class ApprovedProjectVendorPool implements ApprovedProjectVendorPoolInterface {
  "sfdcId": string;
  "Vendor__c": string;
  "Name": string;
  "Metro_Virtual_Vendor_Pool__c": string;
  "Project_Priority_Rating__c": number;
  "Metro_Rating__c": number;
  "Project_GEO_Metro__c": string;
  "Rating_Weighted_Average__c": number;
  "Rating_Weighted_Average_Auto__c": number;
  "Status__c": string;
  "Project__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  project: Project;
  account: Account;
  MetroVirtualVendorPool: MetroVirtualVendorPool;
  constructor(data?: ApprovedProjectVendorPoolInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ApprovedProjectVendorPool`.
   */
  public static getModelName() {
    return "ApprovedProjectVendorPool";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ApprovedProjectVendorPool for dynamic purposes.
  **/
  public static factory(data: ApprovedProjectVendorPoolInterface): ApprovedProjectVendorPool{
    return new ApprovedProjectVendorPool(data);
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
      name: 'ApprovedProjectVendorPool',
      plural: 'ApprovedProjectVendorPools',
      path: 'ApprovedProjectVendorPools',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Vendor__c": {
          name: 'Vendor__c',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Metro_Virtual_Vendor_Pool__c": {
          name: 'Metro_Virtual_Vendor_Pool__c',
          type: 'string'
        },
        "Project_Priority_Rating__c": {
          name: 'Project_Priority_Rating__c',
          type: 'number'
        },
        "Metro_Rating__c": {
          name: 'Metro_Rating__c',
          type: 'number'
        },
        "Project_GEO_Metro__c": {
          name: 'Project_GEO_Metro__c',
          type: 'string'
        },
        "Rating_Weighted_Average__c": {
          name: 'Rating_Weighted_Average__c',
          type: 'number'
        },
        "Rating_Weighted_Average_Auto__c": {
          name: 'Rating_Weighted_Average_Auto__c',
          type: 'number'
        },
        "Status__c": {
          name: 'Status__c',
          type: 'string'
        },
        "Project__c": {
          name: 'Project__c',
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
        project: {
          name: 'project',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Project__c',
          keyTo: 'sfdcId'
        },
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Vendor__c',
          keyTo: 'sfdcId'
        },
        MetroVirtualVendorPool: {
          name: 'MetroVirtualVendorPool',
          type: 'MetroVirtualVendorPool',
          model: 'MetroVirtualVendorPool',
          relationType: 'belongsTo',
                  keyFrom: 'Metro_Virtual_Vendor_Pool__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
