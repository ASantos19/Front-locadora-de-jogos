import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generoJogo',
  standalone: true,
})
export class GeneroJogoPipe
  implements PipeTransform {

  transform(valor: string): string {

    switch (valor) {

      case 'ACAO':
        return 'Ação';

      case 'ESTRATEGIA':
        return 'Estratégia';

      case 'AVENTURA':
        return 'Aventura';

      default:
        return valor;

    }

  }

}
