import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_VALIDATORS } from '@angular/forms';

import { NoWhiteSpaceValidator } from './no-white-space.validator';

/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NoWhiteSpaceDirective
 * @implements {Validator}
 */

 @Directive({
    selector: '[noWhiteSpace]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NoWhiteSpaceDirective, multi: true }]
})

export class NoWhiteSpaceDirective implements Validator {

    private valFn = NoWhiteSpaceValidator();
    validate(control: AbstractControl): { [key: string]: any } {
        return this.valFn(control);
    }
}
