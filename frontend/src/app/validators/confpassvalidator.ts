import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function confPassValidator(string : String) : ValidatorFn{ 

    return (control : AbstractControl) : ValidationErrors | null => {
            
        if (control.value === string) {
            return null;
        }

        return {confPassInvalid : {value : control.value}}

    }

}