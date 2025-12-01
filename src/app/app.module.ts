import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JwtInterceptor } from '../app/auth/jwt.interceptor';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { BancoComponent } from './pages/banco/banco.component';
import { ContaComponent } from './pages/conta/conta.component';
import { CentroCustoComponent } from './pages/centro-custo/centro-custo.component';
import { LancamentoComponent } from './pages/lancamento/lancamento.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { CadastroComponent } from './auth/cadastro/cadastro.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsuarioComponent,
    BancoComponent,
    ContaComponent,
    CentroCustoComponent,
    LancamentoComponent,
    ExtratoComponent,
    CadastroComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } // <-- Registra o interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
