/* tslint:disable */
import {
  Worker,
  Conversation
} from '../index';

declare var Object: any;
export interface ConversationTrackerInterface {
  "sfdcId": string;
  "Name"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "PgMO_Conversation__c"?: string;
  "Worker__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  worker?: Worker;
  conversation?: Conversation;
}

export class ConversationTracker implements ConversationTrackerInterface {
  "sfdcId": string;
  "Name": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "PgMO_Conversation__c": string;
  "Worker__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  worker: Worker;
  conversation: Conversation;
  constructor(data?: ConversationTrackerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ConversationTracker`.
   */
  public static getModelName() {
    return "ConversationTracker";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ConversationTracker for dynamic purposes.
  **/
  public static factory(data: ConversationTrackerInterface): ConversationTracker{
    return new ConversationTracker(data);
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
      name: 'ConversationTracker',
      plural: 'ConversationTrackers',
      path: 'ConversationTrackers',
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
      }
    }
  }
}
