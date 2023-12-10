import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { CadastroComponentComponent } from './component/cadastro-component/cadastro-component.component';

const routes: Routes = [
  {component:LoginComponentComponent,path:"login"},
  {component:CadastroComponentComponent,path:"cadastro"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
