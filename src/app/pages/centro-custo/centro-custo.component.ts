import { Component, OnInit } from '@angular/core';
import { CentroCustoService } from '../../services/centro-custo.service';
import { CentroCusto } from '../../models/centro-custo.models';

@Component({
  selector: 'app-centro-custo',
  templateUrl: './centro-custo.component.html',
  styleUrls: ['./centro-custo.component.css']
})
export class CentroCustoComponent implements OnInit {
  centrosCusto: CentroCusto[] = [];
  novoCentro: CentroCusto = { razaoSocial: '' };
  centroEditando: CentroCusto | null = null;

  constructor(private centroCustoService: CentroCustoService) {}

  ngOnInit(): void {
    this.loadCentros();
  }

  loadCentros() {
  this.centroCustoService.findAll().subscribe({
    next: (c: CentroCusto[]) => this.centrosCusto = c,
    error: (err: any) => console.error(err)
  });
}



  criarCentro() {
    this.centroCustoService.create(this.novoCentro).subscribe({
      next: () => {
        this.novoCentro = { razaoSocial: '' };
        this.loadCentros();
      },
      error: (err) => console.error(err)
    });
  }

  editarCentro(centro: CentroCusto) {
    this.centroEditando = { ...centro };
  }

  atualizarCentro() {
    if (!this.centroEditando || !this.centroEditando.id) return;
    this.centroCustoService.update(this.centroEditando.id, this.centroEditando).subscribe({
      next: () => {
        this.centroEditando = null;
        this.loadCentros();
      },
      error: (err) => console.error(err)
    });
  }

  cancelarEdicao() {
    this.centroEditando = null;
  }

  deletarCentro(id?: number) {
    if (!id) return;
    this.centroCustoService.delete(id).subscribe({
      next: () => this.loadCentros(),
      error: (err) => console.error(err)
    });
  }
}
