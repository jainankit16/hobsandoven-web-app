/* tslint:disable */

declare var Object: any;
export interface PmsIccPmcRecordTypeMappingInterface {
  "RecordTypes__c"?: string;
  "IsPMC__c"?: boolean;
  "IsPMS__c"?: boolean;
  "IsICC__c"?: boolean;
  "Name"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class PmsIccPmcRecordTypeMapping implements PmsIccPmcRecordTypeMappingInterface {
  "RecordTypes__c": string;
  "IsPMC__c": boolean;
  "IsPMS__c": boolean;
  "IsICC__c": boolean;
  "Name": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: PmsIccPmcRecordTypeMappingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PmsIccPmcRecordTypeMapping`.
   */
  public static getModelName() {
    return "PmsIccPmcRecordTypeMapping";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PmsIccPmcRecordTypeMapping for dynamic purposes.
  **/
  public static factory(data: PmsIccPmcRecordTypeMappingInterface): PmsIccPmcRecordTypeMapping{
    return new PmsIccPmcRecordTypeMapping(data);
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
      name: 'PmsIccPmcRecordTypeMapping',
      plural: 'PmsIccPmcRecordTypeMappings',
      path: 'PmsIccPmcRecordTypeMappings',
      idName: 'id',
      properties: {
        "RecordTypes__c": {
          name: 'RecordTypes__c',
          type: 'string'
        },
        "IsPMC__c": {
          name: 'IsPMC__c',
          type: 'boolean'
        },
        "IsPMS__c": {
          name: 'IsPMS__c',
          type: 'boolean'
        },
        "IsICC__c": {
          name: 'IsICC__c',
          type: 'boolean'
        },
        "Name": {
          name: 'Name',
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
