import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { CadastroComponentComponent } from './component/cadastro-component/cadastro-component.component';
import { ItemlistComponent } from './component/itemlist/itemlist.component';
import { AuthGuard } from './guards/auth-guard';
import { FiltroComponent } from './component/filtro/filtro.component';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { ProdutoComponent } from './component/produto/produto.component';

const routes: Routes = [
  {component:LoginComponentComponent,path:"login"},
  {component:CadastroComponentComponent,path:"cadastro"},
  {component:ItemlistComponent,path:""},
  {component:FiltroComponent,path:"filtro"},
  {component:CategoriaComponent,path:"categoria"},
  {component:ProdutoComponent,path:"produto"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
