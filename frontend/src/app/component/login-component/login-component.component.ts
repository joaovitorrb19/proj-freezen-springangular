import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginCadastroService } from 'src/app/http/login-cadastro.service';
import { LoginlogoutsubjectService } from 'src/app/subject/loginlogoutsubject.service';
import { PasswordValidator } from 'src/app/validators/passwordvalidator';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit{

  constructor(private loginHTTP : LoginCadastroService,private loginLogoutSubject : LoginlogoutsubjectService,private router : Router){

  }

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

  sendLogin(){
      var token : string
      this.loginHTTP.sendLogin(this.formLogin.get('email')?.value!,this.formLogin.get('password')?.value!)
      .subscribe((response) => {
          this.loginLogoutSubject.atualizarValor(true);
          localStorage.setItem('Authorization',response)
          this.router.navigate(['/']);
      },(error) => {
        
      })
  }

}
