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
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { FiltroComponent } from './component/filtro/filtro.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { ProdutoComponent } from './component/produto/produto.component';
import { MatTableModule } from '@angular/material/table';
import { VerificarauthserviceService } from './interceptor/verificarauthservice.service';
import { ProdutoadminComponent } from './component/produtoadmin/produtoadmin.component';
import { CarrinhoComponent } from './component/carrinho/carrinho.component';


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
    ProdutoadminComponent,
    CarrinhoComponent,
    
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
        allowedDomains : ["test.testandofreezenapp.rf.gd"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:VerificarauthserviceService,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
