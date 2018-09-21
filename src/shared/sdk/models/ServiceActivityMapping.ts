/* tslint:disable */

declare var Object: any;
export interface ServiceActivityMappingInterface {
  "sfdcId"?: string;
  "Field_Label__c"?: string;
  "CreatedById"?: string;
  "Field_Name__c"?: string;
  "Object__c"?: string;
  "id"?: number;
}

export class ServiceActivityMapping implements ServiceActivityMappingInterface {
  "sfdcId": string;
  "Field_Label__c": string;
  "CreatedById": string;
  "Field_Name__c": string;
  "Object__c": string;
  "id": number;
  constructor(data?: ServiceActivityMappingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ServiceActivityMapping`.
   */
  public static getModelName() {
    return "ServiceActivityMapping";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ServiceActivityMapping for dynamic purposes.
  **/
  public static factory(data: ServiceActivityMappingInterface): ServiceActivityMapping{
    return new ServiceActivityMapping(data);
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
      name: 'ServiceActivityMapping',
      plural: 'ServiceActivityMappings',
      path: 'ServiceActivityMappings',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Field_Label__c": {
          name: 'Field_Label__c',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "Field_Name__c": {
          name: 'Field_Name__c',
          type: 'string'
        },
        "Object__c": {
          name: 'Object__c',
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
