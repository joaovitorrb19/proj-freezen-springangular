import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { CadastroComponentComponent } from './component/cadastro-component/cadastro-component.component';
import { ItemlistComponent } from './component/itemlist/itemlist.component';
import { AuthGuardAdmin} from './guards/auth-guard';
import { FiltroComponent } from './component/filtro/filtro.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { ProdutoComponent } from './component/produto/produto.component';
import { ProdutoadminComponent } from './component/produtoadmin/produtoadmin.component';
import { AuthguarduserService } from './guards/authguarduser.service';
import { CarrinhoComponent } from './component/carrinho/carrinho.component';
import { JatalogadoService } from './guards/jatalogado.service';

const routes: Routes = [
  {component:LoginComponentComponent,path:"login",canActivate:[JatalogadoService]},
  {component:CadastroComponentComponent,path:"cadastro",canActivate:[JatalogadoService]},
  {component:ProdutoComponent,path:""},
  {component:FiltroComponent,path:"filtro"},
  {component:CarrinhoComponent,path:"carrinho"},
  // {component:ProdutoComponent,path:"produto",canActivate:[AuthguarduserService]},
  {component:CategoriaComponent,path:"categoria",canActivate:[AuthGuardAdmin]},
  {component:ProdutoadminComponent,path:"produtoadm",canActivate:[AuthGuardAdmin]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
