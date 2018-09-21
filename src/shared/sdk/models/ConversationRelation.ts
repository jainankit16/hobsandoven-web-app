/* tslint:disable */
import {
  Conversation
} from '../index';

declare var Object: any;
export interface ConversationRelationInterface {
  "sfdcId": string;
  "Name"?: string;
  "OwnerId"?: string;
  "LastModifiedById"?: string;
  "CurrencyIsoCode"?: string;
  "CreatedById"?: string;
  "PgMO_Conversation__c"?: string;
  "Related_to_Object__c"?: string;
  "Related_to_Record_Id__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  conversation?: Conversation;
}

export class ConversationRelation implements ConversationRelationInterface {
  "sfdcId": string;
  "Name": string;
  "OwnerId": string;
  "LastModifiedById": string;
  "CurrencyIsoCode": string;
  "CreatedById": string;
  "PgMO_Conversation__c": string;
  "Related_to_Object__c": string;
  "Related_to_Record_Id__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  conversation: Conversation;
  constructor(data?: ConversationRelationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ConversationRelation`.
   */
  public static getModelName() {
    return "ConversationRelation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ConversationRelation for dynamic purposes.
  **/
  public static factory(data: ConversationRelationInterface): ConversationRelation{
    return new ConversationRelation(data);
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
      name: 'ConversationRelation',
      plural: 'ConversationRelations',
      path: 'ConversationRelations',
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
        "PgMO_Conversation__c": {
          name: 'PgMO_Conversation__c',
          type: 'string'
        },
        "Related_to_Object__c": {
          name: 'Related_to_Object__c',
          type: 'string'
        },
        "Related_to_Record_Id__c": {
          name: 'Related_to_Record_Id__c',
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
