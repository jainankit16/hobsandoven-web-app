import { Injectable } from '@angular/core';
import { BehaviorSubject ,  Observable } from 'rxjs';

@Injectable()
export class MessageService {
    message = {};
    private messageSource = new BehaviorSubject('default message');
    currentMessage = this.messageSource.asObservable();

    constructor() { }
    changeMessage(message) {
        this.messageSource.next(message)
    }
}
