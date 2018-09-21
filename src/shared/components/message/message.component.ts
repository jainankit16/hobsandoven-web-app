import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

import { AlertService } from '../../services/alert.service';

import { Users, JobCommentApi, UsersApi, CommentApi } from '../../sdk';

import {
    MessageTypes
} from '../../../shared/models/static-list-data.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    providers: [VirtualScrollModule]
})
export class MessagesComponent implements OnInit {
    @Input() modelName: string;
    @Input() modelId: string;
    jobComments: any;
    user: Users;
    sub: any;
    sfdcId: any;
    messageForm: FormGroup;
    MessageTypes = MessageTypes;

    constructor(private route: ActivatedRoute,
                private fb: FormBuilder,
                private commentApi: CommentApi,
                private userApi: UsersApi,
                private alertService: AlertService) {
    }

    ngOnInit() {
        // this.userApi.getCurrent().subscribe((result) => {
        //     this.user = result;
        // });
        //
        //
        //
        // this.commentApi.getByJob(this.modelId).subscribe(comment => {
        //     this.jobComments = comment;
        // });
        //
        // this.formMessage();
    }

    // formMessage() {
    //     this.messageForm = this.fb.group({
    //         newMessage: ['', [Validators.required]]
    //     });
    // }
    //
    // sendMessage(message) {
    //     let messageData = {
    //         Service_Dispatch__c: this.sfdcId,
    //         Comment__c: message
    //     };
    //     this.jobCommentApi.create(messageData).subscribe(
    //         res => {
    //             this.jobComments.push(res); // to list resently added message.
    //             this.alertService.success('Message has been saved successfully.');
    //         },
    //         err => {
    //             this.alertService.error(err.message);
    //         }
    //     );
    //
    // }
}
