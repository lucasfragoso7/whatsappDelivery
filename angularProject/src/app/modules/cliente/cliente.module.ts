import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClienteService } from './services/cliente.service';
import { ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteDetalheComponent } from './components/cliente-detalhe/cliente-detalhe.component';
import { ClienteListComponent } from './components/cliente-list/cliente-list.component';
import { MensagemDialogComponent } from './components/mensagem-dialog/mensagem-dialog.component';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';



@NgModule({
  declarations: [
    ClienteDetalheComponent,
    ClienteListComponent,
    MensagemDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [ClienteService, HttpClient,],
  exports: [ClienteListComponent],
  entryComponents: [MensagemDialogComponent]
})
export class ClienteModule { }
