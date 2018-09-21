/* tslint:disable */

declare var Object: any;
export interface LibraryHeaderInterface {
  "sfdcId": string;
  "Name"?: string;
  "OwnerId"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "Complete__c"?: number;
  "Description__c"?: string;
  "Due_Date__c"?: Date;
  "Duration__c"?: number;
  "Duration_Type__c"?: string;
  "Name__c"?: string;
  "PgMO_Library_Milestone__c"?: string;
  "PgMO_Library_Task__c"?: string;
  "Project_Category__c"?: string;
  "Sequence_Number__c"?: number;
  "Start_Date__c"?: Date;
  "Status__c"?: string;
  "Type_of_Record__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  libraryMilestone?: LibraryHeader;
  libraryTask?: LibraryHeader;
}

export class LibraryHeader implements LibraryHeaderInterface {
  "sfdcId": string;
  "Name": string;
  "OwnerId": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "Complete__c": number;
  "Description__c": string;
  "Due_Date__c": Date;
  "Duration__c": number;
  "Duration_Type__c": string;
  "Name__c": string;
  "PgMO_Library_Milestone__c": string;
  "PgMO_Library_Task__c": string;
  "Project_Category__c": string;
  "Sequence_Number__c": number;
  "Start_Date__c": Date;
  "Status__c": string;
  "Type_of_Record__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  libraryMilestone: LibraryHeader;
  libraryTask: LibraryHeader;
  constructor(data?: LibraryHeaderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `LibraryHeader`.
   */
  public static getModelName() {
    return "LibraryHeader";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of LibraryHeader for dynamic purposes.
  **/
  public static factory(data: LibraryHeaderInterface): LibraryHeader{
    return new LibraryHeader(data);
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
      name: 'LibraryHeader',
      plural: 'LibraryHeaders',
      path: 'LibraryHeaders',
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
        "OwnerId": {
          name: 'OwnerId',
          type: 'string'
        },
        "LastModifiedById": {
          name: 'LastModifiedById',
          type: 'string'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "CreatedById": {
          name: 'CreatedById',
          type: 'string'
        },
        "Complete__c": {
          name: 'Complete__c',
          type: 'number'
        },
        "Description__c": {
          name: 'Description__c',
          type: 'string'
        },
        "Due_Date__c": {
          name: 'Due_Date__c',
          type: 'Date'
        },
        "Duration__c": {
          name: 'Duration__c',
          type: 'number'
        },
        "Duration_Type__c": {
          name: 'Duration_Type__c',
          type: 'string'
        },
        "Name__c": {
          name: 'Name__c',
          type: 'string'
        },
        "PgMO_Library_Milestone__c": {
          name: 'PgMO_Library_Milestone__c',
          type: 'string'
        },
        "PgMO_Library_Task__c": {
          name: 'PgMO_Library_Task__c',
          type: 'string'
        },
        "Project_Category__c": {
          name: 'Project_Category__c',
          type: 'string'
        },
        "Sequence_Number__c": {
          name: 'Sequence_Number__c',
          type: 'number'
        },
        "Start_Date__c": {
          name: 'Start_Date__c',
          type: 'Date'
        },
        "Status__c": {
          name: 'Status__c',
          type: 'string'
        },
        "Type_of_Record__c": {
          name: 'Type_of_Record__c',
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
        libraryMilestone: {
          name: 'libraryMilestone',
          type: 'LibraryHeader',
          model: 'LibraryHeader',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Library_Milestone__c',
          keyTo: 'sfdcId'
        },
        libraryTask: {
          name: 'libraryTask',
          type: 'LibraryHeader',
          model: 'LibraryHeader',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Library_Task__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
