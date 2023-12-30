import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, throwError } from 'rxjs';
import { RespostaDTO } from '../dto/resposta-dto';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor{

  constructor(private snack : MatSnackBar) { }

  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        
        var errorMsg : string = ''

        for(var errr in error.error){

            errorMsg += " " + error.error[errr] + "\n" + " " 
        }

        this.snack.open(errorMsg,'X',{duration:5000,horizontalPosition:'center',verticalPosition:'top',panelClass:['error-snackbar']})

         return throwError(error)

      })

    )
  }


}
