/* tslint:disable */

declare var Object: any;
export interface VatMasterInterface {
  "sfdcId"?: string;
  "VAT_GST__c"?: number;
  "Name": string;
  "Country__c"?: string;
  "id"?: number;
}

export class VatMaster implements VatMasterInterface {
  "sfdcId": string;
  "VAT_GST__c": number;
  "Name": string;
  "Country__c": string;
  "id": number;
  constructor(data?: VatMasterInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `VatMaster`.
   */
  public static getModelName() {
    return "VatMaster";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of VatMaster for dynamic purposes.
  **/
  public static factory(data: VatMasterInterface): VatMaster{
    return new VatMaster(data);
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
      name: 'VatMaster',
      plural: 'VatMasters',
      path: 'VatMasters',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "VAT_GST__c": {
          name: 'VAT_GST__c',
          type: 'number'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Country__c": {
          name: 'Country__c',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
