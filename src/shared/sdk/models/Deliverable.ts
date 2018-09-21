/* tslint:disable */

declare var Object: any;
export interface DeliverableInterface {
  "sfdcId": string;
  "CreatedById"?: string;
  "CreatedDate"?: Date;
  "Deliverable_Type__c"?: string;
  "Description__c"?: string;
  "Instructions__c"?: string;
  "LastModifiedById"?: string;
  "LastModifiedDate"?: Date;
  "Name"?: string;
  "File_upload_required__c"?: boolean;
  "id"?: number;
}

export class Deliverable implements DeliverableInterface {
  "sfdcId": string;
  "CreatedById": string;
  "CreatedDate": Date;
  "Deliverable_Type__c": string;
  "Description__c": string;
  "Instructions__c": string;
  "LastModifiedById": string;
  "LastModifiedDate": Date;
  "Name": string;
  "File_upload_required__c": boolean;
  "id": number;
  constructor(data?: DeliverableInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Deliverable`.
   */
  public static getModelName() {
    return "Deliverable";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Deliverable for dynamic purposes.
  **/
  public static factory(data: DeliverableInterface): Deliverable{
    return new Deliverable(data);
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
      name: 'Deliverable',
      plural: 'Deliverables',
      path: 'Deliverables',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "Deliverable_Type__c": {
          name: 'Deliverable_Type__c',
          type: 'string'
        },
        "Description__c": {
          name: 'Description__c',
          type: 'string'
        },
        "Instructions__c": {
          name: 'Instructions__c',
          type: 'string'
        },
        "LastModifiedById": {
          name: 'LastModifiedById',
          type: 'string'
        },
        "LastModifiedDate": {
          name: 'LastModifiedDate',
          type: 'Date'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "File_upload_required__c": {
          name: 'File_upload_required__c',
          type: 'boolean',
          default: false
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
