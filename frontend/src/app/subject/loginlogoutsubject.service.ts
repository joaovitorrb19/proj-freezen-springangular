import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginlogoutsubjectService {

  logado = new BehaviorSubject<boolean>(false);

  constructor() { }

   atualizarValor(bool : boolean) {

    this.logado.next(bool);

  }

}
