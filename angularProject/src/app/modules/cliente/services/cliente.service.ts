import { Injectable, Output } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  setMensagem(result: any) {
    this.mensagem = result
  }

  mensagem: String;
  clienteEdit: Cliente;

  clientes = new Array<Cliente>();

  addClienteEdicao(cliente: Cliente) {
    this.clienteEdit = cliente;
    this.removeCliente(cliente);

  }

  removeCliente(cliente: Cliente) {
    this.clientes = this.clientes.filter(function (i) { return i.contato !== cliente.contato && i.nome !== cliente.nome && i.numero !== cliente.numero; });
  }

  setCliente(cliente: Cliente) {
    this.clientes.push(cliente)
  }
  existsClienteEdit(): boolean {
    return this.clienteEdit ? true : false;
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.API_URL + '/recuperarContatos')

  }
  constructor(private http: HttpClient) { }


}
