import { Component, OnInit } from '@angular/core';
import { ExtratoService } from '../../services/extrato.service';
import { ContaService } from '../../services/conta.service';
import { LancamentoService } from '../../services/lancamento.service';
import { Extrato } from '../../models/extrato.models';
import { Conta } from '../../models/conta.models';
import { Lancamento } from '../../models/lancamento.models';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  extratos: Extrato[] = [];
  contas: Conta[] = [];
  lancamentos: Lancamento[] = [];
  

  carregando = false;
  erro = '';

  // Grandezas do gráfico
  valorGasto = 0;
  valorEmConta = 0;
  valorAPagar = 0;
  limiteCredito = 0;

  chart!: Chart;

  constructor(
    private extratoService: ExtratoService,
    private contaService: ContaService,
    private lancamentoService: LancamentoService
  ) {}

  ngOnInit(): void {
    this.carregarTudo();
  }

  /** 🔄 Carrega tudo em sequência para evitar bug do gráfico */
  carregarTudo(): void {
    this.carregando = true;

    this.contaService.findAll().subscribe({
      next: contas => {
        this.contas = contas;
        this.limiteCredito = Number(contas[0]?.limite ?? 0);

        this.lancamentoService.findAll().subscribe({
          next: lancs => {
            this.lancamentos = lancs;

            // 🟡 Valor a pagar = débitos em situação ABERTO
            this.valorAPagar = this.lancamentos
              .filter(l => l.tipoLancamento === 'DEBITO' && l.situacao === 'ABERTO')
              .reduce((sum, l) => sum + Number(l.valor ?? 0), 0);

            this.extratoService.findAll().subscribe({
              next: extratos => {
                this.extratos = extratos;

                // 🔵 Valor gasto = extratos de débito
                this.valorGasto = this.extratos
                  .filter(e => e.tipoLancamento === 'DEBITO')
                  .reduce((sum, e) => sum + Number(e.valor ?? 0), 0);

                // 🟢 Valor em conta = último extrato
                this.valorEmConta = Number(contas[0].saldo ?? 0);

                this.renderizarGrafico();
                this.carregando = false;
              },
              error: () => {
                this.erro = 'Erro ao carregar extratos';
                this.carregando = false;
              }
            });

          },
          error: () => console.error("Erro ao carregar lançamentos")
        });
      },
      error: () => console.error("Erro ao carregar contas")
    });
  }

  /** 🎨 Renderiza gráfico com 4 grandezas */
  renderizarGrafico(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart("pieChart", {
      type: 'pie',
      data: {
        labels: ["Valor Gasto", "Valor em Conta", "Valor a Pagar", "Limite de Crédito"],
        datasets: [{
          data: [
            this.valorGasto,
            this.valorEmConta,
            this.valorAPagar,
            this.limiteCredito
          ],
          backgroundColor: [
            "#ff6384", // gasto
            "#36a2eb", // conta
            "#ffcd56", // a pagar
            "#4bc0c0"  // limite
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });
  }

  /** ❌ Excluir extrato */
  deletarExtrato(id?: number): void {
    if (!id) return;

    this.extratoService.delete(id).subscribe({
      next: () => this.carregarTudo(),
      error: (err) => console.error('Erro ao deletar extrato', err)
    });
  }
}
