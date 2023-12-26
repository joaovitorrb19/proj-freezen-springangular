
import { Component, HostListener, OnInit } from '@angular/core';
import { LoginlogoutsubjectService } from 'src/app/subject/loginlogoutsubject.service';
import { Resposta } from './resposta';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit{

    taLogado = false; 
    resposta : Resposta[] = []

    constructor(private loginLogoutService : LoginlogoutsubjectService,private jwtHelper : JwtHelperService){
      
    }

  ngOnInit(): void {
    
  }

    isLogado = this.loginLogoutService.logado.subscribe((novovalor) => (this.taLogado = novovalor) )
    
    deslogar(){
      localStorage.removeItem('Authorization')
      this.loginLogoutService.atualizarValor(false)
    }

    getNome(){
      const token = localStorage.getItem('Authorization')
      var teste = this.jwtHelper.decodeToken();
      return teste.sub;
    }

    @HostListener('window:resize')
    widhtMaiorQue768(){
      const tamanhoWidth = window.innerWidth ;
      return tamanhoWidth > 768;
    }

}
