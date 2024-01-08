import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resposta } from '../component/menu-superior/resposta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursosComAuthorizationService {

  constructor(private http : HttpClient) { }

  testarToken() : Observable<Resposta[]>{
    const header = {
      headers :  new HttpHeaders({
        'Authorization' : localStorage.getItem('Authorization') || 0,
        'Content-Type': 'application/json'
      })
    }
      console.log(header.headers)
    return this.http.get<Resposta[]>('https://test.testandofreezenapp.rf.gd/usuario/getall',header)
  }


}
