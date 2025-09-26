import { Component, OnInit } from '@angular/core';
import { BancoService, Banco } from '../../services/banco.service';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})
export class BancoComponent implements OnInit {

  bancos: Banco[] = [];
  novoBanco: Banco = { razaoSocial: '' };
  bancoEditando?: Banco;

  constructor(private bancoService: BancoService) {}

  ngOnInit(): void {
    this.carregarBancos();
  }

  carregarBancos(): void {
    this.bancoService.findAll().subscribe({
      next: (data) => this.bancos = data,
      error: (err) => console.error('Erro ao carregar bancos', err)
    });
  }

  criarBanco(): void {
    this.bancoService.create(this.novoBanco).subscribe({
      next: () => {
        this.carregarBancos();
        this.novoBanco = { razaoSocial: '' };
      },
      error: (err) => console.error('Erro ao criar banco', err)
    });
  }

  editarBanco(banco: Banco): void {
    this.bancoEditando = { ...banco };
  }

  cancelarEdicao(): void {
    this.bancoEditando = undefined;
  }

  atualizarBanco(): void {
    if (!this.bancoEditando) return;

    this.bancoService.update(this.bancoEditando).subscribe({
      next: () => {
        this.carregarBancos();
        this.bancoEditando = undefined;
      },
      error: (err) => console.error('Erro ao atualizar banco', err)
    });
  }

  deletarBanco(id?: number): void {
    if (!id) return;
    this.bancoService.delete(id).subscribe({
      next: () => this.carregarBancos(),
      error: (err) => console.error('Erro ao deletar banco', err)
    });
  }
}
