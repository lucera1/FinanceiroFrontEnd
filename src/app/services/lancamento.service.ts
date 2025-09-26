// src/app/services/lancamento.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lancamento } from '../models/lancamento.models';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  private apiUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) {}

  // Buscar todos os lançamentos
  findAll(): Observable<Lancamento[]> {
    return this.http.get<Lancamento[]>(this.apiUrl);
  }

  // Buscar lançamento por ID
  findById(id: number): Observable<Lancamento> {
    return this.http.get<Lancamento>(`${this.apiUrl}/${id}`);
  }

  // Criar lançamento
  create(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.post<Lancamento>(this.apiUrl, lancamento);
  }

  // Atualizar lançamento
  update(id: number, lancamento: Lancamento): Observable<Lancamento> {
    return this.http.put<Lancamento>(`${this.apiUrl}/${id}`, lancamento);
  }

  // Deletar lançamento
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Pagar lançamento
  pagar(id: number): Observable<Lancamento> {
    return this.http.put<Lancamento>(`${this.apiUrl}/pagar/${id}`, {});
  }
}
