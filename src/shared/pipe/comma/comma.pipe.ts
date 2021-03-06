import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comma'
})
export class CommaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return (', ').concat(value)
    } else {
      return value;
    }
  }

}
