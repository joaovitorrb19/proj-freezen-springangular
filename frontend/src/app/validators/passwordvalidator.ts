import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordValidator() : ValidatorFn {
    
    return (control : AbstractControl) : ValidationErrors | null => {

            const regex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,8}$/)
            return regex.test(control.value) ? null : {PasswordErro : {value:control.value}}
            
    }

}