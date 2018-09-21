/* tslint:disable */

declare var Object: any;
export interface TalentTypeInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Description__c"?: string;
  "Talent_Type_Name__c"?: string;
  "Recordid__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class TalentType implements TalentTypeInterface {
  "sfdcId": string;
  "Name": string;
  "Description__c": string;
  "Talent_Type_Name__c": string;
  "Recordid__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: TalentTypeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TalentType`.
   */
  public static getModelName() {
    return "TalentType";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TalentType for dynamic purposes.
  **/
  public static factory(data: TalentTypeInterface): TalentType{
    return new TalentType(data);
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
      name: 'TalentType',
      plural: 'TalentTypes',
      path: 'TalentTypes',
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
        "Description__c": {
          name: 'Description__c',
          type: 'string'
        },
        "Talent_Type_Name__c": {
          name: 'Talent_Type_Name__c',
          type: 'string'
        },
        "Recordid__c": {
          name: 'Recordid__c',
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
