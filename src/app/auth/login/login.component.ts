import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // certifique-se de ter o CSS
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  erro: string = ''; // Mensagem de erro para exibir na tela

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.erro = ''; // limpa mensagem de erro

    if (!this.email || !this.senha) {
      this.erro = 'Por favor, preencha todos os campos';
      return;
    }

    this.auth.login(this.email, this.senha).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.erro = 'Usuário ou senha inválidos';
      }
    });
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

}
