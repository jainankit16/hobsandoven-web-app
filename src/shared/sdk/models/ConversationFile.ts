/* tslint:disable */
import {
  Worker,
  Conversation,
  Files
} from '../index';

declare var Object: any;
export interface ConversationFileInterface {
  "sfdcId": string;
  "Name"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "PgMO_Conversation__c"?: string;
  "Worker__c"?: string;
  "PgMO_Files__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  worker?: Worker;
  conversation?: Conversation;
  file?: Files;
}

export class ConversationFile implements ConversationFileInterface {
  "sfdcId": string;
  "Name": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "PgMO_Conversation__c": string;
  "Worker__c": string;
  "PgMO_Files__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  worker: Worker;
  conversation: Conversation;
  file: Files;
  constructor(data?: ConversationFileInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ConversationFile`.
   */
  public static getModelName() {
    return "ConversationFile";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ConversationFile for dynamic purposes.
  **/
  public static factory(data: ConversationFileInterface): ConversationFile{
    return new ConversationFile(data);
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
      name: 'ConversationFile',
      plural: 'ConversationFiles',
      path: 'ConversationFiles',
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
        "PgMO_Conversation__c": {
          name: 'PgMO_Conversation__c',
          type: 'string'
        },
        "Worker__c": {
          name: 'Worker__c',
          type: 'string'
        },
        "PgMO_Files__c": {
          name: 'PgMO_Files__c',
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
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'Worker__c',
          keyTo: 'sfdcId'
        },
        conversation: {
          name: 'conversation',
          type: 'Conversation',
          model: 'Conversation',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Conversation__c',
          keyTo: 'sfdcId'
        },
        file: {
          name: 'file',
          type: 'Files',
          model: 'Files',
          relationType: 'belongsTo',
                  keyFrom: 'PgMO_Files__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
