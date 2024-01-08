import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs';
import { CategoriaDTO } from 'src/app/dto/categoria-dto';
import { CategoriaserviceService } from 'src/app/http/categoriaservice.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table'

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{

  constructor(private categoriaHttp : CategoriaserviceService){

  }

    formCategoria = new FormGroup({
      nome : new FormControl('',[Validators.required]),
      descricao : new FormControl('',[Validators.required])
    });

    formCategoriaUpdate : FormGroup = new FormGroup({
        id : new FormControl(0,[Validators.required]),
        nome : new FormControl('',[Validators.required]),
        descricao : new FormControl('',[Validators.required]),
    })

    categoriasCadastradas :  CategoriaDTO [] = [];

    numPaginas : number [] = []

    minNUm : number = 0
    maxNum : number = 9

  ngOnInit(): void {
    this.getCategorias();

    setTimeout(() => {
      this.calcularItensPagina()
    },5000)
  }

    postCategoria(){

      this.categoriaHttp.sendPostCategoria(this.formCategoria.get('nome')?.value!,this.formCategoria.get('descricao')?.value!)
      .subscribe((sucess) => {
          document.getElementById('modalAdicionarContainer')?.setAttribute("style","display:none")
          this.formCategoria.reset();
          setTimeout(() => {
            this.getCategorias()
            this.formCategoria.reset;
          },6000)
      }, (error) => {
        console.log("Deu erro")
      })
    }


    getCategorias(){
     this.categoriaHttp.getAllCategorias().subscribe((sucesso) => {
      this.categoriasCadastradas = sucesso;
      this.calcularItensPagina();
     }, (erro) => {

     }
     )
    }

     nomeCategoriaUpdate : String = '';
     idCategoriaUpdate : Number = 0
     descricaoCategoriaUpdate : String = ''

    updateCategoriaModal(categoria : CategoriaDTO){
      this.idCategoriaUpdate = categoria.id
      this.nomeCategoriaUpdate = categoria.nome
      this.descricaoCategoriaUpdate = categoria.descricao

      document.getElementById('modalUpdateContainer')?.style.setProperty('display','block')

    }

    updateCategoria(){


      var id = this.formCategoriaUpdate.get('id')?.value === 0 ?  this.idCategoriaUpdate : this.formCategoriaUpdate.get('id')?.value;
      var nome = this.formCategoriaUpdate.get('nome')?.value ===  '' ? this.nomeCategoriaUpdate : this.formCategoriaUpdate.get('nome')?.value;
      var descricao = this.formCategoriaUpdate.get('descricao')?.value === '' ? this.descricaoCategoriaUpdate : this.formCategoriaUpdate.get('descricao')?.value;

      console.log(id,descricao,nome)
      this.categoriaHttp.updateCategoria(id,nome,descricao).subscribe();

      this.formCategoriaUpdate.reset;
      this.idCategoriaUpdate = 0;
      this.nomeCategoriaUpdate = '';
      this.descricaoCategoriaUpdate = '';
      document.getElementById('modalUpdateContainer')?.style.setProperty('display','none')
    }

    deleteCategoria(int : Number){
      this.categoriaHttp.deleteCategorria(int).subscribe()
    }
    
 
    calcularItensPagina(){

        this.numPaginas = []
        var numPg = Math.ceil(this.categoriasCadastradas.length / 10);

        for(var i = 0; i < numPg;i++){
          this.numPaginas.push(i)
        }

    }
    
    mudarValoresMinMax(numero : number){

      switch (numero) {
        case 0:
          this.minNUm = 0,this.maxNum = 9;
          break;
          case 1:
          this.minNUm = 10,this.maxNum = 19;
          break;
          case 2:
          this.minNUm = 20,this.maxNum = 29;
          break;
      }

    }

}
