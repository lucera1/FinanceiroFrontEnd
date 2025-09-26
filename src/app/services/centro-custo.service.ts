import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CentroCusto } from '../models/centro-custo.models';

@Injectable({
  providedIn: 'root'
})
export class CentroCustoService {
  private apiUrl = 'http://localhost:8080/centrocusto';

  constructor(private http: HttpClient) {}

  findAll(): Observable<CentroCusto[]> {
    return this.http.get<CentroCusto[]>(this.apiUrl);
  }

  create(centroCusto: CentroCusto): Observable<CentroCusto> {
    return this.http.post<CentroCusto>(this.apiUrl, centroCusto);
  }

  update(id: number, centroCusto: CentroCusto): Observable<CentroCusto> {
    return this.http.put<CentroCusto>(`${this.apiUrl}/${id}`, centroCusto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
