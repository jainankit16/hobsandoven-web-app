import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountTypeComponent } from './account-type.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { CommonService } from './../../services/common.service';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    FormsModule
  ],
  declarations: [AccountTypeComponent],
  exports: [AccountTypeComponent],
  providers: [CommonService]
})
export class AccountTypeModule { }
