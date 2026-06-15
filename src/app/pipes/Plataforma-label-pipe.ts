import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plataforma',
  standalone: true,
})
export class PlataformaPipe
  implements PipeTransform {

  transform(valor: string): string {

    switch (valor) {

      case 'PC':
        return 'Pc';

      case 'PS5':
        return 'PlayStation 5';

      case 'XBOX':
        return 'Xbox';



      default:
        return valor;

    }

  }

}
