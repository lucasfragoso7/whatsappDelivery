import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mensagem-dialog',
  templateUrl: './mensagem-dialog.component.html',
  styleUrls: ['./mensagem-dialog.component.css']
})
export class MensagemDialogComponent implements OnInit {
  mensagens = new Array<String>();
  constructor(
    public dialogRef: MatDialogRef<MensagemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  remove(mensagem: String) {
    this.mensagens = this.mensagens.filter(element => element != mensagem);
  }

  add(mensagem: String) {
    if (mensagem.trim()) {
      this.mensagens.push(mensagem);
    }
  }
}
