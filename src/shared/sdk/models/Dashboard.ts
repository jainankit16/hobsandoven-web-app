/* tslint:disable */

declare var Object: any;
export interface DashboardInterface {
  "id"?: number;
}

export class Dashboard implements DashboardInterface {
  "id": number;
  constructor(data?: DashboardInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Dashboard`.
   */
  public static getModelName() {
    return "Dashboard";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Dashboard for dynamic purposes.
  **/
  public static factory(data: DashboardInterface): Dashboard{
    return new Dashboard(data);
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
      name: 'Dashboard',
      plural: 'Dashboards',
      path: 'Dashboards',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
