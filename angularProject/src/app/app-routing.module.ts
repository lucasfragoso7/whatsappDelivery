import { ClienteDetalheComponent } from './modules/cliente/components/cliente-detalhe/cliente-detalhe.component';
import { ClienteListComponent } from './modules/cliente/components/cliente-list/cliente-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ClienteListComponent },
  { path: 'cliente-detalhe', component: ClienteDetalheComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
