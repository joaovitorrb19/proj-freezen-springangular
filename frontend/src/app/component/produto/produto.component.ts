import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaDTO } from 'src/app/dto/categoria-dto';
import { CategoriaserviceService } from 'src/app/http/categoriaservice.service';
import { ProdutoserviceService } from 'src/app/http/produtoservice.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit{
  constructor(private produtoHttp:ProdutoserviceService,private categoriaHttp : CategoriaserviceService){

  }

  ngOnInit(): void {

    this.categoriaHttp.getAllCategorias()
    .subscribe((sucess) => {
      this.categoriasCadastradas = sucess
    }, (error)=> {
      console.log("wii")
    })

  }

  formProduto = new FormGroup({
    nome : new FormControl('',[Validators.required]),
    preco : new FormControl(0,[Validators.required]),
    descricao : new FormControl('',[Validators.required])
  })

  categoriasCadastradas : CategoriaDTO [] = []
  idCategorias : Number [] = []

  
 
  postProduto(){

        this.produtoHttp.postProduto(
        this.formProduto.get('nome')?.value!,
        this.formProduto.get('descricao')?.value!,
        this.formProduto.get('preco')?.value!,
         this.imagem!,
        this.idCategorias).subscribe()
        
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
