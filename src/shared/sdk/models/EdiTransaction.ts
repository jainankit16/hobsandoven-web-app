/* tslint:disable */
import {
  Project
} from '../index';

declare var Object: any;
export interface EdiTransactionInterface {
  "AccountId": string;
  "ProgramId": string;
  "AccountName": string;
  "Type": string;
  "Message": string;
  "RequestDataRaw"?: string;
  "RequestDataBase64"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  program?: Project;
}

export class EdiTransaction implements EdiTransactionInterface {
  "AccountId": string;
  "ProgramId": string;
  "AccountName": string;
  "Type": string;
  "Message": string;
  "RequestDataRaw": string;
  "RequestDataBase64": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  program: Project;
  constructor(data?: EdiTransactionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `EdiTransaction`.
   */
  public static getModelName() {
    return "EdiTransaction";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of EdiTransaction for dynamic purposes.
  **/
  public static factory(data: EdiTransactionInterface): EdiTransaction{
    return new EdiTransaction(data);
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
      name: 'EdiTransaction',
      plural: 'EdiTransactions',
      path: 'EdiTransactions',
      idName: 'id',
      properties: {
        "AccountId": {
          name: 'AccountId',
          type: 'string'
        },
        "ProgramId": {
          name: 'ProgramId',
          type: 'string'
        },
        "AccountName": {
          name: 'AccountName',
          type: 'string'
        },
        "Type": {
          name: 'Type',
          type: 'string'
        },
        "Message": {
          name: 'Message',
          type: 'string'
        },
        "RequestDataRaw": {
          name: 'RequestDataRaw',
          type: 'string'
        },
        "RequestDataBase64": {
          name: 'RequestDataBase64',
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
        program: {
          name: 'program',
          type: 'Project',
          model: 'Project',
          relationType: 'belongsTo',
                  keyFrom: 'ProgramId',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
