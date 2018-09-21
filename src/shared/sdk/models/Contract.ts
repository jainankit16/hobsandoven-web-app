/* tslint:disable */
import {
  Account
} from '../index';

declare var Object: any;
export interface ContractInterface {
  "Name"?: string;
  "sfdcId"?: string;
  "ContractNumber"?: string;
  "AccountId"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  account?: Account;
}

export class Contract implements ContractInterface {
  "Name": string;
  "sfdcId": string;
  "ContractNumber": string;
  "AccountId": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  account: Account;
  constructor(data?: ContractInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Contract`.
   */
  public static getModelName() {
    return "Contract";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Contract for dynamic purposes.
  **/
  public static factory(data: ContractInterface): Contract{
    return new Contract(data);
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
      name: 'Contract',
      plural: 'Contracts',
      path: 'Contracts',
      idName: 'id',
      properties: {
        "Name": {
          name: 'Name',
          type: 'string'
        },
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "ContractNumber": {
          name: 'ContractNumber',
          type: 'string'
        },
        "AccountId": {
          name: 'AccountId',
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
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'AccountId',
          keyTo: 'sfdcId'
        },
      }
    }
  }
}
