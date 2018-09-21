import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { MessagesComponent } from './message.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessagePostComponent } from './message-post/message-post.component';

@NgModule({
    declarations: [
        MessagesComponent,
        MessageListComponent,
        MessagePostComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule
    ],
    exports: [
        MessagesComponent,
        MessageListComponent,
        MessagePostComponent
    ],
    schemas: []
})

export class MessageModule { }
