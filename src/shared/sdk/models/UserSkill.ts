/* tslint:disable */
import {
  Users,
  Skill
} from '../index';

declare var Object: any;
export interface UserSkillInterface {
  "UserId": number;
  "SkillId": number;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  user?: Users;
  skill?: Skill;
}

export class UserSkill implements UserSkillInterface {
  "UserId": number;
  "SkillId": number;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  user: Users;
  skill: Skill;
  constructor(data?: UserSkillInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `UserSkill`.
   */
  public static getModelName() {
    return "UserSkill";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of UserSkill for dynamic purposes.
  **/
  public static factory(data: UserSkillInterface): UserSkill{
    return new UserSkill(data);
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
      name: 'UserSkill',
      plural: 'UserSkills',
      path: 'UserSkills',
      idName: 'id',
      properties: {
        "UserId": {
          name: 'UserId',
          type: 'number'
        },
        "SkillId": {
          name: 'SkillId',
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
        user: {
          name: 'user',
          type: 'Users',
          model: 'Users',
          relationType: 'belongsTo',
                  keyFrom: 'UserId',
          keyTo: 'id'
        },
        skill: {
          name: 'skill',
          type: 'Skill',
          model: 'Skill',
          relationType: 'belongsTo',
                  keyFrom: 'SkillId',
          keyTo: 'id'
        },
      }
    }
  }
}
