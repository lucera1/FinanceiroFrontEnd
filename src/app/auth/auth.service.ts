import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // URL da sua API Spring Boot

  constructor(private http: HttpClient) {}

  /**
   * Faz login no backend e salva o token JWT no localStorage
   */
  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username: email, password: senha })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token); // salva token JWT
        })
      );
  }

  /**
   * Logout: remove token do localStorage
   */
  logout(): void {
    localStorage.removeItem('token');
  }

  /**
   * Retorna o token JWT salvo
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Verifica se o usuário está logado
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
