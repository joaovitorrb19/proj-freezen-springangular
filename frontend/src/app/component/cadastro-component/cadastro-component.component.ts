import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormControl ,FormGroup, Validators} from '@angular/forms';
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

  constructor(private loginCadastro : LoginCadastroService,private router : Router){

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

    this.loginCadastro.sendCadastro(this.formCadastro.get('email')?.value!,this.formCadastro.get('nome')?.value!,this.formCadastro.get('cpf')?.value!,
    this.formCadastro.get('telefone')?.value!,this.formCadastro.get('password')?.value!,this.formCadastro.get('nascimento')?.value!).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },(error) => {

      }
    )


  }

}
