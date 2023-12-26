import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucessHandlerService implements HttpInterceptor{

  constructor(private matSnack : MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(
      tap( response => {
          
        if(response instanceof HttpResponse && (response.status >= 200 && response.status < 300)){
            this.matSnack.open('Operação bem sucedida!','X',{duration : 5000,horizontalPosition:'center',verticalPosition:'top'})
        }

      })
    )

  }


}
