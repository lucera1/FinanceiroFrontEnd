export interface Extrato {
  id: number;
  descricao: string;
  valor: number;
  data: Date;
  tipoLancamento?: string;
  saldoAposMovimentacao?: number;
  limiteAposMovimentacao?: number;
  contaId: number; // <-- aqui
}
