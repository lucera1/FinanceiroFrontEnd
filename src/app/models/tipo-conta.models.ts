export interface TipoConta {
  id: number;
  nome: string;
}

export interface Conta {
  id?: number;
  descricao: string;
  numero: string;
  agencia: string;
  limite?: number;
  tipoConta: string;   // <-- enum vem como string
  usuarioId: number;
  bancoId: number;
}
