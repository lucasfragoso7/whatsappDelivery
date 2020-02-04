import { Injectable, Output } from '@angular/core';
import { Cliente } from '../models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {



  mensagem: String;
  clienteEdit: Cliente;

  clientes = new Array<Cliente>();

  constructor(private http: HttpClient) { }

  addClienteEdicao(cliente: Cliente) {
    this.clienteEdit = cliente;
    this.removeCliente(cliente);

  }

  removeCliente(cliente: Cliente) {
    this.clientes = this.clientes.filter(function (i) { return i.contato !== cliente.contato && i.nome !== cliente.nome && i.numero !== cliente.numero; });
  }

  setCliente(cliente: Cliente) {
    this.clientes.push(cliente)
    this.clienteEdit = null;
  }
  existsClienteEdit(): boolean {
    return this.clienteEdit ? true : false;
  }

  getClientes(): Cliente[] {
    return this.clientes;
  }
  getClienteBack() {
    this.http.get<Cliente[]>(environment.API_URL + '/recuperarContatos').subscribe(res => {
      this.clientes = res;
    })
  }
  setMensagem(result: any) {
    this.mensagem = result
  }

  postMensagem(contatos: String[]) {
    let object = {
      listaContatos: contatos,
      mensagem: this.mensagem
    }
    this.http.post(environment.API_URL + '/enviarMensagem', object).subscribe();
  }

  iniciar() {
    this.http.get(environment.API_URL + '/init').subscribe();
  }

}
