import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificarauthserviceService implements HttpInterceptor {

  constructor(private jwt: JwtHelperService,private snack : MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    var token = localStorage.getItem('Authorization');

      if (this.jwt.isTokenExpired(token)) {
        localStorage.removeItem('Authorization');
        // req.headers.delete('Authorization'); > headers imutavel, tem q clonar já deletando o header desejado.
        const teste = req.clone({headers:req.headers.delete('Authorization')});
        req = teste;
        console.log('Token expirado. Removendo do localStorage.');
      }
    

    return next.handle(req).pipe(
      tap(response => {

        if (response instanceof HttpResponse && (response.status >= 200 && response.status < 300)) {
          this.snack.open('Operação bem sucedida!', 'X', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top' })
        }

      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.error)
         var lista : Array<string> = [];

         var txt : string = ''

         // se a resposta vier do ExceptionController ou de alguma exception:
         if(Array.isArray(error.error)){
            var auxSet : Set<String> = new Set();

            for(var i in error.error){
              auxSet.add(error.error[i])
            }

            auxSet.forEach(x => {
              txt += x + '\n' + ' '
            })
            
            this.snack.open(txt, 'X', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['error-snackbar'] })
            return throwError(error)
         }
         
         lista = JSON.parse(error.error)
         
         for(var i in lista){
            txt += lista[i] + "\n" + ' '
         }

         this.snack.open(txt, 'X', { duration: 5000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: ['error-snackbar'] })

        return throwError(error)

      })
    );
  }
}
