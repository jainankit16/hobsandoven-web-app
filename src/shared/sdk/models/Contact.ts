/* tslint:disable */
import {
  Account,
  Worker,
  Users,
  Department
} from '../index';

declare var Object: any;
export interface ContactInterface {
  "UserId"?: number;
  "sfdcId"?: string;
  "Email"?: string;
  "AccountId"?: string;
  "Phone"?: string;
  "FirstName"?: string;
  "LastName"?: string;
  "Contact_Type__c"?: string;
  "Birthdate"?: Date;
  "Department"?: string;
  "Fax"?: string;
  "HomePhone"?: number;
  "MailingCity"?: string;
  "MailingState"?: string;
  "MailingCountry"?: string;
  "MailingPostalCode"?: string;
  "MailingStateCode"?: string;
  "MailingCountryCode"?: string;
  "MailingStreet"?: string;
  "MailingGeocodeAccuracy"?: string;
  "MailingLatitude"?: string;
  "MailingLongitude"?: string;
  "MobilePhone"?: string;
  "OtherPhone"?: string;
  "Title"?: string;
  "Contact_Time_Zone__c"?: string;
  "Gender__c"?: string;
  "CKSW_BASE__Languages__c"?: string;
  "LastLogin__c"?: Date;
  "LinkedIn_Profile_Link__c"?: string;
  "Resume__c"?: string;
  "Enable_App_Login__c"?: boolean;
  "Role__c"?: string;
  "Total_Experience_Months__c"?: number;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  account?: Account;
  worker?: Worker;
  users?: Users;
  department?: Department;
}

export class Contact implements ContactInterface {
  "UserId": number;
  "sfdcId": string;
  "Email": string;
  "AccountId": string;
  "Phone": string;
  "FirstName": string;
  "LastName": string;
  "Contact_Type__c": string;
  "Birthdate": Date;
  "Department": string;
  "Fax": string;
  "HomePhone": number;
  "MailingCity": string;
  "MailingState": string;
  "MailingCountry": string;
  "MailingPostalCode": string;
  "MailingStateCode": string;
  "MailingCountryCode": string;
  "MailingStreet": string;
  "MailingGeocodeAccuracy": string;
  "MailingLatitude": string;
  "MailingLongitude": string;
  "MobilePhone": string;
  "OtherPhone": string;
  "Title": string;
  "Contact_Time_Zone__c": string;
  "Gender__c": string;
  "CKSW_BASE__Languages__c": string;
  "LastLogin__c": Date;
  "LinkedIn_Profile_Link__c": string;
  "Resume__c": string;
  "Enable_App_Login__c": boolean;
  "Role__c": string;
  "Total_Experience_Months__c": number;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  account: Account;
  worker: Worker;
  users: Users;
  department: Department;
  constructor(data?: ContactInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Contact`.
   */
  public static getModelName() {
    return "Contact";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Contact for dynamic purposes.
  **/
  public static factory(data: ContactInterface): Contact{
    return new Contact(data);
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
      name: 'Contact',
      plural: 'Contacts',
      path: 'Contacts',
      idName: 'id',
      properties: {
        "UserId": {
          name: 'UserId',
          type: 'number'
        },
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Email": {
          name: 'Email',
          type: 'string'
        },
        "AccountId": {
          name: 'AccountId',
          type: 'string'
        },
        "Phone": {
          name: 'Phone',
          type: 'string'
        },
        "FirstName": {
          name: 'FirstName',
          type: 'string'
        },
        "LastName": {
          name: 'LastName',
          type: 'string'
        },
        "Contact_Type__c": {
          name: 'Contact_Type__c',
          type: 'string'
        },
        "Birthdate": {
          name: 'Birthdate',
          type: 'Date'
        },
        "Department": {
          name: 'Department',
          type: 'string'
        },
        "Fax": {
          name: 'Fax',
          type: 'string'
        },
        "HomePhone": {
          name: 'HomePhone',
          type: 'number'
        },
        "MailingCity": {
          name: 'MailingCity',
          type: 'string'
        },
        "MailingState": {
          name: 'MailingState',
          type: 'string'
        },
        "MailingCountry": {
          name: 'MailingCountry',
          type: 'string'
        },
        "MailingPostalCode": {
          name: 'MailingPostalCode',
          type: 'string'
        },
        "MailingStateCode": {
          name: 'MailingStateCode',
          type: 'string'
        },
        "MailingCountryCode": {
          name: 'MailingCountryCode',
          type: 'string'
        },
        "MailingStreet": {
          name: 'MailingStreet',
          type: 'string'
        },
        "MailingGeocodeAccuracy": {
          name: 'MailingGeocodeAccuracy',
          type: 'string'
        },
        "MailingLatitude": {
          name: 'MailingLatitude',
          type: 'string'
        },
        "MailingLongitude": {
          name: 'MailingLongitude',
          type: 'string'
        },
        "MobilePhone": {
          name: 'MobilePhone',
          type: 'string'
        },
        "OtherPhone": {
          name: 'OtherPhone',
          type: 'string'
        },
        "Title": {
          name: 'Title',
          type: 'string'
        },
        "Contact_Time_Zone__c": {
          name: 'Contact_Time_Zone__c',
          type: 'string'
        },
        "Gender__c": {
          name: 'Gender__c',
          type: 'string'
        },
        "CKSW_BASE__Languages__c": {
          name: 'CKSW_BASE__Languages__c',
          type: 'string'
        },
        "LastLogin__c": {
          name: 'LastLogin__c',
          type: 'Date'
        },
        "LinkedIn_Profile_Link__c": {
          name: 'LinkedIn_Profile_Link__c',
          type: 'string'
        },
        "Resume__c": {
          name: 'Resume__c',
          type: 'string'
        },
        "Enable_App_Login__c": {
          name: 'Enable_App_Login__c',
          type: 'boolean'
        },
        "Role__c": {
          name: 'Role__c',
          type: 'string'
        },
        "Total_Experience_Months__c": {
          name: 'Total_Experience_Months__c',
          type: 'number'
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
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'AccountId',
          keyTo: 'sfdcId'
        },
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'hasOne',
                  keyFrom: 'sfdcId',
          keyTo: 'Contact__c'
        },
        users: {
          name: 'users',
          type: 'Users',
          model: 'Users',
          relationType: 'belongsTo',
                  keyFrom: 'UserId',
          keyTo: 'id'
        },
        department: {
          name: 'department',
          type: 'Department',
          model: 'Department',
          relationType: 'belongsTo',
                  keyFrom: 'Department',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
