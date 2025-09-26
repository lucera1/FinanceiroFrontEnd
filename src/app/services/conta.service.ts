import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conta } from '../models/conta.models';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  private apiUrl = 'http://localhost:8080/conta';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.apiUrl);
  }

  findById(id: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.apiUrl}/${id}`);
  }

  create(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(this.apiUrl, conta);
  }

  update(id: number, conta: Conta): Observable<Conta> {
    return this.http.put<Conta>(`${this.apiUrl}/${id}`, conta);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
