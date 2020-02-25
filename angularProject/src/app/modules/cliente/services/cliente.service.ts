import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from './../models/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  flagArquivos = false;
  nomeDoArquivo = '';
  mensagens = new Array<String>()

  clienteEdit: Cliente;

  constructor(private http: HttpClient) { }

  addClienteEdicao(cliente: Cliente) {

    this.clienteEdit = cliente;
    this.removeCliente(cliente);

  }

  removeCliente(cliente: Cliente) {
    return this.http.delete<Cliente[]>(environment.API_URL + '/apagarContato' + "/" + cliente.id);

  }

  setCliente(cliente: Cliente) {
    this.clienteEdit = null;
    return this.http.post<Cliente[]>(environment.API_URL + '/salvarContato ', cliente);
  }

  existsClienteEdit(): boolean {
    return this.clienteEdit != null;
  }


  getClienteBack() {
    return this.http.get<Cliente[]>(environment.API_URL + '/recuperarContatos')
  }

  setMensagem(result: String[]) {
    this.mensagens = result;
  }

  postMensagem(contatos: String[]) {
    let object = {
      listaContatos: contatos,
      mensagem: this.mensagens,
      temArquivo: this.flagArquivos,
      nomeArquivo:this.nomeDoArquivo
    }
    this.http.post(environment.API_URL + '/enviarMensagem', object).subscribe();
  }

  iniciar() {
    this.http.get(environment.API_URL + '/init').subscribe();
  }

  setFlagArquivos(flagArquivos) {
    this.flagArquivos = flagArquivos
  }


}
