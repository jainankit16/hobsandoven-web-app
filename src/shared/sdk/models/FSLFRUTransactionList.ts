/* tslint:disable */
import {
  Account
} from '../index';

declare var Object: any;
export interface FSLFRUTransactionListInterface {
  "sfdcId": string;
  "Name": string;
  "Inventory__c"?: number;
  "FRU_Item_Description__c"?: string;
  "FRU_SerialNumber__c"?: string;
  "FSL_Sub_Inventory_Code__c"?: string;
  "MPN_Feature_Code__c"?: string;
  "Account__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  account?: Account;
}

export class FSLFRUTransactionList implements FSLFRUTransactionListInterface {
  "sfdcId": string;
  "Name": string;
  "Inventory__c": number;
  "FRU_Item_Description__c": string;
  "FRU_SerialNumber__c": string;
  "FSL_Sub_Inventory_Code__c": string;
  "MPN_Feature_Code__c": string;
  "Account__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  account: Account;
  constructor(data?: FSLFRUTransactionListInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `FSLFRUTransactionList`.
   */
  public static getModelName() {
    return "FSLFRUTransactionList";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of FSLFRUTransactionList for dynamic purposes.
  **/
  public static factory(data: FSLFRUTransactionListInterface): FSLFRUTransactionList{
    return new FSLFRUTransactionList(data);
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
      name: 'FSLFRUTransactionList',
      plural: 'FSLFRUTransactionLists',
      path: 'FSLFRUTransactionLists',
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
        "Inventory__c": {
          name: 'Inventory__c',
          type: 'number'
        },
        "FRU_Item_Description__c": {
          name: 'FRU_Item_Description__c',
          type: 'string'
        },
        "FRU_SerialNumber__c": {
          name: 'FRU_SerialNumber__c',
          type: 'string'
        },
        "FSL_Sub_Inventory_Code__c": {
          name: 'FSL_Sub_Inventory_Code__c',
          type: 'string'
        },
        "MPN_Feature_Code__c": {
          name: 'MPN_Feature_Code__c',
          type: 'string'
        },
        "Account__c": {
          name: 'Account__c',
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
      }
    }
  }
}
