import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoserviceService {

  constructor(private http : HttpClient) { }

  postProduto(nome : String,descricao : String,preco : Number,img : File,categorias : Number[]): Observable<any>{
     
    var formProduto = new FormData();

    formProduto.append('nome',nome.toString());
    formProduto.append('descricao',descricao.toString())
    formProduto.append('preco',preco.toString())
    
    categorias.forEach((categoria,index) => {
      formProduto.append(`categorias[${index}]`,categoria.toString())
    })

    formProduto.append('img',img);

    console.log(formProduto)

    return this.http.post<any>('http://localhost:8080/produto/post',formProduto)
  }

}
