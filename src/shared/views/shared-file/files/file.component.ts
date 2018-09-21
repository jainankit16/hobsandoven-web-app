import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentShareApi } from '../../../sdk';

@Component({
    selector: 'app-shared-file',
    templateUrl: './file.component.html',
})
export class FileComponent implements OnInit {
    sharedDocID: any;
    sharedDocEmail: any;
    sharedDocInstance: any;

    constructor(
        private _route: ActivatedRoute,
        private _documentShareApi: DocumentShareApi
    ) {
        this.sharedDocID = _route.snapshot.params['id'];
        this.sharedDocEmail = _route.snapshot.params['email'];
    }

    ngOnInit() {
        if (this.sharedDocID) {
            this.getDocDetails()
        }
    }

    getDocDetails() {
        console.log('id>>', this.sharedDocID);
        console.log('email>>', this.sharedDocEmail);
        this._documentShareApi.findOne({
            where: {
                id: this.sharedDocID
            }
            // fields: ['Default_Pricelist__c']
        }).subscribe(
            x => {
                console.log(x)
                this.sharedDocInstance = x;
                if (this.sharedDocInstance.contentType === 'Query') {
                    this.handleFolderShareCase();
                } else {
                    this.handleFileShareCase();
                }
            },
            err => {
                console.log(err);
            }
        );
    }

    checkIfExternalUser() {
        const exUsers = this.sharedDocInstance.externalUsers.filter(usr => usr.email === this.sharedDocEmail)
        const users = this.sharedDocInstance.users.filter(usr => usr.email === this.sharedDocEmail)
        console.log(exUsers)
        console.log(users)
        if (exUsers.length) {
            return true;
        }
        return false;
    }

    handleFolderShareCase() {
        this.checkIfExternalUser();

    }

    handleFileShareCase() {
        this.checkIfExternalUser();
    }

}
