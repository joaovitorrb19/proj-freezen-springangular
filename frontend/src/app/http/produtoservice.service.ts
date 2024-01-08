import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { ProdutoCarrinhoDTO } from '../dto/produto-carrinho-dto';
import { ProdutoFinalizarCarrinho } from '../dto/produtofinalizarcarrinho';

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

    return this.http.post<any>('https://test.testandofreezenapp.rf.gd/produto/post',formProduto)
  }

  updateProduto(id:number,nome : String,descricao : String,preco : number,img : File):Observable<any>{
       var formUpdate = new FormData();
       formUpdate.append('nome',nome.toString());
       formUpdate.append('descricao',descricao.toString());
       formUpdate.append('img',img);
       formUpdate.append('preco',preco.toString());  
        return this.http.put('https://test.testandofreezenapp.rf.gd/produto/update/'+id,formUpdate);
  }

  getAllProdutos():Observable<any>{
    return this.http.get('https://test.testandofreezenapp.rf.gd/produto/get')
  }

  finalizarPedido(teste : ProdutoCarrinhoDTO []): Observable<any>{
    
    const httpOptions = {responseType:'text' as 'json'};
    var teste2 = new FormData();
    
    var contagem = 0;
    teste.forEach(x => {
      teste2.append(contagem.toString(),x.quantidade + "-" + x.produto.idPrecoStripe)
      contagem++;
    })

    console.log(teste2);

    return this.http.post<any>('http://ec2-18-189-192-130.us-east-2.compute.amazonaws.com:80/produto/finalizarpedido',teste2,httpOptions);
  }

}
