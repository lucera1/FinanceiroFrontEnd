export interface Usuario {
  id?: number;
  razaoSocial: string;
  email: string;
  senha: string;
  tipoPessoa: 'ADMIN' | 'CLIENTE';
}
