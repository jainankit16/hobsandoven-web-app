import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable ,  Subject } from 'rxjs';
@Injectable()
export class ConfirmDialogService {
    private subject = new Subject<any>();
    constructor() {}
    /**
     * @param message
     * @param okFn
     * @param noFn 
     * Option Parameters: 
     *  type: Set message type Alert or confirm. Default is Confirm.
        title: Title of Message.
        text: Message Text.
        titleIcon: Icon before title.
        cbtnTitle: Cancel Button Title.
        cbtnTitleClass: Class for Cancel button. Default is 'btn btn-danger'.
        obtnTitle: Ok Button title : 'OK'.
        obtnTitleClass: Class for OK Button. 'btn btn-primary'.
        isClosedIcon: Displaying close icon.
     */
    confirmThis(message: any, okFn: () => void, noFn: () => void) {
        this.setConfirmation(message, okFn, noFn);
    }
    setConfirmation(message: any, okFn: () => void, noFn: () => void) {
        const that = this;
        this.subject.next({
            type: (message.type) ? message.type : 'confirm',
            title: (message.title) ? message.title : '',
            text: (message.text) ? message.text : '',
            titleIcon: (message.titleIcon) ? message.titleIcon : '',
            cbtnTitle: (message.cbtnTitle) ? message.cbtnTitle : 'Cancel',
            cbtnTitleClass: (message.cbtnTitleClass) ? message.cbtnTitleClass : 'btn btn-danger',
            obtnTitle: (message.obtnTitle) ? message.obtnTitle : 'OK',
            obtnTitleClass: (message.obtnTitleClass) ? message.obtnTitleClass : 'btn btn-primary',
            isClosedIcon: (message.isClosed === false && message.isClosed !== 'undefined') ? false : true,
            okFn:
            function(){
                that.subject.next(); // this will close the modal
                okFn();
            },
            noFn: function(){
                that.subject.next();
                noFn();
            }
        });

    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
