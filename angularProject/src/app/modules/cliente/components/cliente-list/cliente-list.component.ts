import { Cliente } from './../../models/cliente.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  constructor() { }

  clientes: Array<Cliente>

  ngOnInit() {
  }

  remove(cliente:Cliente){

  }

}
