/* tslint:disable */

declare var Object: any;
export interface SkillInterface {
  "sfdcId"?: string;
  "Name": string;
  "slug"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Skill implements SkillInterface {
  "sfdcId": string;
  "Name": string;
  "slug": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: SkillInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Skill`.
   */
  public static getModelName() {
    return "Skill";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Skill for dynamic purposes.
  **/
  public static factory(data: SkillInterface): Skill{
    return new Skill(data);
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
      name: 'Skill',
      plural: 'Skills',
      path: 'Skills',
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
        "slug": {
          name: 'slug',
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
