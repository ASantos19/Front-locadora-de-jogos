import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true,
})
export class StatusPipe
  implements PipeTransform {

  transform(valor: string): string {

    switch (valor) {

      case 'ATIVA':
        return 'Ativa';

      case 'EXPIRADA':
        return 'Expirada';

      case 'CANCELADA':
        return 'Cancelada';

      default:
        return valor;

    }

  }

}
