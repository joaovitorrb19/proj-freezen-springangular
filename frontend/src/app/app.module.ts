import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemlistComponent } from './component/itemlist/itemlist.component';
import { MenuSuperiorComponent } from './component/menu-superior/menu-superior.component';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { CadastroComponentComponent } from './component/cadastro-component/cadastro-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemlistComponent,
    MenuSuperiorComponent,
    LoginComponentComponent,
    CadastroComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
