/* tslint:disable */

declare var Object: any;
export interface ServiceCategorySettingInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Display_Name__c": string;
  "Image_URL__c"?: string;
  "Record_Type_Name__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class ServiceCategorySetting implements ServiceCategorySettingInterface {
  "sfdcId": string;
  "Name": string;
  "Display_Name__c": string;
  "Image_URL__c": string;
  "Record_Type_Name__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: ServiceCategorySettingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ServiceCategorySetting`.
   */
  public static getModelName() {
    return "ServiceCategorySetting";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ServiceCategorySetting for dynamic purposes.
  **/
  public static factory(data: ServiceCategorySettingInterface): ServiceCategorySetting{
    return new ServiceCategorySetting(data);
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
      name: 'ServiceCategorySetting',
      plural: 'ServiceCategorySettings',
      path: 'ServiceCategorySettings',
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
        "Display_Name__c": {
          name: 'Display_Name__c',
          type: 'string'
        },
        "Image_URL__c": {
          name: 'Image_URL__c',
          type: 'string'
        },
        "Record_Type_Name__c": {
          name: 'Record_Type_Name__c',
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
