/* tslint:disable */
import {
  RequestFormReceipt
} from '../index';

declare var Object: any;
export interface RequestFormReceiptLineInterface {
  "sfdcId"?: string;
  "Defective_Item_New_SN__c"?: string;
  "Defective_Item_Original_SN__c"?: string;
  "FRU_Group_Name__c"?: string;
  "FRU_SKU__c"?: string;
  "Name"?: string;
  "New_MAC_Number__c"?: string;
  "Quantity__c"?: number;
  "Request_Form_Receipt__c"?: string;
  "RecordTypeId"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  requestReceipt?: RequestFormReceipt;
}

export class RequestFormReceiptLine implements RequestFormReceiptLineInterface {
  "sfdcId": string;
  "Defective_Item_New_SN__c": string;
  "Defective_Item_Original_SN__c": string;
  "FRU_Group_Name__c": string;
  "FRU_SKU__c": string;
  "Name": string;
  "New_MAC_Number__c": string;
  "Quantity__c": number;
  "Request_Form_Receipt__c": string;
  "RecordTypeId": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  requestReceipt: RequestFormReceipt;
  constructor(data?: RequestFormReceiptLineInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RequestFormReceiptLine`.
   */
  public static getModelName() {
    return "RequestFormReceiptLine";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RequestFormReceiptLine for dynamic purposes.
  **/
  public static factory(data: RequestFormReceiptLineInterface): RequestFormReceiptLine{
    return new RequestFormReceiptLine(data);
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
      name: 'RequestFormReceiptLine',
      plural: 'RequestFormReceiptLines',
      path: 'RequestFormReceiptLines',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Defective_Item_New_SN__c": {
          name: 'Defective_Item_New_SN__c',
          type: 'string'
        },
        "Defective_Item_Original_SN__c": {
          name: 'Defective_Item_Original_SN__c',
          type: 'string'
        },
        "FRU_Group_Name__c": {
          name: 'FRU_Group_Name__c',
          type: 'string'
        },
        "FRU_SKU__c": {
          name: 'FRU_SKU__c',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "New_MAC_Number__c": {
          name: 'New_MAC_Number__c',
          type: 'string'
        },
        "Quantity__c": {
          name: 'Quantity__c',
          type: 'number'
        },
        "Request_Form_Receipt__c": {
          name: 'Request_Form_Receipt__c',
          type: 'string'
        },
        "RecordTypeId": {
          name: 'RecordTypeId',
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
        requestReceipt: {
          name: 'requestReceipt',
          type: 'RequestFormReceipt',
          model: 'RequestFormReceipt',
          relationType: 'belongsTo',
                  keyFrom: 'Request_Form_Receipt__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
