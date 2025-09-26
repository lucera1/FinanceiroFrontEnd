import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Banco {
  id?: number;
  razaoSocial: string;
}

@Injectable({
  providedIn: 'root'
})
export class BancoService {
  private apiUrl = 'http://localhost:8080/banco';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Banco[]> {
  return this.http.get<Banco[]>(this.apiUrl);
}

create(banco: Banco): Observable<Banco> {
  return this.http.post<Banco>(this.apiUrl, banco);
}

 update(banco: Banco): Observable<Banco> {
    return this.http.put<Banco>(`${this.apiUrl}/${banco.id}`, banco);
  }

delete(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}
