import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'countChar',
    pure: false
})
export class CountCarPipe implements PipeTransform {

    transform(text: string, args: number) {
        let maxLength = args || 140
        let length = text.length;
        return (maxLength - length);
    }
}
