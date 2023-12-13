import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/validators/passwordvalidator';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{

  ngOnInit(){
    this.formLogin.reset
  }

  formLogin = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,PasswordValidator()])
  })

  getErrorDirty(nomeForm : string ,erroForm : string){
    return this.formLogin.get(nomeForm)?.getError(erroForm) && this.formLogin.get(nomeForm)?.dirty
  }

  getErrorTouched(nomeForm : string ,erroForm : string){
    return this.formLogin.get(nomeForm)?.getError(erroForm) && this.formLogin.get(nomeForm)?.touched
  }

}
