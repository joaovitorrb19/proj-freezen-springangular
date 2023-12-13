import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function NomeValidator () : ValidatorFn {
    
    return (control : AbstractControl) : ValidationErrors | null => {
            const regex = RegExp(/^[a-zA-Z]{3,}\s[a-zA-Z]{3,}$/)


            return regex.test(control.value) ? null : {NomeErro : {value : control.value}}
    } 

}