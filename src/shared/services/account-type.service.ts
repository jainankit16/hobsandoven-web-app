import { Injectable } from '@angular/core';
import { RecordTypeApi } from '../sdk/services/custom';
import { BehaviorSubject } from 'rxjs';

/**
 * Data service associated to Record Type library.
 */
@Injectable()
export class AccountTypeService {
    private types: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private dataFetched = false;

    constructor(private _recordTypeApi: RecordTypeApi) { }

    private _fetchData() {
        this._recordTypeApi.find({
            fields:['sfdcId', 'Name'],
            where: {
                Name: { inq: ['Vendor', 'Partner', 'Customer'] },
                SobjectType: 'Account'
            }
        }).subscribe(
            results => {
                this.types.next(results);
                this.dataFetched = true;
            },
            err => {
                this.types.next([]);
            }
        );
    }

    /**
     * Provides list of Account Types
     * @returns {any[]}
     */
    getAccountTypes() {
        if (!this.dataFetched) {
            this._fetchData();
        }
        return this.types.asObservable();
    }
}
