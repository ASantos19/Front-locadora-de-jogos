import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JogoService } from '../../services/jogo.service';
import { LicencaService } from '../../services/licenca.service';

import { GeneroJogo } from '../../enums/genero-jogo.enum';
import { Plataforma } from '../../enums/plataforma.enum';
import { PagamentoDialog } from '../../components/pagamento-dialog/pagamento-dialog';
import { ConfirmacaoDialog } from '../../components/confirmacao-dialog/confirmacao-dialog';
import { GeneroJogoPipe } from '../../pipes/Genero-jogo-label-pipe';
import { PlataformaPipe } from '../../pipes/Plataforma-label-pipe';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-jogos',
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    DatePipe,
    MatPaginatorModule,
    CurrencyPipe,
    GeneroJogoPipe,
    PlataformaPipe,
  ],
  templateUrl: './jogos.html',
  styleUrl: './jogos.css',
})
export class Jogos implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly jogoService = inject(JogoService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly licencaService = inject(LicencaService);

  private readonly snackBar = inject(MatSnackBar);


  ehAdmin = this.authService.ehAdmin();

  jogos = this.jogoService.listar();

  carregando = this.jogoService.estaCarregando();

  erro = this.jogoService.mensagemErro();

  totalJogos = computed(() => this.jogos().length);

  jogoEditandoId: number | null = null;

  generoFiltro = signal<string>('');

  plataformaFiltro = signal<string>('');

  novoJogo = {
    nomeJogo: '',
    dataLancamento: '',
    generoJogo: GeneroJogo.ACAO,
    plataforma: Plataforma.PC,
    precoCompra: 0,
    precoAluguel: 0,
  };

  generos = Object.values(GeneroJogo);

  plataformas = Object.values(Plataforma);

  paginaAtual = 0;

  tamanhoPagina = 3;

  totalRegistros = signal(0);

  limparFormulario(): void {
    this.jogoEditandoId = null;

    this.novoJogo = {
      nomeJogo: '',
      dataLancamento: '',
      generoJogo: GeneroJogo.ACAO,
      plataforma: Plataforma.PC,
      precoCompra: 0,
      precoAluguel: 0,
    };
  }

  jogosFiltrados = computed(() => {
    return this.jogos().filter((jogo) => {
      const generoMatch = !this.generoFiltro() || jogo.generoJogo === this.generoFiltro();

      const plataformaMatch =
        !this.plataformaFiltro() || jogo.plataforma === this.plataformaFiltro();

      return generoMatch && plataformaMatch;
    });
  });

  cadastrarJogo(): void {
    if (this.jogoEditandoId !== null) {
      this.jogoService.editar(this.jogoEditandoId, this.novoJogo);
    } else {
      this.jogoService.cadastrar(this.novoJogo);
    }

    this.limparFormulario();
  }

  removerJogo(id: number): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialog, {
      width: '350px',

      data: {
        titulo: 'Excluir jogo',
        mensagem: 'Deseja realmente excluir este jogo?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmou) => {
      if (!confirmou) {
        return;
      }

      this.jogoService.remover(id);
    });
  }

  editarJogo(jogo: any): void {
    this.jogoEditandoId = jogo.id;

    this.novoJogo = {
      nomeJogo: jogo.nomeJogo,
      dataLancamento: jogo.dataLancamento,
      generoJogo: jogo.generoJogo,
      plataforma: jogo.plataforma,
      precoCompra: jogo.precoCompra,
      precoAluguel: jogo.precoAluguel,
    };
  }

  ngOnInit(): void {
    this.carregarJogos();

  }

  comprarJogo(jogo: any): void {
    const dialogRef = this.dialog.open(PagamentoDialog, {
      width: '400px',
      data: {
        nomeJogo: jogo.nomeJogo,
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) {
        return;
      }

      this.licencaService
        .comprar(this.authService.obterUsuarioId(), jogo.id)

        .subscribe({
          next: () => {
            this.snackBar.open(
              'Compra realizada com sucesso!',

              'Fechar',

              {
                duration: 3000,
              },
            );

            this.router.navigate(['/meus-jogos']);
          },

          error: (erro) => {
            let mensagem = 'Não foi possível concluir a compra.';

            if (erro.error?.message?.includes('já possui este jogo')) {
              mensagem = 'Este jogo já está na sua biblioteca';
            }

            this.snackBar.open(mensagem, 'Fechar', {
              duration: 3000,
            });
          },
        });
    });
  }

  alugarJogo(jogo: any): void {
    const dialogRef = this.dialog.open(PagamentoDialog, {
      width: '400px',
      data: {
        nomeJogo: jogo.nomeJogo,
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (!confirmado) {
        return;
      }

      this.licencaService
        .alugar(this.authService.obterUsuarioId(), jogo.id)

        .subscribe({
          next: () => {
            this.snackBar.open(
              'Aluguel realizado com sucesso!',

              'Fechar',

              {
                duration: 3000,
              },
            );

            this.router.navigate(['/meus-jogos']);
          },

          error: (erro) => {
            let mensagem = 'Não foi possível concluir o aluguel.';

            if (erro.error?.message?.includes('aluguel ativo')) {
              mensagem = 'Você já possui este jogo alugado';
            }

            this.snackBar.open(mensagem, 'Fechar', {
              duration: 3000,
            });
          },
        });
    });
  }

  carregarJogos(): void {
    this.jogoService
      .listarPaginado({
        pagina: this.paginaAtual,

        tamanho: this.tamanhoPagina,
      })

      .subscribe({
        next: (resposta) => {
          this.jogoService.atualizarJogos(resposta.content);

          this.totalRegistros.set(resposta.totalElements);
        },
      });
  }

  aoMudarPagina(evento: PageEvent): void {
    this.paginaAtual = evento.pageIndex;

    this.tamanhoPagina = evento.pageSize;

    this.carregarJogos();
  }
}
