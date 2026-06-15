import { AuthService } from './../../services/auth.service';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';

import { LicencaService } from '../../services/licenca.service';
import { StatusPipe } from '../../pipes/Status-label-pipe';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-meus-jogos',
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    CurrencyPipe,
    DatePipe,
    TitleCasePipe,
    StatusPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './meus-jogos.html',
  styleUrl: './meus-jogos.css',
})
export class MeusJogos implements OnInit {
  private readonly licencaService = inject(LicencaService);
  private readonly authService = inject(AuthService);

  licencas: any[] = [];

  carregado = true;

  paginaAtual = 0;

  tamanhoPagina = 5;

  totalRegistros = signal(0);

  filtroTipo = signal('');

  filtroStatus = signal('');

  buscaNome = signal('');

  ngOnInit(): void {
    this.carregarLicencas();
  }

  carregarLicencas(): void {
    const usuarioId = this.authService.obterUsuarioId();

    this.licencaService
      .listarPorUsuarioPaginado(
        usuarioId,

        this.paginaAtual,

        this.tamanhoPagina,
      )

      .subscribe({
        next: (resposta) => {
          console.log(resposta);
          this.licencas = resposta.content;

          this.totalRegistros.set(resposta.totalElements);
        },
      });
  }

  aoMudarPagina(evento: PageEvent): void {
    this.paginaAtual = evento.pageIndex;

    this.tamanhoPagina = evento.pageSize;

    this.carregarLicencas();
  }

  licencasFiltradas() {
    return this.licencas.filter((licenca) => {
      const tipoMatch = !this.filtroTipo() || licenca.tipoLicenca === this.filtroTipo();

      const statusMatch = !this.filtroStatus() || licenca.statusLicenca === this.filtroStatus();

      const nomeMatch =
        !this.buscaNome() ||
        licenca.nomeJogo.toLowerCase().includes(this.buscaNome().toLowerCase());

      return tipoMatch && statusMatch && nomeMatch;
    });
  }
}
