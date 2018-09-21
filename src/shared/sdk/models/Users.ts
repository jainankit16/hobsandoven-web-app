/* tslint:disable */
import {
  Account,
  UserType,
  Worker,
  Skill,
  Contact,
  DepartmentRole,
  MemberRole
} from '../index';

declare var Object: any;
export interface UsersInterface {
  "sfdcId"?: string;
  "WorkerSfdcId"?: string;
  "AccountId"?: string;
  "LocalAccountId"?: number;
  "firstname"?: string;
  "lastname": string;
  "email": string;
  "status"?: boolean;
  "picture"?: string;
  "profileImage"?: string;
  "url"?: string;
  "notifications"?: any;
  "preferences"?: any;
  "accessType"?: string;
  "isActive"?: boolean;
  "timezone"?: string;
  "promptPasswordChange"?: boolean;
  "created"?: Date;
  "userTypeId"?: number;
  "realm"?: string;
  "username"?: string;
  "emailVerified"?: boolean;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "password"?: string;
  accessTokens?: any[];
  account?: Account;
  userType?: UserType;
  worker?: Worker;
  skills?: Skill[];
  contact?: Contact;
  profile?: Contact;
  departmentRoles?: DepartmentRole[];
  memberRoles?: MemberRole[];
}

export class Users implements UsersInterface {
  "sfdcId": string;
  "WorkerSfdcId": string;
  "AccountId": string;
  "LocalAccountId": number;
  "firstname": string;
  "lastname": string;
  "email": string;
  "status": boolean;
  "picture": string;
  "profileImage": string;
  "url": string;
  "notifications": any;
  "preferences": any;
  "accessType": string;
  "isActive": boolean;
  "timezone": string;
  "promptPasswordChange": boolean;
  "created": Date;
  "userTypeId": number;
  "realm": string;
  "username": string;
  "emailVerified": boolean;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  "password": string;
  accessTokens: any[];
  account: Account;
  userType: UserType;
  worker: Worker;
  skills: Skill[];
  contact: Contact;
  profile: Contact;
  departmentRoles: DepartmentRole[];
  memberRoles: MemberRole[];
  constructor(data?: UsersInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Users`.
   */
  public static getModelName() {
    return "Users";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Users for dynamic purposes.
  **/
  public static factory(data: UsersInterface): Users{
    return new Users(data);
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
      name: 'Users',
      plural: 'Users',
      path: 'Users',
      idName: 'id',
      properties: {
        "sfdcId": {
          name: 'sfdcId',
          type: 'string'
        },
        "WorkerSfdcId": {
          name: 'WorkerSfdcId',
          type: 'string'
        },
        "AccountId": {
          name: 'AccountId',
          type: 'string'
        },
        "LocalAccountId": {
          name: 'LocalAccountId',
          type: 'number'
        },
        "firstname": {
          name: 'firstname',
          type: 'string'
        },
        "lastname": {
          name: 'lastname',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'boolean'
        },
        "picture": {
          name: 'picture',
          type: 'string'
        },
        "profileImage": {
          name: 'profileImage',
          type: 'string'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "notifications": {
          name: 'notifications',
          type: 'any'
        },
        "preferences": {
          name: 'preferences',
          type: 'any'
        },
        "accessType": {
          name: 'accessType',
          type: 'string',
          default: 'unknown'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean',
          default: true
        },
        "timezone": {
          name: 'timezone',
          type: 'string'
        },
        "promptPasswordChange": {
          name: 'promptPasswordChange',
          type: 'boolean',
          default: true
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "userTypeId": {
          name: 'userTypeId',
          type: 'number'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
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
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'AccountId',
          keyTo: 'sfdcId'
        },
        userType: {
          name: 'userType',
          type: 'UserType',
          model: 'UserType',
          relationType: 'belongsTo',
                  keyFrom: 'userTypeId',
          keyTo: 'id'
        },
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'WorkerSfdcId',
          keyTo: 'sfdcId'
        },
        skills: {
          name: 'skills',
          type: 'Skill[]',
          model: 'Skill',
          relationType: 'hasMany',
          modelThrough: 'UserSkill',
          keyThrough: 'SkillId',
          keyFrom: 'id',
          keyTo: 'UserId'
        },
        contact: {
          name: 'contact',
          type: 'Contact',
          model: 'Contact',
          relationType: 'belongsTo',
                  keyFrom: 'sfdcId',
          keyTo: 'sfdcId'
        },
        profile: {
          name: 'profile',
          type: 'Contact',
          model: 'Contact',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'UserId'
        },
        departmentRoles: {
          name: 'departmentRoles',
          type: 'DepartmentRole[]',
          model: 'DepartmentRole',
          relationType: 'hasMany',
                  keyFrom: 'WorkerSfdcId',
          keyTo: 'Worker__c'
        },
        memberRoles: {
          name: 'memberRoles',
          type: 'MemberRole[]',
          model: 'MemberRole',
          relationType: 'hasMany',
                  keyFrom: 'WorkerSfdcId',
          keyTo: 'Member__c'
        },
      }
    }
  }
}
