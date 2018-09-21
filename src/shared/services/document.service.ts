import { Injectable } from '@angular/core';
import { DocumentCategoryApi, DocumentTitleApi } from '../sdk/services/custom';
import { DocumentCategory } from '../sdk/models';
import { BehaviorSubject } from "rxjs";

/**
 * Data service associated to document library. It fetches and caches data after first
 * request for data.
 * NOTE: Data isn't refreshed upon each call. Data will be only refreshed upon
 * application load.
 * It provides following data to user
 * - List of parent document categories
 * - List of document sub-categories
 * - List of document categories for given department
 */
@Injectable()
export class DocumentService {
    private categories: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private titles: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private categoriesDataFetched = false;
    private titlesDataFetched = false;

    constructor(private docCategoryApi: DocumentCategoryApi, private docTitleApi: DocumentTitleApi) {

    }

    private _fetchCategoryData() {
        this.docCategoryApi.find({ where: { isActive: true } }).subscribe(results => {
            this.categories.next(results);
            this.categoriesDataFetched = true;
        }, (err) => {
            this.categories.next([]);
        });
    }

    /**
     * Provides list of parent categories
     * @returns {any[]}
     */
    getCategories() {
        /**
         * If there is no category data available locally, try to fetch
         * from remote server and return records where parent ID is null.
         */
        // return this.categories.map(c => c.parentId === null);
        if (!this.categoriesDataFetched) {
            this._fetchCategoryData();
        }
        return this.categories.asObservable();
    }

    private _fetchTitlesData() {
        this.docTitleApi.find({ where: { isActive: true }, include: [{ relation: 'documentCategory', scope: { fields: ['title', 'id'] } }] }).subscribe(results => {
            this.titles.next(results);
            this.titlesDataFetched = true;
        }, (err) => {
            this.titles.next([]);
        });
    }

    /**
     * Provides list of sub categories
     * @returns {any[]}
     */
    getTitles() {
        /**
         * If there is no sub category data available locally, try to fetch
         * from remote server and return records where parent ID is null.
         */
        // return this.categories.map(c => c.parentId === null);
        if (!this.titlesDataFetched) {
            this._fetchTitlesData();
        }
        return this.titles.asObservable();
    }
}
