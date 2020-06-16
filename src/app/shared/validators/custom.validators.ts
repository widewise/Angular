import { AbstractControl, ValidationErrors, ValidatorFn  } from '@angular/forms';

export class CustomValidators {

  static userNameValidator(minLength: number, maxLength: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
        const strValue = c.value as string;
        if (strValue !== undefined &&
            (strValue.length < minLength || strValue.length > maxLength)) {
            return {
                userNameLength: true
            };
        }
        return null;
    };
  }
}
