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

  constructor(private loginHTTP : LoginCadastroService,private loginLogoutSubject : LoginlogoutsubjectService,private router : Router,private snack : MatSnackBar){

  }

  ngOnInit(){
    this.formLogin.reset
  }

  formLogin = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,PasswordValidator()])
  })

  validarPassword(){
    // this.formLogin.get('password')?.setValidators(PasswordValidator);
    this.formLogin.get('password')?.updateValueAndValidity();
  }

  inputTypePass : String = 'password';

  alterarHiddenPassword(){

    if(this.inputTypePass.toString() == 'text'){
      this.inputTypePass = 'password';
    } else {
      this.inputTypePass = 'text';
    }
  }


  getErrorDirty(nomeForm : string ,erroForm : string){
    return this.formLogin.get(nomeForm)?.getError(erroForm) && this.formLogin.get(nomeForm)?.dirty
  }

  getErrorTouched(nomeForm : string ,erroForm : string){
    return this.formLogin.get(nomeForm)?.getError(erroForm) && this.formLogin.get(nomeForm)?.touched
  }

  sendLogin(){

    if(!this.formLogin.valid){
        var resposta = '';

        var email = this.formLogin.get('email');
        var password = this.formLogin.get('password');

        if(email?.getError('required'))
              resposta += "Email requirido" + "\n" + ' ';

        if(email?.getError('email'))
            resposta += "Email invalido" + "\n" + ' ';
        
        if(password?.getError('required'))
              resposta += "Senha requirida" + "\n" + ' ';

        if(password?.getError('PasswordErro'))
              resposta +=  "Min 1 caractere especial, 1 maisculo e 1 minusculo, de 8 a 15 caracteres" + "\n" + ' ';

        this.snack.open(resposta,"X",{verticalPosition:'top',horizontalPosition:'center',duration:5000,panelClass: ['error-snackbar'] })

    } else {
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

}
