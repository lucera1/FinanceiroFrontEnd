import { Component, OnInit } from '@angular/core';
import { ContaService } from '../../services/conta.service';
import { BancoService } from '../../services/banco.service';
import { UsuarioService } from '../../services/usuario.service';
import { Conta } from '../../models/conta.models';
import { Banco } from '../../models/banco.models';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
  tiposConta: string[] = [
  "CONTA_CORRENTE",
  "CONTA_INVESTIMENTO",
  "CARTAO_DE_CREDITO",
  "ALIMENTACAO",
  "POUPANCA"
];

  contas: Conta[] = [];
  bancos: Banco[] = [];
  usuarios: Usuario[] = [];
  novaConta: any = {}; // objeto temporário para criação
  contaEditando: any = null; // objeto temporário para edição

  constructor(
    private contaService: ContaService,
    private bancoService: BancoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.loadContas();
    this.loadBancos();
    this.loadUsuarios();
  }

  // Carregar contas
  loadContas() {
    this.contaService.findAll().subscribe({
      next: (contas: Conta[]) => this.contas = contas,
      error: (err) => console.error(err)
    });
  }

  // Carregar bancos
  loadBancos() {
    this.bancoService.findAll().subscribe({
      next: (bancos: Banco[]) => this.bancos = bancos,
      error: (err) => console.error(err)
    });
  }

  // Carregar usuários
  loadUsuarios() {
    this.usuarioService.findAll().subscribe({
      next: (usuarios: Usuario[]) => this.usuarios = usuarios,
      error: (err) => console.error(err)
    });
  }

  // Criar conta
  criarConta() {
    const contaParaCriar: Conta = {
      ...this.novaConta,
      
      usuario: this.usuarios.find(u => u.id === this.novaConta.usuarioId),
      banco: this.bancos.find(b => b.id === this.novaConta.bancoId)
    };
    this.contaService.create(contaParaCriar).subscribe({
      next: () => {
        this.novaConta = {};
        this.loadContas();
      },
      error: (err) => console.error(err)
    });
  }

  // Preparar edição
  editarConta(conta: Conta) {
    this.contaEditando = { 
      ...conta,
      usuarioId: conta.usuario?.id,
      bancoId: conta.banco?.id
    };
  }

  // Atualizar conta
  atualizarConta() {
    const contaAtualizada: Conta = {
      ...this.contaEditando,
      usuario: this.usuarios.find(u => u.id === this.contaEditando.usuarioId),
      banco: this.bancos.find(b => b.id === this.contaEditando.bancoId)
    };
    this.contaService.update(contaAtualizada.id!, contaAtualizada).subscribe({
      next: () => {
        this.contaEditando = null;
        this.loadContas();
      },
      error: (err) => console.error(err)
    });
  }

  cancelarEdicao() {
    this.contaEditando = null;
  }

  deletarConta(id: number) {
    if (!id) return;
    this.contaService.delete(id).subscribe({
      next: () => this.loadContas(),
      error: (err) => console.error(err)
    });
  }


  getNomeUsuario(usuarioId: number): string {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.razaoSocial : '—';
  }

  getNomeBanco(bancoId?: number): string {
    if (!bancoId) return '—';
    const banco = this.bancos.find(b => b.id === bancoId);
    return banco ? banco.razaoSocial : '—';
  }
}
