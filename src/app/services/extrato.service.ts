import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Extrato } from '../models/extrato.models';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {
  private apiUrl = 'http://localhost:8080/extratos'; // mesma base dos outros serviços

  constructor(private http: HttpClient) {}

  findAll(): Observable<Extrato[]> {
    return this.http.get<Extrato[]>(this.apiUrl);
  }

  findByContaId(contaId: number): Observable<Extrato[]> {
    return this.http.get<Extrato[]>(`${this.apiUrl}/conta/${contaId}`);
  }

  findById(id: number): Observable<Extrato> {
    return this.http.get<Extrato>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
