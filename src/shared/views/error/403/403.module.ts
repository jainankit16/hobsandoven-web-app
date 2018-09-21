import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../components/shared.module';
import { PreloaderComponent } from '../../../components/preloader/preloader.component';
import { PagesError403Component } from './pages-error-403/pages-error-403.component';
import { PreloaderService } from '../../../services/preloader.service';
@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        PagesError403Component
    ],
    exports: [
        CommonModule
    ],
    providers: [
        PreloaderService
    ]
})
export class Error403Module {

}
