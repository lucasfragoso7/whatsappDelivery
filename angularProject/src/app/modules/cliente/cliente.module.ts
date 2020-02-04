import { ClienteService } from './services/cliente.service';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteDetalheComponent } from './components/cliente-detalhe/cliente-detalhe.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { MensagemDialogComponent } from './components/mensagem-dialog/mensagem-dialog.component';



@NgModule({
  declarations: [ClienteDetalheComponent, ClienteListComponent, MensagemDialogComponent],
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule

  ],
  providers: [ClienteService],
  exports: [ClienteListComponent],
  entryComponents:[MensagemDialogComponent]
})
export class ClienteModule { }
