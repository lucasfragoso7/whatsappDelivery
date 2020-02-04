import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Cliente } from './../../models/cliente.model';
import { ClienteService } from './../../services/cliente.service';
import { MensagemDialogComponent } from './../mensagem-dialog/mensagem-dialog.component';
import { element } from 'protractor';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit, AfterViewInit {

  clientes = new Array<Cliente>();

  constructor(private router: Router, private service: ClienteService, public dialog: MatDialog) { }


  ngOnInit() {
    if (this.service.clientes.length == 0) {
      this.service.getClienteBack();
      this.service.iniciar();
    } else {
      this.carregarClientes();

    }

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.carregarClientes();
    }, 300);
  }
  private carregarClientes() {
    this.clientes = this.service.getClientes()
  }

  remove(cliente: Cliente) {
    this.service.removeCliente(cliente);
    this.carregarClientes()
  }

  edit(cliente: Cliente) {

    this.service.addClienteEdicao(cliente);
    this.router.navigateByUrl('/cliente-detalhe')

  }
  mensagem() {
    let dialogRef = this.dialog.open(MensagemDialogComponent, {
      maxWidth: '700px',
      maxHeight: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      this.service.setMensagem(result);
    });

  }
  novo() {
    this.router.navigateByUrl('/cliente-detalhe')

  }

  enviar() {
    this.service.postMensagem(this.pegarContatosMarcados());

  }

  pegarContatosMarcados() {
    let contatos = new Array<String>();
    this.clientes.forEach(element => {
      if (element.select) {

        contatos.push(element.contato);
      }
    })
    return contatos;
  }

  select(cliente: Cliente) {
    this.clientes.forEach(i => {
      if (i.contato !== cliente.contato && i.nome !== cliente.nome && i.numero !== cliente.numero) {
        i.select = !i.select;
      }
    })
  }

}
