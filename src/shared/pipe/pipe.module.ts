import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './forFilter/filter.pipe';
import { FilesizePipe } from './filesize/filesize.pipe';
import { FileiconPipe } from './fileicon/fileicon.pipe';
import { CountCarPipe } from './countChar/count.char.pipe';
import { UniquePipe } from './unique/unique.pipe';
import { CommaPipe } from './comma/comma.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FilterPipe, FilesizePipe, FileiconPipe, CountCarPipe, UniquePipe, CommaPipe],
  exports: [FilterPipe, FilesizePipe, FileiconPipe, CountCarPipe, UniquePipe, CommaPipe]
})
export class PipeModule { }
