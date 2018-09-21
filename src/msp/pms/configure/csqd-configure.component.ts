import { Component, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../../../shared/services/pms/shared.services';

@Component({
    selector: 'home-content',
    templateUrl: './csqd-configure.component.html',
    styleUrls: ['./csqd-configure.component.css']
})

export class CsqdConfigureComponent {
    isServiceSetup = false;
    calulatedWidthForScroll1: any;

    constructor(private _sharedService: SharedService, private cd: ChangeDetectorRef) {
        this._sharedService.activewizard$.subscribe(res => {
            this.isFirstStep(res)
        })
    }

    isFirstStep(step: number) {
        if (step === 1) {
            this.isServiceSetup = true;
        } else {
            this.isServiceSetup = false;
        }
    }

    onWindowsScrollTop1() {
        document.querySelector(
            '.table-wrapper-bottom-Account'
        ).scrollLeft = document.querySelector('.table-wrapper-top-Account').scrollLeft;
    }
    onWindowsScrollBottom1() {
        document.querySelector('.table-wrapper-top-Account'
    ).scrollLeft = document.querySelector('.table-wrapper-bottom-Account').scrollLeft;
    }

    scrollWidth(width) {
        this.calulatedWidthForScroll1 = 0 + 'px';
        if (width) {
            this.calulatedWidthForScroll1 = width + 'px';
        }
        this.detectChanges();
    }

    detectChanges() {
        if (!this.cd['destroyed']) {
            this.cd.detectChanges();
        }
    }

}
