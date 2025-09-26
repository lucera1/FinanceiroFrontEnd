import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { BancoComponent } from './pages/banco/banco.component';
import { ContaComponent } from './pages/conta/conta.component';
import { CentroCustoComponent } from './pages/centro-custo/centro-custo.component';
import { LancamentoComponent } from './pages/lancamento/lancamento.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'usuario', component: UsuarioComponent },
      { path: 'banco', component: BancoComponent },
      { path: 'conta', component: ContaComponent },
      { path: 'centro-custo', component: CentroCustoComponent },
      { path: 'lancamento', component: LancamentoComponent }, 
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
