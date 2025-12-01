import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Usuario } from 'src/app/models/usuario.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  usuario: Usuario = {
    razaoSocial: '',
    email: '',
    senha: '',
    tipoPessoa: 'CLIENTE' // valor padrão
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  cadastrar() {
  this.authService.cadastrarUsuario(this.usuario).subscribe({
    next: (res: any) => {
      console.log(res); // para depuração
      alert(res); // mostra a mensagem do backend
      this.router.navigate(['/login']); // redireciona
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = err.error || 'Erro ao cadastrar usuário';
    }
  });
}

}

