import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Token } from '@angular/compiler';
import { Observable } from 'rxjs';
import { Resposta } from '../component/menu-superior/resposta';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class LoginCadastroService {

  constructor(private http : HttpClient) { 

  }

  sendLogin(email : String,senha : String) : Observable<any> {

    const httpOptions = {headers:new HttpHeaders({'Content-Type': 'application/json'}),responseType:'text' as 'json'}

      return this.http.post<any>("https://test.testandofreezenapp.rf.gd/usuario/login",{'email' : email,'password' : senha},httpOptions)
  }

  sendCadastro(email : String,nome : String,cpf : String,telefone :String,password : String,nascimento : String) : Observable<String>{

    const httpOptions = {headers:new HttpHeaders({'Content-Type': 'application/json'}),responseType:'text' as 'json'}
  
    return this.http.post<String>('https://test.testandofreezenapp.rf.gd/usuario/cadastro',{'email' : email, 'nome' : nome, 'cpf' : cpf,'telefone' : telefone,'password' : password,'nascimento' : nascimento},httpOptions)
    
  }

}
