
import { HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';
// import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/Rx';
import { user, wizardstep } from '../../models/configureinfo.class';
import { environment } from 'environments/environment';

import { Angular2Csv } from '../../libs/angular2-csv';
import { DataFormatter } from './../../libs/dataFormatter';

@Injectable()
export class SharedService {
    private _requestOptions: any;
    wizardsteparr: wizardstep[];
    userState: BehaviorSubject<any> = new BehaviorSubject<any>({});
    dispatchProfile: BehaviorSubject<any> = new BehaviorSubject<any>({});
    selectedProfile: BehaviorSubject<any> = new BehaviorSubject<any>({});
    quoteLineObjs: BehaviorSubject<any> = new BehaviorSubject<any>({});
    filteredQuoteLineObjs: BehaviorSubject<any> = new BehaviorSubject<any>({});
    serviceOption: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    serviceProvider: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    ironsProvider: BehaviorSubject<any> = new BehaviorSubject<any>({});
    allProviders: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private activewizard = new Subject<number>();
    activewizard$ = this.activewizard.asObservable();
    isLoadProgram: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private _dataFormatter: DataFormatter) {
        this.wizardsteparr = [
            { name: 'Our Services', title: 'CSQD Services', link: '/pms/configure' },
            {
                name: 'Program Setup',
                title: 'CSQD program',
                link: '/pms/configure/program'
            },
            {
                name: 'Pricing Quote',
                title: 'CSQD Pricing',
                link: '/pms/configure/pricing'
            },
            {
                name: 'Process & Deliverables',
                title: 'CSQD Instruction',
                link: '/pms/configure/instruction'
            },
            {
                name: 'Schedule & Order',
                title: 'CSQD Schedule',
                link: '/pms/configure/schedule'
            },
            {
                name: 'Confirm Order',
                title: 'CSQD Order',
                link: '/pms/configure/confirm'
            },
            {
                name: 'Manage Order',
                title: 'CSQD Manage Order',
                link: ''
            },
            {
                name: 'Performance Rating',
                title: 'CSQD Performance',
                link: ''
            },
            {
                name: 'Billing',
                title: 'CSQD Order Billing',
                link: ''
            },
            {
                name: 'Closed',
                title: 'CSQD Order Closed',
                link: ''
            }
        ];


    }

    getUserState(): Observable<any> {
        return this.userState.asObservable();
    }
    setUserState(userState: any) {
        this.userState.next(userState);
    }

    getQuoteLineObj(): Observable<any> {
        return this.quoteLineObjs.asObservable();
    }
    setQuoteLineObj(quoteLineObj: any) {
        this.quoteLineObjs.next(quoteLineObj);
    }

    getFilteredQuoteLineObj(): Observable<any> {
        return this.filteredQuoteLineObjs.asObservable();
    }
    setFilteredQuoteLineObj(quoteLineObj: any) {
        this.filteredQuoteLineObjs.next(quoteLineObj);
    }

    getDispatchProfile(): Observable<any> {
        return this.dispatchProfile.asObservable();
    }
    setDispatchProfile(dispatchProfileData: any) {
        this.dispatchProfile.next(dispatchProfileData);
    }

    getSelectedProfile(): Observable<any> {
        return this.selectedProfile.asObservable();
    }
    setSelectedProfile(selectedProfileData: any) {
        this.selectedProfile.next(selectedProfileData);
    }
    setServiceProvider(serviceProvider: any[]) {
        this.serviceProvider.next(serviceProvider);
    }
    getIronsProvider(): Observable<any> {
        return this.ironsProvider.asObservable();
    }

    setIronsProvider(ironsProvider: any) {
        this.ironsProvider.next(ironsProvider);
    }

    setAllProviders(allProvider: any, reset: boolean) {
        if (reset) {
            this.allProviders.next(allProvider);
        } else {
            const allProviders = this.allProviders.value.concat(allProvider);
            this.allProviders.next(allProviders);
        }
    }

    getAllProviders(): Observable<any> {
        return this.allProviders.asObservable();
    }

    getServiceProvider() {
        return this.serviceProvider.value;
    }

    /*Active wizard Services start here*/
    pushactivewizard(type: number) {
        this.activewizard.next(type);
    }
    /*End here*/
    exportData(data, fileName) {
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: false,
            useBom: false,
            headers: Object.keys(data[0])
        };
        return new Angular2Csv(data, fileName, options);
    }

    exportNgxData(data, columns, filename = 'CSV-File') {
        const data2download = [];
        data.forEach(obj => {
            const resObj = {};
            columns.forEach(element => {
                // Handle case for escaping ACTION column from tables
                if (element.name && element.name.toLowerCase() !== 'action') {
                    // Handle case for exporting only visible columns
                    if (element.visible) {
                        let property = obj[element.prop];
                        if (element.type === 'date') {
                            property = this._dataFormatter.transform(property, element.format);
                        } else if (element.type === 'percentage') {
                            property = this._dataFormatter.percentageFormate(property, element.format);
                        } else if (element.type === 'currency') {
                            property = this._dataFormatter.currencyFormate(property, element.format);
                        } else if (element.type === 'decimal') {
                            property = this._dataFormatter.decimalFormate(property, element.format);
                        } else if (element.type === 'NA') {
                            property = property ? property : 'x';
                        }
                        resObj[element.name] = (property == null || property === undefined) ? '' : property;
                    }
                }
            });
            data2download.push(resObj);
        });

        if (data2download.length > 0) {
            const options = {
                fieldSeparator: ',',
                quoteStrings: '"',
                decimalseparator: '.',
                showLabels: true,
                showTitle: false,
                useBom: true,
                headers: Object.keys(data2download[0])
            };
            return new Angular2Csv(data2download, this.createFileName(filename), options);
        }

    }

    createFileName(exportFileName: string): string {
        const date = new Date();
        return (exportFileName + date.toLocaleDateString() + '_' + date.toLocaleTimeString());
    }

    paramspushactivewizard(params: any) {
        const activeparams = params.toLowerCase();
        let activeId: any;
        switch (activeparams) {
            case 'invited':
                activeId = 4;
                break;
            case 'declined':
                activeId = 5;
                break;
            case 'accepted':
                activeId = 6;
                break;
            case 'assigned':
                activeId = 7;
                break;
            case 'started':
                activeId = 8;
                break;
            case 'pending-approval':
                activeId = 9;
                break;
            case 'invoiced':
                activeId = 10;
                break;
            case 'paid':
                activeId = 11;
                break;
            case 'closed':
                activeId = 12;
                break;
            case 'cancelled':
                activeId = 13;
                break;
        }

        if (activeId) {
            this.pushactivewizard(activeId);
        }
    }

    // Method retrieve distance by using google map
    getDistance(source, destination): Observable<any> {
        const postUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' +
            source + '&destinations=' + destination + '&key=' + environment.googleMapKey;
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', environment.googleMapKey);
        this._requestOptions = new HttpRequest('OPTIONS', postUrl, { headers: headers });
        return this.http.get(postUrl, this._requestOptions)
    }

    getIsProgramLoad(): Observable<boolean> {
        return this.isLoadProgram.asObservable();
    }
    setIsProgramLoad(accountLoad: boolean) {
        this.isLoadProgram.next(accountLoad);
    }
}
