import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaDTO } from 'src/app/dto/categoria-dto';
import { ProdutoDTO } from 'src/app/dto/produtodto';
import { CategoriaserviceService } from 'src/app/http/categoriaservice.service';
import { ProdutoserviceService } from 'src/app/http/produtoservice.service';

@Component({
  selector: 'app-produtoadmin',
  templateUrl: './produtoadmin.component.html',
  styleUrls: ['./produtoadmin.component.css']
})
export class ProdutoadminComponent {
  constructor(private produtoHttp:ProdutoserviceService,private categoriaHttp : CategoriaserviceService){

  }

  ngOnInit(): void {

    this.categoriaHttp.getAllCategorias()
    .subscribe((sucess) => {
      this.categoriasCadastradas = sucess;
    }, (error)=> {
      console.log("wii")
    });

    this.getAll();

  }

  formProduto = new FormGroup({
    nome : new FormControl('',[Validators.required]),
    preco : new FormControl(0,[Validators.required]),
    descricao : new FormControl('',[Validators.required])
  })


  categoriasCadastradas : CategoriaDTO [] = []
  idCategorias : Number [] = []


  produtos : ProdutoDTO[] = []

  getAll(){
    this.produtoHttp.getAllProdutos().subscribe((resposta => {
      this.produtos = resposta;
      this.calcularPaginasDosProdutos();
    }), (error) => {

    })
    

  }
 
  valorMinPorPagina = 0;
  valorMaxPorPagina = 11;
  
  arrayQuantidadePaginas : number [] = [];

  calcularPaginasDosProdutos(){

    this.arrayQuantidadePaginas = []

    var quantidadePaginas = Math.ceil( this.produtos.length / 12);
  
    for(var i = 0; i < quantidadePaginas; i++){
        this.arrayQuantidadePaginas.push(i)
    }
    

  }

  mudarPagina(numero : Number){

    switch(numero){

      case 0:
        this.valorMinPorPagina = 0; this.valorMaxPorPagina = 11;
        break;

      case 1:
        this.valorMinPorPagina = 12; this.valorMaxPorPagina = 23;
        break;

        case 2:
          this.valorMinPorPagina = 14; this.valorMaxPorPagina = 25;
          break;
  
          case 3:
            this.valorMinPorPagina = 26; this.valorMaxPorPagina = 37;
            break;
    }

  }


  postProduto(){

        this.produtoHttp.postProduto(
        this.formProduto.get('nome')?.value!,
        this.formProduto.get('descricao')?.value!,
        this.formProduto.get('preco')?.value!,
         this.imagem!,
        this.idCategorias).subscribe()
        
  }

  idProdutoUpdate = 0;
  nomeProdutoUpdate = '';
  descricaoProdutoUpdate = '';
  precoProdutoUpdate = 0;
  imgProdutoUPdate : File | null = null;

  openUpdateModal(produto : ProdutoDTO){
    this.idProdutoUpdate = produto.id;
    this.nomeProdutoUpdate = produto.nome.toString();
    this.descricaoProdutoUpdate = produto.descricao.toString();
    this.precoProdutoUpdate = produto.preco;
    document.getElementById('modalUpdate')?.style.setProperty('display','block');
  }

    updateProdutoModal(){
        this.produtoHttp
        .updateProduto(this.idProdutoUpdate,this.nomeProdutoUpdate,this.descricaoProdutoUpdate,this.precoProdutoUpdate,this.imgProdutoUPdate!)
        .subscribe((sucesso) => {
          this.idProdutoUpdate = 0;
          this.nomeProdutoUpdate = '';
          this.descricaoProdutoUpdate = '';
          this.precoProdutoUpdate = 0;
          this.imgProdutoUPdate = null;
        })
    }

  popularImagemUpdate(event : any){
    this.imgProdutoUPdate = event.target.files[0];
  }

  imagem : File | null = null ;

  popularImagem(event : any){
    this.imagem = event.target.files[0]
  }

  adicionarCategoriaNoArray(id : Number){
    this.idCategorias.push(id)
  }

  openModalAddCategoria(){

  document.getElementById('modalAdicionar')?.style.setProperty('display','block')
  
}

}
