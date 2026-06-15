import { tipoLicenca } from '../enums/tipo-licenca.enum';
import { statusLicenca } from '../enums/status-licenca.enum';
import { Usuario } from '../models/usuario.model';
import { Jogo } from '../models/jogo.model';

export interface Licenca {
  id: number;
  tipoLicenca: tipoLicenca;
  statusLicenca: statusLicenca;
  valor: number;
  dataCompra: string;
  dataExpiracao: string;
  notaFiscal: string;

  usuario: Usuario;
  jogo: Jogo;
}
