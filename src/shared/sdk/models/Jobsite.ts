/* tslint:disable */
import {
  Account,
  Project,
  Contact,
  CountryCode,
  GeoMetro,
  JobsiteContact,
  GeoPoint
} from '../index';

declare var Object: any;
export interface JobsiteInterface {
  "sfdcId"?: string;
  "Account__c"?: string;
  "City__c"?: string;
  "Count_of_Service_Desk_Contacts__c"?: number;
  "Count_of_Technical_Escalation_Contacts__c"?: number;
  "Country__c"?: string;
  "CreatedById"?: string;
  "CreatedDate"?: Date;
  "GEO_Metro__c"?: string;
  "Jobsite_ID__c"?: string;
  "Jobsite_Status__c"?: string;
  "LastModifiedById"?: string;
  "LastModifiedDate"?: Date;
  "Name"?: string;
  "State__c"?: string;
  "Street__c"?: string;
  "Type__c"?: string;
  "Zip__c"?: string;
  "Contact_Email__c"?: string;
  "Contact_Phone__c"?: string;
  "Jobsite_Description__c"?: string;
  "Jobsite_Key_Contact__c"?: string;
  "Partner__c"?: string;
  "partner_provided_Jobsite_id__c"?: string;
  "geolocation__c"?: GeoPoint;
  "geolocation__Latitude__s"?: number;
  "geolocation__Longitude__s"?: number;
  "Jobsite_Approval_Status__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "Jobsite__c"?: string;
  partner?: Account;
  account?: Account;
  Projects?: Project[];
  jobsiteKeyContact?: Contact;
  countryCode?: CountryCode;
  GeoMetro?: GeoMetro;
  contacts?: Contact[];
  jobsiteContacts?: JobsiteContact[];
}

export class Jobsite implements JobsiteInterface {
  "sfdcId": string;
  "Account__c": string;
  "City__c": string;
  "Count_of_Service_Desk_Contacts__c": number;
  "Count_of_Technical_Escalation_Contacts__c": number;
  "Country__c": string;
  "CreatedById": string;
  "CreatedDate": Date;
  "GEO_Metro__c": string;
  "Jobsite_ID__c": string;
  "Jobsite_Status__c": string;
  "LastModifiedById": string;
  "LastModifiedDate": Date;
  "Name": string;
  "State__c": string;
  "Street__c": string;
  "Type__c": string;
  "Zip__c": string;
  "Contact_Email__c": string;
  "Contact_Phone__c": string;
  "Jobsite_Description__c": string;
  "Jobsite_Key_Contact__c": string;
  "Partner__c": string;
  "partner_provided_Jobsite_id__c": string;
  "geolocation__c": GeoPoint;
  "geolocation__Latitude__s": number;
  "geolocation__Longitude__s": number;
  "Jobsite_Approval_Status__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "Jobsite__c": string;
  partner: Account;
  account: Account;
  Projects: Project[];
  jobsiteKeyContact: Contact;
  countryCode: CountryCode;
  GeoMetro: GeoMetro;
  contacts: Contact[];
  jobsiteContacts: JobsiteContact[];
  constructor(data?: JobsiteInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Jobsite`.
   */
  public static getModelName() {
    return "Jobsite";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Jobsite for dynamic purposes.
  **/
  public static factory(data: JobsiteInterface): Jobsite{
    return new Jobsite(data);
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
      name: 'Jobsite',
      plural: 'Jobsites',
      path: 'Jobsites',
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
        "City__c": {
          name: 'City__c',
          type: 'string'
        },
        "Count_of_Service_Desk_Contacts__c": {
          name: 'Count_of_Service_Desk_Contacts__c',
          type: 'number'
        },
        "Count_of_Technical_Escalation_Contacts__c": {
          name: 'Count_of_Technical_Escalation_Contacts__c',
          type: 'number'
        },
        "Country__c": {
          name: 'Country__c',
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
        "GEO_Metro__c": {
          name: 'GEO_Metro__c',
          type: 'string'
        },
        "Jobsite_ID__c": {
          name: 'Jobsite_ID__c',
          type: 'string'
        },
        "Jobsite_Status__c": {
          name: 'Jobsite_Status__c',
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
        "State__c": {
          name: 'State__c',
          type: 'string'
        },
        "Street__c": {
          name: 'Street__c',
          type: 'string'
        },
        "Type__c": {
          name: 'Type__c',
          type: 'string'
        },
        "Zip__c": {
          name: 'Zip__c',
          type: 'string'
        },
        "Contact_Email__c": {
          name: 'Contact_Email__c',
          type: 'string'
        },
        "Contact_Phone__c": {
          name: 'Contact_Phone__c',
          type: 'string'
        },
        "Jobsite_Description__c": {
          name: 'Jobsite_Description__c',
          type: 'string'
        },
        "Jobsite_Key_Contact__c": {
          name: 'Jobsite_Key_Contact__c',
          type: 'string'
        },
        "Partner__c": {
          name: 'Partner__c',
          type: 'string'
        },
        "partner_provided_Jobsite_id__c": {
          name: 'partner_provided_Jobsite_id__c',
          type: 'string'
        },
        "geolocation__c": {
          name: 'geolocation__c',
          type: 'GeoPoint'
        },
        "geolocation__Latitude__s": {
          name: 'geolocation__Latitude__s',
          type: 'number'
        },
        "geolocation__Longitude__s": {
          name: 'geolocation__Longitude__s',
          type: 'number'
        },
        "Jobsite_Approval_Status__c": {
          name: 'Jobsite_Approval_Status__c',
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
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
      },
      relations: {
        partner: {
          name: 'partner',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Partner__c',
          keyTo: 'sfdcId'
        },
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'Account__c',
          keyTo: 'sfdcId'
        },
        Projects: {
          name: 'Projects',
          type: 'Project[]',
          model: 'Project',
          relationType: 'hasMany',
          modelThrough: 'JobsiteProjects',
          keyThrough: 'projectId',
          keyFrom: 'id',
          keyTo: 'Jobsite__c'
        },
        jobsiteKeyContact: {
          name: 'jobsiteKeyContact',
          type: 'Contact',
          model: 'Contact',
          relationType: 'belongsTo',
                  keyFrom: 'Jobsite_Key_Contact__c',
          keyTo: 'sfdcId'
        },
        countryCode: {
          name: 'countryCode',
          type: 'CountryCode',
          model: 'CountryCode',
          relationType: 'belongsTo',
                  keyFrom: 'Country__c',
          keyTo: 'Name'
        },
        GeoMetro: {
          name: 'GeoMetro',
          type: 'GeoMetro',
          model: 'GeoMetro',
          relationType: 'belongsTo',
                  keyFrom: 'GEO_Metro__c',
          keyTo: 'sfdcId'
        },
        contacts: {
          name: 'contacts',
          type: 'Contact[]',
          model: 'Contact',
          relationType: 'hasMany',
          modelThrough: 'JobsiteContact',
          keyThrough: 'contactId',
          keyFrom: 'id',
          keyTo: 'Jobsite__c'
        },
        jobsiteContacts: {
          name: 'jobsiteContacts',
          type: 'JobsiteContact[]',
          model: 'JobsiteContact',
          relationType: 'hasMany',
                  keyFrom: 'sfdcId',
          keyTo: 'Jobsite__c'
        },
      }
    }
  }
}
