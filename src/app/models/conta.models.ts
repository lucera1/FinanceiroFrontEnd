import { TipoConta } from './tipo-conta.models';
import { Usuario } from './usuario.models';
import { Banco } from './banco.models';

export interface Conta {
  id?: number;
  descricao: string;
  saldo: number;
  tipoConta: TipoConta;
  agencia: string;
  numero: string;
  limite: number;
  usuarioId: number; // referência ao ID do usuário
  bancoId?: number;  // referência ao ID do banco (opcional)
  usuario: Usuario; // opcional para exibição
  banco: Banco;     // opcional para exibição
}
