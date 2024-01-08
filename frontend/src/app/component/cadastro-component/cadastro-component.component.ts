import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormControl ,FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginCadastroService } from 'src/app/http/login-cadastro.service';
import { confPassValidator } from 'src/app/validators/confpassvalidator';
import { CPFValidator } from 'src/app/validators/cpfvalidator';
import { NomeValidator } from 'src/app/validators/nomevalidator';
import { PasswordValidator } from 'src/app/validators/passwordvalidator';
import { TelefoneValidator } from 'src/app/validators/telefonevalidator';

@Component({
  selector: 'app-cadastro-component',
  templateUrl: './cadastro-component.component.html',
  styleUrls: ['./cadastro-component.component.css']
})
export class CadastroComponentComponent implements OnInit{

  constructor(private loginCadastro : LoginCadastroService,private router : Router,private snack:MatSnackBar){

  }

  ngOnInit(){
    this.formCadastro.reset
  }

  formCadastro = new FormGroup({
    email : new FormControl('',[Validators.email,Validators.required]),
    nome : new FormControl('',[Validators.required,NomeValidator()]),
    cpf : new FormControl('',[CPFValidator(),Validators.required]),
    telefone : new FormControl('',[Validators.required,TelefoneValidator()]),
    password : new FormControl('',[Validators.required,PasswordValidator()]),
    confPassword : new FormControl('',Validators.required),
    nascimento : new FormControl('',Validators.required)
  })

  inputTypePass : String = 'password';

  inputTypeConfPass : String = 'password';

  getErrorDirty(nomeForm : string ,erroForm : string){
    return this.formCadastro.get(nomeForm)?.getError(erroForm) && this.formCadastro.get(nomeForm)?.dirty
  }

  getErrorTouched(nomeForm : string ,erroForm : string){
    return this.formCadastro.get(nomeForm)?.getError(erroForm) && this.formCadastro.get(nomeForm)?.touched
  }

  getError(nomeForm : string ,erroForm : string){
    return this.formCadastro.get(nomeForm)?.getError(erroForm)
  }
  

  verificarConfSenha(){
        this.formCadastro.get('confPassword')?.setValidators(confPassValidator(this.formCadastro.get('password')?.value!))
        this.formCadastro.get('confPassword')?.updateValueAndValidity();
        this.formCadastro.get('password')?.updateValueAndValidity();
  }


  alterarHiddenPassword(){

    if(this.inputTypePass.toString() == 'text'){
      this.inputTypePass = 'password';
    } else {
      this.inputTypePass = 'text';
    }
  }

  alterarHiddenConfPassword(){

    if(this.inputTypeConfPass.toString() == 'text'){
      this.inputTypeConfPass = 'password';
    } else {
      this.inputTypeConfPass = 'text';
    }
  }

  enviarFormularioCadastro(){


    if(!this.formCadastro.valid){

      var resposta = '';

      var email = this.formCadastro.get('email');
      var nome = this.formCadastro.get('nome');
      var cpf = this.formCadastro.get('cpf');
      var telefone = this.formCadastro.get('telefone');
      var password = this.formCadastro.get('password');
      var nascimento = this.formCadastro.get('nascimento');

      if(email?.getError('required'))
          resposta += "Email requerido" + "\n" + " ";
      if(email?.getError('email'))
          resposta += "Email inválido" + "\n" + " ";
          if(nome?.getError('required'))
          resposta += "Nome requerido" + "\n" + " ";
          if(nome?.getError('nomeErro'))
          resposta += "Necessário nome e sobrenome" + "\n" + " ";
          if(cpf?.getError('required'))
          resposta += "Cpf requerido" + "\n" + " ";
          if(cpf?.getError('CPFErro'))
          resposta += "CPF inválido" + "\n" + " ";
          if(telefone?.getError('required'))
          resposta += "Telefone requerido" + "\n" + " ";
          if(telefone?.getError('TelefoneErro'))
          resposta += "Telefone inválido" + "\n" + " ";
          if(password?.getError('required'))
          resposta += "Senha requerida" + "\n" + " ";
          if(password?.getError('PasswordErro'))
          resposta += "Senha inválida" + "\n" + " ";
          if(nascimento?.getError('required'))
          resposta += "Data requerida" + "\n" + " ";

          this.snack.open(resposta,"X",{horizontalPosition:'center',verticalPosition:'top',duration:5000,panelClass: ['error-snackbar']})

    } else {
      this.loginCadastro.sendCadastro(this.formCadastro.get('email')?.value!,this.formCadastro.get('nome')?.value!,this.formCadastro.get('cpf')?.value!,
      this.formCadastro.get('telefone')?.value!,this.formCadastro.get('password')?.value!,this.formCadastro.get('nascimento')?.value!).subscribe(
        (response) => {
          this.router.navigate(['/login']);
        },(error) => {
  
        }
      )
    }
  }

}
