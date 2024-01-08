import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordValidator() : ValidatorFn {
    
    return (control : AbstractControl) : ValidationErrors | null => {

            const regex = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,15}$/)
            return regex.test(control.value) ? null : {PasswordErro : {value:control.value}}
            
    }

}