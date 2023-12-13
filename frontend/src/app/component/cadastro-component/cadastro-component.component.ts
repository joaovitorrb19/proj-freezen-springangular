import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormControl ,FormGroup, Validators} from '@angular/forms';
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

  ngOnInit(){
    this.formTest.reset
  }

  formTest = new FormGroup({
    email : new FormControl('',[Validators.email,Validators.required]),
    nome : new FormControl('',[Validators.required,NomeValidator()]),
    cpf : new FormControl('',[CPFValidator(),Validators.required]),
    telefone : new FormControl('',[Validators.required,TelefoneValidator()]),
    password : new FormControl('',[Validators.required,PasswordValidator()]),
    confPassword : new FormControl('',Validators.required)
  })

  inputTypePass : String = 'password';

  inputTypeConfPass : String = 'password';

  getErrorDirty(nomeForm : string ,erroForm : string){
    return this.formTest.get(nomeForm)?.getError(erroForm) && this.formTest.get(nomeForm)?.dirty
  }

  getErrorTouched(nomeForm : string ,erroForm : string){
    return this.formTest.get(nomeForm)?.getError(erroForm) && this.formTest.get(nomeForm)?.touched
  }

  getError(nomeForm : string ,erroForm : string){
    return this.formTest.get(nomeForm)?.getError(erroForm)
  }
  

  verificarConfSenha(){
        this.formTest.get('confPassword')?.setValidators(confPassValidator(this.formTest.get('password')?.value!))
        this.formTest.get('confPassword')?.updateValueAndValidity();
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

  enviarFormulario(){
    this.formTest.reset()
  }

}
