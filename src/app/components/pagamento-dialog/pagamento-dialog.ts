import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-pagamento-dialog',
  imports: [MatDialogContent, MatDialogActions, MatButtonModule, MatDialogActions,  MatDialogModule,
    MatButtonModule],
  templateUrl: './pagamento-dialog.html'
})
export class PagamentoDialog {

  dados = inject(MAT_DIALOG_DATA);

}
