import { AlertService } from './../../../services/alert.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MessageTypes } from '../../../models/static-list-data.service';
import { MessageService } from '../../../services/message.service';
import { AppStateService } from '../../../services/app-state.service';
import { PreloaderService } from '../../../services/preloader.service';

import { CommentApi, UsersApi } from '../../../sdk/services/custom';

import Quill from 'quill';
import { ImageDrop } from 'quill-image-drop-module';
Quill.register('modules/imageDrop', ImageDrop);

@Component({
    selector: 'app-message-post',
    templateUrl: './message-post.component.html',
    styleUrls: ['./message-post.component.css']
})

export class MessagePostComponent implements OnInit {

    // Name of the model to which message will be associated
    @Input() modelName: string;
    @Input() modelId: string;
    // Pre-define the message type from MessageTypes list defined in static-list-data service
    @Input() messageType = '';
    @Input() enableEditor = false;
    @Input() showPrivateOption = true;
    @Input() showEditorOption = true;
    @Input() showMessageTypes = true;
    @Output() added: EventEmitter<any> = new EventEmitter();

    contentText = '';
    messageTypes = MessageTypes;
    Is_Public__c = false;
    Is_Public_Job__c = false;
    errorFlag = false;
    errorMessFlag = true;
    editorModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],                                         // remove formatting button
            ['link', 'image', 'video']                         // link and image, video
        ],
        imageDrop: true
    };

    constructor(
        private _messageService: MessageService,
        private _appState: AppStateService,
        private _commentApi: CommentApi,
        private _usersApi: UsersApi,
        private _alertService: AlertService,
        private _preloader: PreloaderService
    ) { }

    ngOnInit() {
        const userAccessType = this._appState.getAccessType();
        if (userAccessType && userAccessType !== 'internal') {
            this.showPrivateOption = false;
        }
    }

    onChangeMessageType() {
        this.errorFlag = this.messageType ? false : true;
    }

    send() {
        if (this.messageType === '') {
            this.errorFlag = true;
        }
        if (!this.errorMessFlag && this.contentText.length && !this.errorFlag) {
            const token = this._usersApi.getCurrentToken();
            this._preloader.showPreloader();
            this._commentApi.create({
                modelName: this.modelName,
                modelId: this.modelId,
                messageType: this.messageType,
                Is_Public_Job__c: this.Is_Public_Job__c,
                Is_Public__c: this.Is_Public__c,
                postByName: token.user.username,
                ownerId: token.user.AccountId,
                Case_Comment_Body__c: this.contentText
            }).subscribe(
                result => {
                    if (result) {
                        this.added.emit(result);
                        this.contentText = '';
                        const currentMeassage = {
                            Case_Comment_Body__c: result.Case_Comment_Body__c,
                            createdAt: new Date(),
                            ownerId: result.ownerId,
                            postByName: result.postByName
                        }
                        this._messageService.changeMessage(currentMeassage);
                        scrollTo(0, 200);
                        (this.showMessageTypes === true) ? '' : this._alertService.success('Message sent successfully.');
                    }
                    this._preloader.hidePreloader();
                }, err => {
                    if (err.statusCode === '413') {
                        err.message = 'Message size too large!';
                    }
                    this._alertService.error(err.message);
                    window.scrollTo(0, 0);
                    this._preloader.hidePreloader();
                    console.log(err);
                }
            );
        }
    }

    textChange(e, src) {
        let textLen;
        if (src === 'textarea') {
            textLen = e;
            textLen = textLen.trim();
            if (!textLen.length) {
                this.enableEditor = false;
                this.errorMessFlag = true;
            } else {
                this.errorMessFlag = false;
            }
        } else {
            this.errorMessFlag = true;
            const val = e && e.content && e.content.ops;
            val.forEach(item => {
                if (item['insert']) {
                    if (typeof item['insert'] === 'object' && Array.isArray(item['insert']) === false) {
                        this.errorMessFlag = false;
                    } else {
                        textLen = item['insert'];
                        textLen = textLen.trim();
                        if (textLen.length) {
                            this.errorMessFlag = false;
                        }
                    }
                }
            });
        }
    }
}
