import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

import { ContainerApi } from '../sdk/services/custom/Container';
import { DocumentCategoryApi } from '../sdk/services/custom/DocumentCategory';
import { CountryCodeApi } from '../sdk/services/custom/CountryCode';
@Injectable()
export class CommonService {
    private userProfile: BehaviorSubject<any> = new BehaviorSubject<any>({});

    private arrPrevNext: Subject<any> = new Subject<any>();
    // arrPrevNext$= this.arrPrevNext.asObservable();
    private accountTypeList = new BehaviorSubject<object>(null);
    private accountTypefilter = new BehaviorSubject<object>(null);
    constructor(
        private containerApi: ContainerApi,
        private documentCategoryApi: DocumentCategoryApi,
        private _countryCode: CountryCodeApi
    ) { }

    setAccountTypeList(accountList: any) {
        this.accountTypeList.next(accountList);
    }
    getAccountTypeList() {
        return this.accountTypeList;
    }
    setAccountTypeFilter(filterCondition: any) {
        this.accountTypefilter.next(filterCondition);
    }
    getAccountTypeFilter() {
        return this.accountTypefilter;
    }

    getUserProfile(): Observable<any> {
        return this.userProfile.asObservable();
    }

    setUserProfile(userProfile: any) {
        this.userProfile.next(userProfile);
    }

    /*check if file exist in respective container*/
    fileExist(container, fileName) {
        return this.containerApi.getFile(container, fileName).map(res => res);
    }

    removeFile(container, fileName) {
        return this.containerApi.removeFile(container, fileName).map(res => res);
    }

    // check file type
    isImage(file: File): boolean {
        return /^image\//.test(file.type);
    }

    /**
     * get all category for listing page
     */
    getCategory(modelName) {
        return this.documentCategoryApi
            .find({
                where: {
                    isActive: 1,
                    modelName: modelName
                },
                fields: {
                    id: true,
                    title: true,
                    parentId: true
                }
            })
            .map(data => data);
    }

    setPrevNext(arrId) {
        const inArrID = [];
        arrId.forEach((item, index) => {
            inArrID.push(item['id']);
        });
        this.arrPrevNext.next(inArrID);
    }

    getPrevNext() {
        return this.arrPrevNext.asObservable();
    }

    getCountries() {
        return this._countryCode
            .find({ fields: { Name: true, Country__c: true } })
            .map(data => data);
    }
    /**
     * 
     * @param fileName 
     * @param allowedExtensions 
     */
    validateExtention(fileName, allowedExtensions) {
        if (fileName) {
            const parts = fileName.split('.'),
                extension = parts[parts.length - 1];
            if (allowedExtensions.indexOf(extension.toLowerCase()) === -1) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }

    }
}
