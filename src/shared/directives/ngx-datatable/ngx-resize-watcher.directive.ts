import { Directive, AfterContentChecked, ChangeDetectorRef, HostListener, NgZone } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Directive({ selector: '[ngx-resize-watcher]' })
export class NgxResizeWatcherDirective implements AfterContentChecked {
    private latestWidth: number;
    constructor(private table: DatatableComponent, public ref: ChangeDetectorRef, private ngZone: NgZone) {
    }
    // @HostListener('window:resize', ['$event'])
    // onResize(event) {
    //     //ngZone.run will help to run change detection
    //     this.ngZone.run(() => {
    //         console.log('Width: ' + window.innerWidth);
    //         console.log('Height: ' + window.innerHeight);
    //         if (this.table && this.table.element.clientWidth !== this.latestWidth) {
    //             this.latestWidth = this.table.element.clientWidth;
    //             this.table.recalculate();
    //         }
    //     });
    // }
    ngAfterContentChecked() {
        if (this.table && this.table.element.clientWidth !== this.latestWidth) {
            this.latestWidth = this.table.element.clientWidth;
            this.table.recalculate();
        }
    }
}
