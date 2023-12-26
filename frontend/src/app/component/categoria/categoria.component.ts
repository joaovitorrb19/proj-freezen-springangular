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

    categoriasCadastradas :  CategoriaDTO [] = [];

    objetoCategorias : CategoriaDTO[][] = [[]]


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
          this.formCategoria.reset;
          setTimeout(() => {
            this.getCategorias()
          },3000)
      }, (error) => {
       
        console.log("Deu erro")
      })
    }


    getCategorias(){
     this.categoriaHttp.getAllCategorias().subscribe((sucesso) => {
      this.categoriasCadastradas = sucesso;
     }, (erro) => {

     }
     )
    }

 
    calcularItensPagina(){



      var contador = 0;

      var numPaginas = Math.ceil(this.categoriasCadastradas.length / 10);

      for(var i = 0 ; i <= numPaginas; i++){

        var objetoCateg : CategoriaDTO [] = []

        for(var ii = 0; i < contador + 10; ii ++){

            objetoCateg.push(this.categoriasCadastradas[ii])
            contador =+ 1;
        }
          this.objetoCategorias.push(objetoCateg);
      }

      console.log(numPaginas)
      console.log(this.objetoCategorias)

    }
    
}
