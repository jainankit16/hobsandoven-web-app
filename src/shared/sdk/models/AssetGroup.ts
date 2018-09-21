/* tslint:disable */
import {
  Account
} from '../index';

declare var Object: any;
export interface AssetGroupInterface {
  "Name"?: string;
  "sfdcId"?: string;
  "Partner_Account__c"?: string;
  "Model_Name__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  account?: Account;
}

export class AssetGroup implements AssetGroupInterface {
  "Name": string;
  "sfdcId": string;
  "Partner_Account__c": string;
  "Model_Name__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  account: Account;
  constructor(data?: AssetGroupInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AssetGroup`.
   */
  public static getModelName() {
    return "AssetGroup";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AssetGroup for dynamic purposes.
  **/
  public static factory(data: AssetGroupInterface): AssetGroup{
    return new AssetGroup(data);
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
      name: 'AssetGroup',
      plural: 'AssetGroups',
      path: 'AssetGroups',
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
        "Partner_Account__c": {
          name: 'Partner_Account__c',
          type: 'string'
        },
        "Model_Name__c": {
          name: 'Model_Name__c',
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
                  keyFrom: 'Partner_Account__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
