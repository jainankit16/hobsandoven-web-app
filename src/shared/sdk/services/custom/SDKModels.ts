/* tslint:disable */
import { Injectable } from '@angular/core';
import { Users } from '../../models/Users';
import { Activity } from '../../models/Activity';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Users: Users,
    Activity: Activity,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
