/* tslint:disable */
import {
  Vendorsite,
  Contact
} from '../index';

declare var Object: any;
export interface VendorsiteContactInterface {
  "sfdcId"?: string;
  "Contact__c"?: string;
  "Vendor_Contact_Type__c"?: string;
  "Vendorsite__c"?: string;
  "Name"?: string;
  "CreatedBy"?: string;
  "LastModifiedBy"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  vendorsite?: Vendorsite;
  contact?: Contact;
}

export class VendorsiteContact implements VendorsiteContactInterface {
  "sfdcId": string;
  "Contact__c": string;
  "Vendor_Contact_Type__c": string;
  "Vendorsite__c": string;
  "Name": string;
  "CreatedBy": string;
  "LastModifiedBy": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  vendorsite: Vendorsite;
  contact: Contact;
  constructor(data?: VendorsiteContactInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VendorsiteContact`.
   */
  public static getModelName() {
    return "VendorsiteContact";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VendorsiteContact for dynamic purposes.
  **/
  public static factory(data: VendorsiteContactInterface): VendorsiteContact{
    return new VendorsiteContact(data);
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
      name: 'VendorsiteContact',
      plural: 'VendorsiteContacts',
      path: 'VendorsiteContacts',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Contact__c": {
          name: 'Contact__c',
          type: 'string'
        },
        "Vendor_Contact_Type__c": {
          name: 'Vendor_Contact_Type__c',
          type: 'string'
        },
        "Vendorsite__c": {
          name: 'Vendorsite__c',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "CreatedBy": {
          name: 'CreatedBy',
          type: 'string'
        },
        "LastModifiedBy": {
          name: 'LastModifiedBy',
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
      }
    }
  }
}
