import { Component, OnInit } from '@angular/core';
import { LoginCadastroService } from './http/login-cadastro.service';
import { LoginlogoutsubjectService } from './subject/loginlogoutsubject.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'frontend';

  constructor(private loginService : LoginlogoutsubjectService,private jwtAuth : JwtHelperService){

  }

  ngOnInit(): void {
      const token = localStorage.getItem('Authorization')

    token !== null && !this.jwtAuth.isTokenExpired(token) ? this.loginService.atualizarValor(true) : this.loginService.atualizarValor(false);             

  }

  
  
}
