import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

import { MessageService } from '../../../services/message.service';
import { PreloaderService } from '../../../services/preloader.service';
import { AppStateService } from '../../../services/app-state.service';

import { CommentApi } from '../../../sdk';
import { MessageTypes } from '../../../models/static-list-data.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css'],
    providers: [VirtualScrollModule]
})

export class MessageListComponent implements OnInit {

    @Input() modelName: string;
    @Input() modelId: string;
    comments: any[] = [];
    imgpath: any;
    userAccessType: string;
    messageTypes = MessageTypes;
    errorMessage = '';

    constructor(
        private _cd: ChangeDetectorRef,
        private _messageService: MessageService,
        private _appState: AppStateService,
        private _preloaderService: PreloaderService,
        private _commentApi: CommentApi,
        private _sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        if (this.modelName && this.modelId) {
            this.userAccessType = this._appState.getAccessType();
            this.imgpath = environment.baseUrl + '/' + environment.apiVersion;
            this._messageService.currentMessage.subscribe(message => {
                this.fetchComments(this.modelName, this.modelId);
            })
        } else {
            this.errorMessage = 'Internal Server Error';
        }
    }

    fetchComments(model, id) {
        if (model && id) {
            this.errorMessage = '';
            this._preloaderService.showPreloader();
            // have to check condition for private message only
            const conditions = {
                modelName: model,
                modelId: id
            };
            this._commentApi.find({
                'where': conditions,
                'fields': ['Case_Comment_Body__c', 'postedByType', 'postByName', 'ownerId', 'createdAt', 'messageType'],
                'include': [
                    {
                        'relation': 'owner',
                        'scope': {
                            // These fileds are checked in backed userAccess code.
                            'fields': ['id', 'firstname', 'lastname', 'profileImage', 'url', 'accessType'],
                            'isMessage': 'true'
                        }
                    }
                ]
            }).subscribe(
                results => {
                    this.comments = results;
                    let messageTypeArray = [];
                    this.messageTypes.forEach(type => {
                        messageTypeArray[type.value] = type.label;
                    });
                    this.comments.forEach(comment => {
                        if (comment.messageType) {
                            let messageType = comment.messageType;
                            messageType = messageTypeArray[comment.messageType] ?
                                messageTypeArray[comment.messageType] : comment.messageType;
                            comment.messageTypeLabel = messageType;
                            comment.Case_Comment_Body__c = this._sanitizer.bypassSecurityTrustHtml(comment.Case_Comment_Body__c);
                        }
                    });
                    if (!this._cd['destroyed']) {
                        this._cd.detectChanges();
                    }
                    this._preloaderService.hidePreloader();
                },
                err => {
                    this.errorMessage = err.message;
                    this._preloaderService.hidePreloader();
                }
            );
        }
    }
}
