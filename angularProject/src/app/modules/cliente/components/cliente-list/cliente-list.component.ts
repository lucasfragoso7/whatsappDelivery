import { ImportarAquivosDialogComponent } from './../importar-aquivos-dialog/importar-aquivos-dialog.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Cliente } from './../../models/cliente.model';
import { ClienteService } from './../../services/cliente.service';
import { MensagemDialogComponent } from './../mensagem-dialog/mensagem-dialog.component';
import { element } from 'protractor';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit, AfterViewInit {

  clientes = new Array<Cliente>();
  pag = 1;
  contador = 150;
  flagEnviarContatos: boolean = true;

  constructor(private router: Router, private service: ClienteService, public dialog: MatDialog) { }


  ngOnInit() {
    this.flagEnviarContatos = this.service.flagWhatsApp;

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.carregarClientes();
    }, 3000);
  }

  private carregarClientes() {
    this.service.getClienteBack().subscribe(res => this.clientes = res);
  }

  remove(cliente: Cliente) {
    this.service.removeCliente(cliente).subscribe(res => {
      this.carregarClientes()
    });
  }

  edit(cliente: Cliente) {
    this.service.addClienteEdicao(cliente);
    this.router.navigateByUrl('/cliente-detalhe')
  }
  mensagem() {
    let dialogRef = this.dialog.open(MensagemDialogComponent, {
      width: '70%',
      maxHeight: '60%',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.setMensagem(result);
    });

  }
  novo() {
    this.router.navigateByUrl('/cliente-detalhe')

  }

  enviar() {
    if (!this.service.mensagens.length) {
      alert(`Por favor, definir mensagem!`)
    } else {
      this.service.postMensagem(this.pegarContatosMarcados());

    }

  }

  pegarContatosMarcados() {
    let contatos = new Array<String>();
    this.clientes.forEach((element: Cliente, index) => {
      if (index => ((this.pag - 1) * this.contador) && index <= (this.pag * this.contador - 1)) {
        contatos.push(element.telefone);
      }
    })
    return contatos;
  }

  importarArquivos() {
    let dialogRef = this.dialog.open(ImportarAquivosDialogComponent, {
      maxWidth: '50%',
      maxHeight: '40%',
      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.importarArquivos(result).subscribe(res => { this.carregarClientes() });
    });

  }
  inciarWhatsApp() {
    this.flagEnviarContatos = false;
    this.service.iniciar();
    this.service.flagWhatsApp = this.flagEnviarContatos;
  }

}
