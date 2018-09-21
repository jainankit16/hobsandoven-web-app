import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarRoutingModule } from './calendar.routing';
import {CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule
  ],
  declarations: [CalendarComponent]
})
export class CalendarModule { }
