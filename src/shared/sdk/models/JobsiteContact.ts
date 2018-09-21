/* tslint:disable */
import {
  Jobsite,
  Contact
} from '../index';

declare var Object: any;
export interface JobsiteContactInterface {
  "sfdcId"?: string;
  "Contact__c"?: string;
  "Jobsite__c"?: string;
  "Jobsite_Contact_Type__c"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  jobsite?: Jobsite;
  contact?: Contact;
}

export class JobsiteContact implements JobsiteContactInterface {
  "sfdcId": string;
  "Contact__c": string;
  "Jobsite__c": string;
  "Jobsite_Contact_Type__c": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  jobsite: Jobsite;
  contact: Contact;
  constructor(data?: JobsiteContactInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `JobsiteContact`.
   */
  public static getModelName() {
    return "JobsiteContact";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of JobsiteContact for dynamic purposes.
  **/
  public static factory(data: JobsiteContactInterface): JobsiteContact{
    return new JobsiteContact(data);
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
      name: 'JobsiteContact',
      plural: 'JobsiteContacts',
      path: 'JobsiteContacts',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "Contact__c": {
          name: 'Contact__c',
          type: 'string'
        },
        "Jobsite__c": {
          name: 'Jobsite__c',
          type: 'string'
        },
        "Jobsite_Contact_Type__c": {
          name: 'Jobsite_Contact_Type__c',
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
        jobsite: {
          name: 'jobsite',
          type: 'Jobsite',
          model: 'Jobsite',
          relationType: 'belongsTo',
                  keyFrom: 'Jobsite__c',
          keyTo: 'sfdcId'
        },
        contact: {
          name: 'contact',
          type: 'Contact',
          model: 'Contact',
          relationType: 'belongsTo',
                  keyFrom: 'Contact__c',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
