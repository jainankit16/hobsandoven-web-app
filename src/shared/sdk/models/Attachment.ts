/* tslint:disable */
import {
  Job
} from '../index';

declare var Object: any;
export interface AttachmentInterface {
  "sfdcId"?: string;
  "Name"?: string;
  "ParentId"?: string;
  "Body"?: string;
  "ContentType"?: string;
  "createddate"?: Date;
  "CreatedbyId"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  job?: Job;
}

export class Attachment implements AttachmentInterface {
  "sfdcId": string;
  "Name": string;
  "ParentId": string;
  "Body": string;
  "ContentType": string;
  "createddate": Date;
  "CreatedbyId": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  job: Job;
  constructor(data?: AttachmentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Attachment`.
   */
  public static getModelName() {
    return "Attachment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Attachment for dynamic purposes.
  **/
  public static factory(data: AttachmentInterface): Attachment{
    return new Attachment(data);
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
      name: 'Attachment',
      plural: 'Attachments',
      path: 'Attachments',
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
        "ParentId": {
          name: 'ParentId',
          type: 'string'
        },
        "Body": {
          name: 'Body',
          type: 'string'
        },
        "ContentType": {
          name: 'ContentType',
          type: 'string'
        },
        "createddate": {
          name: 'createddate',
          type: 'Date'
        },
        "CreatedbyId": {
          name: 'CreatedbyId',
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
        job: {
          name: 'job',
          type: 'Job',
          model: 'Job',
          relationType: 'belongsTo',
                  keyFrom: 'ParentId',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
