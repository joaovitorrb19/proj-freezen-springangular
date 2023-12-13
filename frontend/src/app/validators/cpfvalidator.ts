import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function CPFValidator () : ValidatorFn {

    return (control : AbstractControl) : ValidationErrors | null => {

        const regex = RegExp(/^(\d{3}.?\d{3}.?\d{3}-?\d{2})$/)

        return regex.test(control.value) ?  null : { CPFErro : { value : control.value} } ;

               
    }

}