// src/app/models/lancamento.enums.ts
import { TipoLancamento, Situacao } from './enums.models';

export const TIPOS_LANCAMENTO: TipoLancamento[] = [
  TipoLancamento.CREDITO,
  TipoLancamento.DEBITO
];

export const SITUACOES: Situacao[] = [
  Situacao.ABERTO,
  Situacao.BAIXADO
];
