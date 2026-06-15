import { Licenca } from '../models/licenca.models';

export interface Usuario {
  id: number;
  nome: string;
  apelido: string;
  email: string;
  role: string;

  licencas?: Licenca[];
}
