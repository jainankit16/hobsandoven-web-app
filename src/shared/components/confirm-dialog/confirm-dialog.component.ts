
import { Component, Input } from '@angular/core';
import { ConfirmDialogService } from '../../services/confirm-dialog.service';

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
    message: any;
    constructor(
        private _confirmDialogService: ConfirmDialogService
    ) {
        this.confirmDialog();
    }

    confirmDialog() {
        // this function waits for a message from alert service, it gets
        // triggered when we call this from any other component
        this._confirmDialogService.getMessage().subscribe(message => {
            this.message = message;
        });
    }
}
