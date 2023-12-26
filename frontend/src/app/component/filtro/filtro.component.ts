import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit{

  valorMin : number = 0;
  valorMax: number = 40;
  valorMinPorcento : number = 0;
  valorMaxPorcento : number = 0;

    constructor(){

    }

  ngOnInit(): void {
   this.atualizarBarraMax();
   this.atualizarBarraMin();
  }

  atualizarBarraMin(){
    /* 1000 = left = 10% */

      this.valorMinPorcento = (this.valorMin * 100) / 9960;

  }

  atualizarBarraMax(){
    /*  */

    this.valorMaxPorcento = 100 - ( (this.valorMax * 100) / 10000);

  }
 
}
