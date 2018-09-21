import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersApi, DocumentApi } from '../../sdk';
import { environment } from '../../../environments/environment';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html'
})

export class DownloadsComponent implements OnInit {
    download = 'Downloading..';
    constructor(private _route: ActivatedRoute,
        private _documentApi: DocumentApi,
        private _usersApi: UsersApi,
        private _utilityService: UtilityService) {
        if (this._route.snapshot.params['documentId']) {
            const docId = this._route.snapshot.params['documentId'];
            if (docId) {
                this.getDownload(docId)
            }
        }
    }

    ngOnInit() {

    }

    getDownload(docId) {
        if (docId) {
            this._documentApi.findById(docId).subscribe(row => {
                console.log('Download Triggered for File')
                const url = environment.baseUrl + '/' + environment.apiVersion +
                    '/Documents/download/' + row['id'] + '?access_token=' + this._usersApi.getCurrentToken().id
                this._utilityService.downloadAndOpenPdfFile(url, row['fileMeta']['name']);
                this.download = 'Download completed';
            })

        } else {
            console.log('Download Triggered for Folder')
        }
    }
}
