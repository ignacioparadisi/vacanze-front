import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive } from '@angular/core';
import * as moment from 'moment';

@Directive({
    selector: '[appCustomValidator]',
})

export class CustomValidatorDirective {

    /**
     * @param control FormControl to evaluate.
     */
    static RegularNumbersPositive(control: AbstractControl): ValidationErrors {
        const number = /^(0|[1-9]\d*)$/;
        if (control.value && !number.test(control.value)) {
            return { invalidText: true };
        }
    }

    /**
     * Validate that the FormControl has this structure "+507 xxxx xxxx".
     * @param control FormControl to evaluate.
     */
    static dateValidator(control: AbstractControl): ValidationErrors {
        const date = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
        const _date = moment(control.value);
        if (control.value && (!date.test(control.value) || _date.isAfter(moment.now(), 'day'))) {
            return { invalidDate: true };
        }
    }

    /**
     * Validate that the FormControl has this structure "+507 xxxx xxxx".
     * @param control FormControl to evaluate.
     */
    static regularText(control: AbstractControl): ValidationErrors {
        const text = /((^[A-z\s\,\.]{2,50})$)/g;
        if (control.value && !text.test(control.value)) {
            return { invalidText: true };
        }
    }

}
