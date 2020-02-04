import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  setMensagem(result: any) {
    this.mensagem = result
  }

  mensagem:String;
  clienteEdit: Cliente;

  clientes = new Array<Cliente>();

  addClienteEdicao(cliente: Cliente) {
    this.clienteEdit = cliente;
    this.removeCliente(cliente);

  }

  removeCliente(cliente: Cliente) {
    this.clientes = this.clientes.filter(function (i) { return i.nome !== cliente.nome; });
  }

  setCliente(cliente: Cliente) {
    this.clientes.push(cliente)
  }
  existsClienteEdit(): boolean {
    return this.clienteEdit ? true : false;
  }

  getClientes() {
    return this.clientes;
  }
  constructor() { }


}
