import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './../../services/alert.service';
import { PreloaderService } from './../../services/preloader.service';
import { SharedFileComponent } from './shared-file.component';
import { FileComponent } from './files/file.component';
import { SharedFileRoutingModule} from './shared-file.routing'


@NgModule({
    imports: [
        CommonModule,
        SharedFileRoutingModule
    ],
    declarations: [
        SharedFileComponent,
        FileComponent
    ],
    providers: [
        AlertService,
        PreloaderService
    ],
    schemas: []
})
export class SharedFileModule { }
