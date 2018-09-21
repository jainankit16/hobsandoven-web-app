import { Injectable } from '@angular/core';
import { DepartmentApi } from '../sdk/services/custom';
import { BehaviorSubject } from 'rxjs';

/**
 * Data service associated to department library.
 */
@Injectable()
export class DepartmentService {
  private departments: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private dataFetched = false;

  constructor(private _departmentApi: DepartmentApi) { }

  private _fetchData() {
    this._departmentApi.find({ where: { IsActive: true } }).subscribe(
      results => {
        this.departments.next(results);
        this.dataFetched = true;
      },
      err => {
        this.departments.next([]);
      }
    );
  }

  /**
   * Provides list of departments
   * @returns {any[]}
   */
  getDepartments() {
    if (!this.dataFetched) {
      this._fetchData();
    }
    return this.departments.asObservable();
  }
}
