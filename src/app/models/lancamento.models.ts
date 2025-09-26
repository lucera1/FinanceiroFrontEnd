// src/app/models/lancamento.models.ts
import { TipoLancamento, Situacao } from './enums.models';
import { Conta } from './conta.models';
import { CentroCusto } from './centro-custo.models';

export interface Lancamento {
  id?: number;
  descricao: string;
  parcela?: string; // ex: 1/3
  dataLancamento: Date;
  dataVencimento: Date;
  dataBaixa?: Date | null;
  tipoLancamento: TipoLancamento;
  valor: number;
  situacao?: Situacao;
  contaId: number;          // <-- id da conta
  centroCustoId?: number;
}
