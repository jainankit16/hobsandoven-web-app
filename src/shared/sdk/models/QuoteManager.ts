/* tslint:disable */
import {
  Jobsite,
  GeoMetro,
  TalentType,
  Account,
  Project,
  QuoteLineManager
} from '../index';

declare var Object: any;
export interface QuoteManagerInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "Quote_Version__c"?: string;
  "CreatedDate"?: Date;
  "Jobsite_Project__c"?: string;
  "Project_SOP__c"?: string;
  "Partner__c"?: string;
  "GEO_Metro__c"?: string;
  "Template_Name__c"?: string;
  "Template_Description__c"?: string;
  "Default_Quote__c"?: boolean;
  "Jobsite__c"?: string;
  "Iron_Quote_Number__c"?: string;
  "Quote_Manager_Version__c"?: string;
  "Quote_Number__c"?: number;
  "Street__c"?: string;
  "Zip_Postal_Code__c"?: string;
  "Country__c"?: string;
  "State__c"?: string;
  "City__c"?: string;
  "Service_Location__c"?: string;
  "Program_Reference_Code__c"?: string;
  "Dispatch_SLA_Priority__c"?: string;
  "Service_Type__c"?: string;
  "Service_Engineer_Talent_Type__c"?: string;
  "Service_Engineer_Technical_Level__c"?: string;
  "description__c"?: string;
  "Quote_Select__c"?: boolean;
  "Quote_Status__c"?: string;
  "Total_Amount__c"?: number;
  "CurrencyIsoCode"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  Jobsite?: Jobsite;
  GeoMetro?: GeoMetro;
  TalentType?: TalentType;
  Partner?: Account;
  Project?: Project;
  QuoteLineManagers?: QuoteLineManager[];
  Jobsites?: Jobsite[];
}

export class QuoteManager implements QuoteManagerInterface {
  "sfdcId": string;
  "Name": string;
  "Quote_Version__c": string;
  "CreatedDate": Date;
  "Jobsite_Project__c": string;
  "Project_SOP__c": string;
  "Partner__c": string;
  "GEO_Metro__c": string;
  "Template_Name__c": string;
  "Template_Description__c": string;
  "Default_Quote__c": boolean;
  "Jobsite__c": string;
  "Iron_Quote_Number__c": string;
  "Quote_Manager_Version__c": string;
  "Quote_Number__c": number;
  "Street__c": string;
  "Zip_Postal_Code__c": string;
  "Country__c": string;
  "State__c": string;
  "City__c": string;
  "Service_Location__c": string;
  "Program_Reference_Code__c": string;
  "Dispatch_SLA_Priority__c": string;
  "Service_Type__c": string;
  "Service_Engineer_Talent_Type__c": string;
  "Service_Engineer_Technical_Level__c": string;
  "description__c": string;
  "Quote_Select__c": boolean;
  "Quote_Status__c": string;
  "Total_Amount__c": number;
  "CurrencyIsoCode": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  Jobsite: Jobsite;
  GeoMetro: GeoMetro;
  TalentType: TalentType;
  Partner: Account;
  Project: Project;
  QuoteLineManagers: QuoteLineManager[];
  Jobsites: Jobsite[];
  constructor(data?: QuoteManagerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `QuoteManager`.
   */
  public static getModelName() {
    return "QuoteManager";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of QuoteManager for dynamic purposes.
  **/
  public static factory(data: QuoteManagerInterface): QuoteManager{
    return new QuoteManager(data);
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
      name: 'QuoteManager',
      plural: 'QuoteManagers',
      path: 'QuoteManagers',
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
        "Quote_Version__c": {
          name: 'Quote_Version__c',
          type: 'string'
        },
        "CreatedDate": {
          name: 'CreatedDate',
          type: 'Date'
        },
        "Jobsite_Project__c": {
          name: 'Jobsite_Project__c',
          type: 'string'
        },
        "Project_SOP__c": {
          name: 'Project_SOP__c',
          type: 'string'
        },
        "Partner__c": {
          name: 'Partner__c',
          type: 'string'
        },
        "GEO_Metro__c": {
          name: 'GEO_Metro__c',
          type: 'string'
        },
        "Template_Name__c": {
          name: 'Template_Name__c',
          type: 'string'
        },
        "Template_Description__c": {
          name: 'Template_Description__c',
          type: 'string'
        },
        "Default_Quote__c": {
          name: 'Default_Quote__c',
          type: 'boolean'
        },
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "Iron_Quote_Number__c": {
          name: 'Iron_Quote_Number__c',
          type: 'string'
        },
        "Quote_Manager_Version__c": {
          name: 'Quote_Manager_Version__c',
          type: 'string'
        },
        "Quote_Number__c": {
          name: 'Quote_Number__c',
          type: 'number'
        },
        "Street__c": {
          name: 'Street__c',
          type: 'string'
        },
        "Zip_Postal_Code__c": {
          name: 'Zip_Postal_Code__c',
          type: 'string'
        },
        "Country__c": {
          name: 'Country__c',
          type: 'string'
        },
        "State__c": {
          name: 'State__c',
          type: 'string'
        },
        "City__c": {
          name: 'City__c',
          type: 'string'
        },
        "Service_Location__c": {
          name: 'Service_Location__c',
          type: 'string'
        },
        "Program_Reference_Code__c": {
          name: 'Program_Reference_Code__c',
          type: 'string'
        },
        "Dispatch_SLA_Priority__c": {
          name: 'Dispatch_SLA_Priority__c',
          type: 'string'
        },
        "Service_Type__c": {
          name: 'Service_Type__c',
          type: 'string'
        },
        "Service_Engineer_Talent_Type__c": {
          name: 'Service_Engineer_Talent_Type__c',
          type: 'string'
        },
        "Service_Engineer_Technical_Level__c": {
          name: 'Service_Engineer_Technical_Level__c',
          type: 'string'
        },
        "description__c": {
          name: 'description__c',
          type: 'string'
        },
        "Quote_Select__c": {
          name: 'Quote_Select__c',
          type: 'boolean'
        },
        "Quote_Status__c": {
          name: 'Quote_Status__c',
          type: 'string'
        },
        "Total_Amount__c": {
          name: 'Total_Amount__c',
          type: 'number'
        },
        "CurrencyIsoCode": {
          name: 'CurrencyIsoCode',
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
        Jobsite: {
          name: 'Jobsite',
          type: 'Jobsite',
          model: 'Jobsite',
          relationType: 'belongsTo',
                  keyFrom: 'Jobsite__c',
          keyTo: 'sfdcId'
        },
        GeoMetro: {
          name: 'GeoMetro',
          type: 'GeoMetro',
          model: 'GeoMetro',
          relationType: 'belongsTo',
                  keyFrom: 'GEO_Metro__c',
          keyTo: 'sfdcId'
        },
        TalentType: {
          name: 'TalentType',
          type: 'TalentType',
          model: 'TalentType',
          relationType: 'belongsTo',
                  keyFrom: 'Service_Engineer_Talent_Type__c',
          keyTo: 'sfdcId'
        },
        Partner: {
          name: 'Partner',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Partner__c',
          keyTo: 'sfdcId'
        },
        Project: {
          name: 'Project',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'Project_SOP__c',
          keyTo: 'sfdcId'
        },
        QuoteLineManagers: {
          name: 'QuoteLineManagers',
          type: 'QuoteLineManager[]',
          model: 'QuoteLineManager',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'QuoteManager__c'
        },
        Jobsites: {
          name: 'Jobsites',
          type: 'Jobsite[]',
          model: 'Jobsite',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Jobsite__c'
        },
      }
    }
  }
}
