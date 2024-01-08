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
      return this.http.post<any>('https://test.testandofreezenapp.rf.gd/categoria/post',{'nome': nome,'descricao':descricao})
  }

  getAllCategorias():Observable<CategoriaDTO[]>{
    return this.http.get<CategoriaDTO[]>('https://test.testandofreezenapp.rf.gd/categoria/get')
  }

  updateCategoria(id : Number,nome:String,descricao:String) : Observable<any>{
    return this.http.put<any>('https://test.testandofreezenapp.rf.gd/categoria/update',{'id':id,'nome':nome,'descricao':descricao})
  }

  deleteCategorria(id :Number):Observable<any>{
    return this.http.delete<any>('https://test.testandofreezenapp.rf.gd/categoria/delete/'+id)
  }

}
