import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Cliente } from './../../models/cliente.model';
import { ClienteService } from './../../services/cliente.service';
import { MensagemDialogComponent } from './../mensagem-dialog/mensagem-dialog.component';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  constructor(private router: Router, private service: ClienteService, public dialog: MatDialog) { }

  clientes = new Array<Cliente>();

  ngOnInit() {
    this.carregarClientes();
  }

  private carregarClientes() {
    this.clientes = this.service.getClientes();
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
      maxHeight:'500px',

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

}
