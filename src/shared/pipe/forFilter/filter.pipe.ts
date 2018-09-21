import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, property: any, propertyValue: any): any {
    let f = [];
    if (!Array.isArray(value)) return value;
    if (propertyValue == 'All') return value;
    f = value.filter((n: any) => {
      if (!n[property]) return ;
       if (n[property] === propertyValue) {
          return f.push(n[property])
        } 
    })
    return f;
  }

}
