import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];

  // Para criar
  novoUsuario: Usuario = {
    razaoSocial: '',
    email: '',
    senha: '',
    tipoPessoa: 'CLIENTE'
  };

  // Para editar
  usuarioEditando?: Usuario;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.findAll().subscribe({
      next: data => this.usuarios = data,
      error: err => console.error('Erro ao carregar usuários', err)
    });
  }

  criarUsuario(): void {
    this.usuarioService.create(this.novoUsuario).subscribe({
      next: () => {
        this.carregarUsuarios();
        this.novoUsuario = { razaoSocial: '', email: '', senha: '', tipoPessoa: 'CLIENTE' };
      },
      error: err => console.error('Erro ao criar usuário', err)
    });
  }

  editarUsuario(usuario: Usuario): void {
    // Clona os dados do usuário em edição
    this.usuarioEditando = { ...usuario };
  }

  atualizarUsuario(): void {
    if (!this.usuarioEditando) return;
    this.usuarioService.update(this.usuarioEditando).subscribe({
      next: () => {
        this.carregarUsuarios();
        this.usuarioEditando = undefined;
      },
      error: err => console.error('Erro ao atualizar usuário', err)
    });
  }

  cancelarEdicao(): void {
    this.usuarioEditando = undefined;
  }

  deletarUsuario(id: number): void {
    this.usuarioService.delete(id).subscribe({
      next: () => this.carregarUsuarios(),
      error: err => console.error('Erro ao deletar usuário', err)
    });
  }
}
