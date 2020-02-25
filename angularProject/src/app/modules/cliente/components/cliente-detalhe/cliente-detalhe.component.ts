import { Router } from '@angular/router';
import { Cliente } from './../../models/cliente.model';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css']
})
export class ClienteDetalheComponent implements OnInit, AfterViewInit {

  contatosForm: FormGroup;

  constructor(private fb: FormBuilder, private service: ClienteService, private router: Router) {
    this.createForm();
  }
  ngAfterViewInit(): void {
    if (this.service.existsClienteEdit()) {
      let cliente: Cliente = this.service.clienteEdit;
      this.carregarForm(cliente);
    }
  }
  createForm() {
    this.contatosForm = this.fb.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cidade: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required])

    });
  }

  onClickSubmit() {
    if (this.contatosForm.valid) {
      let cliente: Cliente = this.MontarCliente();
      this.service.setCliente(cliente).subscribe(
        res => this.router.navigateByUrl('/home')
      )
    }

  }
  private MontarCliente() {
    let cliente: Cliente;
    if (this.service.clienteEdit) {
      cliente = this.editCliente();
    }
    else {
      cliente = this.createCliente();
    }
    return cliente;
  }

  createCliente(): Cliente {
    let cliente: Cliente = new Cliente();

    cliente.email = this.contatosForm.controls.email.value;
    cliente.nome = this.contatosForm.controls.nome.value;
    cliente.telefone = this.contatosForm.controls.telefone.value;
    cliente.cidade = this.contatosForm.controls.cidade.value;
    return cliente;
  }

  editCliente(): Cliente {
    let cliente = this.service.clienteEdit;
    cliente.email = this.contatosForm.controls.email.value;
    cliente.nome = this.contatosForm.controls.nome.value;
    cliente.telefone = this.contatosForm.controls.telefone.value;
    cliente.cidade = this.contatosForm.controls.cidade.value;

    return cliente;
  }

  ngOnInit() {
  }

  carregarForm(cliente: Cliente) {
    this.contatosForm.controls.nome.setValue(cliente.nome);
    this.contatosForm.controls.email.setValue(cliente.email);
    this.contatosForm.controls.telefone.setValue(cliente.telefone);
    this.contatosForm.controls.cidade.setValue(cliente.cidade);


  }
  voltar(){
    this.router.navigateByUrl('/home')
  }
}

