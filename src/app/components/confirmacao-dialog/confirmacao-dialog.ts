import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmacao-dialog',

  imports: [
    MatDialogModule,
    MatButtonModule
  ],

  templateUrl: './confirmacao-dialog.html',

  styleUrl: './confirmacao-dialog.css'
})
export class ConfirmacaoDialog {

  constructor(

    public dialogRef:
      MatDialogRef<ConfirmacaoDialog>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {}

  cancelar(): void {

    this.dialogRef.close(false);

  }

  confirmar(): void {

    this.dialogRef.close(true);

  }

}
