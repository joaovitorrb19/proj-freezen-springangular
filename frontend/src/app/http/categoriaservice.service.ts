import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoriaDTO } from '../dto/categoria-dto';

@Injectable({
  providedIn: 'root'
})

export class CategoriaserviceService implements OnInit{

  constructor(private http: HttpClient) 
  { 

  }

  ngOnInit(): void {
    
  }

  sendPostCategoria(nome : String,descricao : String) : Observable<any> {
      return this.http.post<any>('http://localhost:8080/categoria/post',{'nome': nome,'descricao':descricao})
  }

  getAllCategorias():Observable<CategoriaDTO[]>{
    return this.http.get<CategoriaDTO[]>('http://localhost:8080/categoria/get')
  }

}
