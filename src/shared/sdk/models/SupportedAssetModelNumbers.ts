/* tslint:disable */
import {
  Account,
  AssetGroup
} from '../index';

declare var Object: any;
export interface SupportedAssetModelNumbersInterface {
  "sfdcId": string;
  "Name": string;
  "Account__c"?: string;
  "Model_number__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  account?: Account;
  assetGroup?: AssetGroup;
}

export class SupportedAssetModelNumbers implements SupportedAssetModelNumbersInterface {
  "sfdcId": string;
  "Name": string;
  "Account__c": string;
  "Model_number__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  account: Account;
  assetGroup: AssetGroup;
  constructor(data?: SupportedAssetModelNumbersInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SupportedAssetModelNumbers`.
   */
  public static getModelName() {
    return "SupportedAssetModelNumbers";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SupportedAssetModelNumbers for dynamic purposes.
  **/
  public static factory(data: SupportedAssetModelNumbersInterface): SupportedAssetModelNumbers{
    return new SupportedAssetModelNumbers(data);
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
      name: 'SupportedAssetModelNumbers',
      plural: 'SupportedAssetModelNumbers',
      path: 'SupportedAssetModelNumbers',
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
        "Account__c": {
          name: 'Account__c',
          type: 'string'
        },
        "Model_number__c": {
          name: 'Model_number__c',
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
        assetGroup: {
          name: 'assetGroup',
          type: 'AssetGroup',
          model: 'AssetGroup',
          relationType: 'belongsTo',
                  keyFrom: 'Model_number__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
