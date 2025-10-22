import { Component, OnInit } from '@angular/core';
import { ExtratoService } from '../../services/extrato.service';
import { ContaService } from '../../services/conta.service';
import { Extrato} from '../../models/extrato.models';
import { Conta } from '../../models/conta.models';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  extratos: Extrato[] = [];
  contas: Conta[] = [];
  carregando = false;
  erro = '';

  constructor(
    private extratoService: ExtratoService,
    private contaService: ContaService
  ) {}

  ngOnInit(): void {
    this.carregarContas();
    this.carregarExtratos();
  }

  carregarContas(): void {
    this.contaService.findAll().subscribe({
      next: (data) => this.contas = data,
      error: (err) => console.error('Erro ao carregar contas', err)
    });
  }

  carregarExtratos(): void {
    this.carregando = true;
    this.extratoService.findAll().subscribe({
      next: (data) => {
        // Converte datas para Date
        this.extratos = data.map(e => ({
          ...e,
          dataMovimentacao: new Date(e.data)
        }));
        this.carregando = false;
      },
      error: (err) => {
        this.erro = 'Erro ao carregar extratos';
        console.error(err);
        this.carregando = false;
      }
    });
  }

  deletarExtrato(id?: number): void {
    if (!id) return;
    this.extratoService.delete(id).subscribe({
      next: () => this.carregarExtratos(),
      error: (err) => console.error('Erro ao deletar extrato', err)
    });
  }
}
