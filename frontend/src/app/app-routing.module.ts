import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { CadastroComponentComponent } from './component/cadastro-component/cadastro-component.component';
import { ItemlistComponent } from './component/itemlist/itemlist.component';

const routes: Routes = [
  {component:LoginComponentComponent,path:"login"},
  {component:CadastroComponentComponent,path:"cadastro"},
  {component:ItemlistComponent,path:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
