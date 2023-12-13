import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function TelefoneValidator() : ValidatorFn {

    return (control : AbstractControl) : ValidationErrors | null => {
            const regex = RegExp(/^(\(\d{2}\)?\s?|\d{2}(\-|\s))?\d{2,4}(\-|\s)?\d{4,5}$/)

            return regex.test(control.value) ? null : {TelefoneErro : {value:control.value} }

            
    } 

}