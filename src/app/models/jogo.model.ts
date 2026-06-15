import { GeneroJogo } from '../enums/genero-jogo.enum';
import { Plataforma } from '../enums/plataforma.enum';

export interface Jogo {
  id: number;
  nomeJogo: string;
  dataLancamento: string;

  generoJogo: GeneroJogo;
  plataforma: Plataforma;

  precoCompra: number;
  precoAluguel: number;


}
