import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
export class DataFormatter implements PipeTransform {
  private locale_ID: any;
  private formatStr: any;
  private datePipe: DatePipe;
  private decimalPipe: DecimalPipe;
  private returnFormate: any;
  constructor() {
    this.locale_ID = 'en-US';
  }
  transform(value: string, format?: string) {
    this.formatStr = format ? format : 'shortDate';
    this.datePipe = new DatePipe(this.locale_ID);
    this.returnFormate = value
      ? this.datePipe.transform(value, this.formatStr)
      : value;
    return this.returnFormate;
  }
  decimalFormate(value: any, format: any) {
    this.formatStr = format ? format : '1.2-2';
    this.decimalPipe = new DecimalPipe(this.locale_ID);
    this.returnFormate = value
      ? this.decimalPipe.transform(value, this.formatStr)
      : value;
    return this.returnFormate;
  }
  currencyFormate(value: any, format: any) {
    this.formatStr = format ? format : '$';
    this.returnFormate = value ? this.formatStr + value : '';
    return this.returnFormate;
  }
  percentageFormate(value: any, format: any) {
    this.formatStr = format ? format : '%';
    this.returnFormate = value ? value + this.formatStr : '';
    return this.returnFormate;
  }
}
