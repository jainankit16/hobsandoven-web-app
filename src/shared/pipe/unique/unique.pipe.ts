import { element } from 'protractor';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "unique",
  pure: false
})
export class UniquePipe implements PipeTransform {
  transform(value: any, level0?: any, level1?: any, level2?: any): any {
    let f = [];
    if (!Array.isArray(value)) return;
    f = value.filter((n: any) => {
      if (!n[level0]) return;
      if (level1 == null && level2 == null) {
        if (n[level0] === 0 || n[level0]) {
          return f.indexOf(n[level0]) === -1 && f.push(n[level0]);
        }
      } else if (level2 == null) {
        if (n[level0][level1] === 0 || n[level0][level1]) {
          return (
            f.indexOf(n[level0][level1]) === -1 && f.push(n[level0][level1])
          );
        }
      } else {
        if (n[level0][level1][level2] === 0 || n[level0][level1][level2]) {
          return (
            f.indexOf(n[level0][level1][level2]) === -1 &&
            f.push(n[level0][level1][level2])
          );
        }
      }
    });
    return f;
  }
}
