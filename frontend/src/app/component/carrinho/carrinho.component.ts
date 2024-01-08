import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoCarrinhoDTO } from 'src/app/dto/produto-carrinho-dto';
import { ProdutoDTO } from 'src/app/dto/produtodto';
import { ProdutoFinalizarCarrinho } from 'src/app/dto/produtofinalizarcarrinho';
import { ProdutoserviceService } from 'src/app/http/produtoservice.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit{

  constructor(private http : ProdutoserviceService,private snack : MatSnackBar){

  }

  produtosParaExibir : ProdutoCarrinhoDTO [] = []

  ngOnInit(): void {
    this.produtosParaExibir = [];
    this.popularProdutosNoCarrinho();
  }

  finalizarPedido(){

    var produtos : ProdutoCarrinhoDTO [] = JSON.parse(localStorage.getItem('carrinho')!);
    
    console.log(produtos)

    this.http.finalizarPedido(produtos).subscribe((sucesso) => {
        
        window.open(sucesso,'_blank');
    }, (error) => {
      console.log(error)
        this.snack.open('Deu erro','X',{duration:3000})
    })
  }

  popularProdutosNoCarrinho(){

    var carrinhoExiste = localStorage.getItem('carrinho') != null ;

    var arrayCarrinho : ProdutoCarrinhoDTO[] = carrinhoExiste? JSON.parse(localStorage.getItem('carrinho')!) : [];

    if(arrayCarrinho.length == 0){
      this.produtosParaExibir = [];
        return;
    } else {
      this.produtosParaExibir = arrayCarrinho;
    }

  }

  excluirCarrinho(produto : ProdutoDTO){
      this.produtosParaExibir = this.produtosParaExibir.filter(x => x.produto.id != produto.id);
      localStorage.setItem('carrinho',JSON.stringify(this.produtosParaExibir));
  }

  calcularPrecoTotal(){
   var valorTotal : number = 0;
    this.produtosParaExibir.forEach(x => {
      valorTotal += x.quantidade * x.produto.preco;
    })
    return valorTotal;
  }
  
}
