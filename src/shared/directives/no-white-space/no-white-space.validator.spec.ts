import { AbstractControl } from '@angular/forms';
import { NoWhiteSpaceValidator } from './no-white-space.validator';

describe('Whitespace Validator', () => {

    let validatorFn = NoWhiteSpaceValidator();

    it('empty string is invalid', () => {
        let control = { value: '' }
        let result = validatorFn(control as AbstractControl)
        expect(result !== null).toBe(true);
        expect(result['whitespace']).toBe('value is only whitespace')
    });

    it('spaces only are invalid', () => {
        let control = { value: '    ' }
        let result = validatorFn(control as AbstractControl)
        expect(result !== null).toBe(true);
    });

    it('null is invalid', () => {
        let control: any = { value: null }
        let result = validatorFn(control as AbstractControl)
        expect(result !== null).toBe(true);
    });

    it('text is not considered invalid', () => {
        let control = { value: 'i have whitespace on the inside' }
        let result = validatorFn(control as AbstractControl)
        expect(result).toBe(null);
    });

});
