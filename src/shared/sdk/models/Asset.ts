/* tslint:disable */
import {
  Account,
  Jobsite,
  Project,
  AssetGroup,
  Contract
} from '../index';

declare var Object: any;
export interface AssetInterface {
  "Name"?: string;
  "sfdcId"?: string;
  "SerialNumber"?: string;
  "AccountId"?: string;
  "Contract__c"?: string;
  "Asset_and_FRU_Group__c"?: string;
  "Service_Level__c"?: string;
  "Jobsite__c"?: string;
  "Project_SOP__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  account?: Account;
  jobsite?: Jobsite;
  project?: Project;
  assetGroup?: AssetGroup;
  contract?: Contract;
}

export class Asset implements AssetInterface {
  "Name": string;
  "sfdcId": string;
  "SerialNumber": string;
  "AccountId": string;
  "Contract__c": string;
  "Asset_and_FRU_Group__c": string;
  "Service_Level__c": string;
  "Jobsite__c": string;
  "Project_SOP__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  account: Account;
  jobsite: Jobsite;
  project: Project;
  assetGroup: AssetGroup;
  contract: Contract;
  constructor(data?: AssetInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Asset`.
   */
  public static getModelName() {
    return "Asset";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Asset for dynamic purposes.
  **/
  public static factory(data: AssetInterface): Asset{
    return new Asset(data);
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
      name: 'Asset',
      plural: 'Assets',
      path: 'Assets',
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
        "SerialNumber": {
          name: 'SerialNumber',
          type: 'string'
        },
        "AccountId": {
          name: 'AccountId',
          type: 'string'
        },
        "Contract__c": {
          name: 'Contract__c',
          type: 'string'
        },
        "Asset_and_FRU_Group__c": {
          name: 'Asset_and_FRU_Group__c',
          type: 'string'
        },
        "Service_Level__c": {
          name: 'Service_Level__c',
          type: 'string'
        },
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "Project_SOP__c": {
          name: 'Project_SOP__c',
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
                  keyFrom: 'AccountId',
          keyTo: 'sfdcId'
        },
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
                  keyFrom: 'Project_SOP__c',
          keyTo: 'sfdcId'
        },
        assetGroup: {
          name: 'assetGroup',
          type: 'AssetGroup',
          model: 'AssetGroup',
          relationType: 'belongsTo',
                  keyFrom: 'Asset_and_FRU_Group__c',
          keyTo: 'sfdcId'
        },
        contract: {
          name: 'contract',
          type: 'Contract',
          model: 'Contract',
          relationType: 'belongsTo',
                  keyFrom: 'Contract__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
