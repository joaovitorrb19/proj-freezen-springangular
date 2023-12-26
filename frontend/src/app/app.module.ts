import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemlistComponent } from './component/itemlist/itemlist.component';
import { MenuSuperiorComponent } from './component/menu-superior/menu-superior.component';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { CadastroComponentComponent } from './component/cadastro-component/cadastro-component.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from './interceptor/error-handler.service';
import { SucessHandlerService } from './interceptor/sucess-handler.service';
import { JwtModule } from '@auth0/angular-jwt';
import { FiltroComponent } from './component/filtro/filtro.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { ProdutoComponent } from './component/produto/produto.component';
import { MatTableModule } from '@angular/material/table';

export function tokenGetter(){
    return localStorage.getItem('Authorization');
}

@NgModule({
  declarations: [
    AppComponent,
    ItemlistComponent,
    MenuSuperiorComponent,
    LoginComponentComponent,
    CadastroComponentComponent,
    FiltroComponent,
    CategoriaComponent,
    ProdutoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    JwtModule.forRoot({
      config:{
        tokenGetter : tokenGetter,
        allowedDomains : ["localhost:8080"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorHandlerService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:SucessHandlerService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
