/* tslint:disable */

declare var Object: any;
export interface IronCustomFieldInterface {
  "sfdcId"?: string;
  "Account__c"?: string;
  "CreatedBy"?: string;
  "LastModifiedBy"?: string;
  "CurrencyIsoCode"?: string;
  "Name"?: string;
  "Case_Created_By_FacebookOwnerFB__c"?: string;
  "Case_Status_Facebook_Status__c"?: string;
  "ICC_Case__c"?: string;
  "Job__c"?: string;
  "Partner_Case_Log_Available_Facebook_AHS__c"?: string;
  "Partner_Case_Log_Available_Facebook_IML__c"?: string;
  "PMC_Case__c"?: string;
  "PMS_Case__c"?: string;
  "Priority_Facebook_Priority__c"?: string;
  "Program__c"?: string;
  "Request_Form_Receipt__c"?: string;
  "SLA__c"?: string;
  "Talent_Type__c"?: string;
  "Type_FacebookTicket_Type__c"?: string;
  "Work_Order__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class IronCustomField implements IronCustomFieldInterface {
  "sfdcId": string;
  "Account__c": string;
  "CreatedBy": string;
  "LastModifiedBy": string;
  "CurrencyIsoCode": string;
  "Name": string;
  "Case_Created_By_FacebookOwnerFB__c": string;
  "Case_Status_Facebook_Status__c": string;
  "ICC_Case__c": string;
  "Job__c": string;
  "Partner_Case_Log_Available_Facebook_AHS__c": string;
  "Partner_Case_Log_Available_Facebook_IML__c": string;
  "PMC_Case__c": string;
  "PMS_Case__c": string;
  "Priority_Facebook_Priority__c": string;
  "Program__c": string;
  "Request_Form_Receipt__c": string;
  "SLA__c": string;
  "Talent_Type__c": string;
  "Type_FacebookTicket_Type__c": string;
  "Work_Order__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: IronCustomFieldInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `IronCustomField`.
   */
  public static getModelName() {
    return "IronCustomField";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of IronCustomField for dynamic purposes.
  **/
  public static factory(data: IronCustomFieldInterface): IronCustomField{
    return new IronCustomField(data);
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
      name: 'IronCustomField',
      plural: 'IronCustomFields',
      path: 'IronCustomFields',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Account__c": {
          name: 'Account__c',
          type: 'string'
        },
        "CreatedBy": {
          name: 'CreatedBy',
          type: 'string'
        },
        "LastModifiedBy": {
          name: 'LastModifiedBy',
          type: 'string'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
          type: 'string'
        },
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "Case_Created_By_FacebookOwnerFB__c": {
          name: 'Case_Created_By_FacebookOwnerFB__c',
          type: 'string'
        },
        "Case_Status_Facebook_Status__c": {
          name: 'Case_Status_Facebook_Status__c',
          type: 'string'
        },
        "ICC_Case__c": {
          name: 'ICC_Case__c',
          type: 'string'
        },
        "Job__c": {
          name: 'Job__c',
          type: 'string'
        },
        "Partner_Case_Log_Available_Facebook_AHS__c": {
          name: 'Partner_Case_Log_Available_Facebook_AHS__c',
          type: 'string'
        },
        "Partner_Case_Log_Available_Facebook_IML__c": {
          name: 'Partner_Case_Log_Available_Facebook_IML__c',
          type: 'string'
        },
        "PMC_Case__c": {
          name: 'PMC_Case__c',
          type: 'string'
        },
        "PMS_Case__c": {
          name: 'PMS_Case__c',
          type: 'string'
        },
        "Priority_Facebook_Priority__c": {
          name: 'Priority_Facebook_Priority__c',
          type: 'string'
        },
        "Program__c": {
          name: 'Program__c',
          type: 'string'
        },
        "Request_Form_Receipt__c": {
          name: 'Request_Form_Receipt__c',
          type: 'string'
        },
        "SLA__c": {
          name: 'SLA__c',
          type: 'string'
        },
        "Talent_Type__c": {
          name: 'Talent_Type__c',
          type: 'string'
        },
        "Type_FacebookTicket_Type__c": {
          name: 'Type_FacebookTicket_Type__c',
          type: 'string'
        },
        "Work_Order__c": {
          name: 'Work_Order__c',
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
