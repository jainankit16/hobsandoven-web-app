import { NgModule } from '@angular/core';
import { NgxResizeWatcherDirective } from '../directives/ngx-datatable/ngx-resize-watcher.directive';
import { ReadMoreDirective } from '../directives/showMore/read-more.directive';

@NgModule({
    declarations: [
        NgxResizeWatcherDirective,
        ReadMoreDirective
    ],
    exports: [
        NgxResizeWatcherDirective,
        ReadMoreDirective
    ]
})

export class DirectivesModule { }
