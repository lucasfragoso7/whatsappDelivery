import { Router } from '@angular/router';
import { Cliente } from './../../models/cliente.model';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css']
})
export class ClienteDetalheComponent implements OnInit {
  contatosForm: FormGroup;

  constructor(private fb: FormBuilder, private service: ClienteService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.contatosForm = this.fb.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required])

    });
  }

  onClickSubmit() {
    if (this.contatosForm.valid) {
      const cliente: Cliente = this.createCliente()
      this.service.setCliente(cliente);
      this.router.navigateByUrl('/home')
    }

  }
  createCliente(): Cliente {
    let cliente: Cliente = new Cliente();

    cliente.email = this.contatosForm.controls.email.value;
    cliente.nome = this.contatosForm.controls.nome.value;
    cliente.numero = this.contatosForm.controls.telefone.value;
    return cliente;
  }

  ngOnInit() {
    if (this.service.existsClienteEdit()) {
      let cliente: Cliente = this.service.clienteEdit;
      this.carregarForm(cliente);
    }


  }

  carregarForm(cliente: Cliente) {
    this.contatosForm.controls.nome.setValue(cliente.nome);
    this.contatosForm.controls.email.setValue(cliente.email);
    this.contatosForm.controls.telefone.setValue(cliente.numero);

  }

}

