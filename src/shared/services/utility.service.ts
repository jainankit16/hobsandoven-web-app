
import { Injectable } from '@angular/core';
import { Angular2Csv } from '../libs/angular2-csv';
import { ContainerApi } from '../sdk/services/custom/Container';
import { environment } from '../../environments/environment';
import { DatePipe} from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class UtilityService {
    datePipe: DatePipe;
    constructor(
        private _containerApi: ContainerApi,
        private _http: HttpClient
    ) { }
    /**
     * @Important : The below method will be removed in next sprint
     * Use exportData() of shared service to download/export feature.
     * @param csvData
     * @param fileName
     */
    csvExport(csvData, fileName) {
        const headers = Object.keys(csvData[0]);
        const options = {
            showLabels: true,
            showTitle: false,
            useBom: true,
            headers: headers
        };
        return new Angular2Csv(csvData, fileName, options);
    }
    downloadFile(filePath) {
        try {
            window.open(environment.baseUrl + '/' + environment.apiVersion + '/Containers/' + filePath);
        } catch (error) {
            console.log(error);
        }
    }
    deleteFile(fileName) {
        try {
            this._containerApi.removeFile('tmp', fileName).subscribe(success => {
            }, error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    downloadAndOpenPdfFile(filePath, fileName) {
        return this._http.get(filePath, {
            responseType: 'blob'
        }).map(res => {
            return {
                filename: fileName ? fileName : 'ServiceO.pdf',
                data: res
            };
        }).subscribe(res => {
            const url = window.URL.createObjectURL(res.data);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = res.filename;
            a.click();
            a.remove();
            // window.open(url);
            window.URL.revokeObjectURL(url);
        }, error => {
            console.log('download error:', error.message);
        }, () => {
            // console.log('Completed file download.')
        });
    }

    /**
     * 
     * @param a  | data
     * @param b  | filter obj
     * @param c  | key
     */
    dataTableSearch(a, b, c) {
        let i = a[c];
        let result;
        switch (typeof i) {
            case 'string':
                result = i ? i.toLowerCase().indexOf(b[c].toLowerCase()) === -1 : true;
                break;
            case 'number':
                result = i >= 0 ? (i !== parseFloat(b[c])) : true;
                break;
            case 'boolean':
                result = i == null && i === undefined ? true : i !== (b[c] === 'true');
                break;
            default:
                result = true;
        }
        return result;
    }
    /**
     * 
     * @param value 
     * @param dateformate 
     */
    dateFormate(value: string, dateformate = 'short') {
        this.datePipe = new DatePipe('en-US');
        const formateddate = (value ? this.datePipe.transform(value, dateformate) : value);
        return formateddate;
    }
}
