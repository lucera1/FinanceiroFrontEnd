import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../../services/lancamento.service';
import { Lancamento } from '../../models/lancamento.models';
import { TIPOS_LANCAMENTO, SITUACOES } from '../../models/lancamento.enums';
import { Conta } from '../../models/conta.models';
import { ContaService } from '../../services/conta.service';
import { CentroCusto } from '../../models/centro-custo.models';
import { CentroCustoService } from '../../services/centro-custo.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
})
export class LancamentoComponent implements OnInit {
  lancamentos: Lancamento[] = [];
  contas: Conta[] = [];
  centrosCusto: CentroCusto[] = [];
  tiposLancamento = TIPOS_LANCAMENTO;
  situacoes = SITUACOES;

  novoLancamento: Partial<Lancamento> = {};
  lancamentoEditando: Partial<Lancamento> | null = null;

  constructor(
    private lancamentoService: LancamentoService,
    private contaService: ContaService,
    private centroService: CentroCustoService
  ) {}

  ngOnInit(): void {
    this.loadLancamentos();
    this.loadContas();
    this.loadCentros();
  }

  loadLancamentos() {
    this.lancamentoService.findAll().subscribe({
      next: data => this.lancamentos = data,
      error: err => console.error(err)
    });
  }

  loadContas() {
    this.contaService.findAll().subscribe({
      next: data => this.contas = data,
      error: err => console.error(err)
    });
  }

  loadCentros() {
    this.centroService.findAll().subscribe({
      next: data => this.centrosCusto = data,
      error: err => console.error(err)
    });
  }

  getDescricaoConta(contaId?: number): string {
    const conta = this.contas.find(c => c.id === contaId);
    return conta ? conta.descricao : '—';
  }

  getRazaoCentroCusto(centroCustoId?: number): string {
    const centro = this.centrosCusto.find(cc => cc.id === centroCustoId);
    return centro ? centro.razaoSocial : '—';
  }

  criarLancamento() {
  if (!this.novoLancamento.contaId || !this.novoLancamento.descricao) return;

  const payload: Lancamento = {
    id: 0, // ou deixe undefined se o back-end gerar o id
    descricao: this.novoLancamento.descricao!,
    parcela: this.novoLancamento.parcela ?? undefined,
    dataLancamento: this.novoLancamento.dataLancamento!,
    dataVencimento: this.novoLancamento.dataVencimento!,
    tipoLancamento: this.novoLancamento.tipoLancamento!,
    valor: this.novoLancamento.valor!,
    situacao: this.novoLancamento.situacao!,
    contaId: this.novoLancamento.contaId!,
    centroCustoId: this.novoLancamento.centroCustoId ?? undefined
  };

  this.lancamentoService.create(payload).subscribe({
    next: () => {
      this.novoLancamento = {};
      this.loadLancamentos();
    },
    error: err => console.error(err)
  });
}

  editarLancamento(lanc: Lancamento) {
    this.lancamentoEditando = { ...lanc };
  }

  atualizarLancamento() {
  if (!this.lancamentoEditando?.id) return;

  // Cria payload preenchendo todos os campos obrigatórios
  const payload: Lancamento = {
    id: this.lancamentoEditando.id,
    descricao: this.lancamentoEditando.descricao || '',  // default para string vazia
    parcela: this.lancamentoEditando.parcela,           // opcional
    dataLancamento: this.lancamentoEditando.dataLancamento || new Date(),
    dataVencimento: this.lancamentoEditando.dataVencimento || new Date(),
    tipoLancamento: this.lancamentoEditando.tipoLancamento || TIPOS_LANCAMENTO[0],
    valor: this.lancamentoEditando.valor || 0,
    situacao: this.lancamentoEditando.situacao,
    contaId: this.lancamentoEditando.contaId!,
    centroCustoId: this.lancamentoEditando.centroCustoId
  };

  console.log('Payload para update:', payload);

  this.lancamentoService.update(this.lancamentoEditando.id, payload).subscribe({
    next: () => {
      this.lancamentoEditando = null;
      this.loadLancamentos();
    },
    error: err => console.error('Erro ao atualizar:', err)
  });
}



  cancelarEdicao() {
    this.lancamentoEditando = null;
  }

  deletarLancamento(id: number) {
    this.lancamentoService.delete(id).subscribe({
      next: () => this.loadLancamentos(),
      error: err => console.error(err)
    });
  }

  pagarLancamento(id: number) {
    this.lancamentoService.pagar(id).subscribe({
      next: () => this.loadLancamentos(),
      error: err => console.error(err)
    });
  }
}
