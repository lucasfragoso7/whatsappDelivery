import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-importar-aquivos-dialog',
  templateUrl: './importar-aquivos-dialog.component.html',
  styleUrls: ['./importar-aquivos-dialog.component.css']
})
export class ImportarAquivosDialogComponent implements OnInit {

  nomeDoArquivo = '';

  constructor(
    public dialogRef: MatDialogRef<ImportarAquivosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ClienteService) { }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}


