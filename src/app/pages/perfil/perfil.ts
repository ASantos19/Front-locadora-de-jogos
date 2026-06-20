import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../../models/usuario.model';
import { Component, inject, OnInit, signal } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ConfirmacaoDialog } from '../../components/confirmacao-dialog/confirmacao-dialog';

import { MatCardModule } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  usuario: any = null;
  usuarios = signal<any[]>([]);
  editando = false;
  ehAdmin = false;

  usuarioEdicao = {
    nome: '',
    apelido: '',
    email: '',
  };

  carregarPerfil(): void {
    this.authService.obterUsuarioLogado().subscribe({
      next: (dados) => {
        console.log(dados);

        this.usuario = dados;
        this.cdr.detectChanges();
      },

      error: (erro) => {
        console.error(erro);
      },
    });
  }

  editarPerfil(): void {
    this.editando = true;

    this.usuarioEdicao = {
      nome: this.usuario.nome,

      apelido: this.usuario.apelido,

      email: this.usuario.email,
    };
  }

  salvarPerfil(): void {
    this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', {
      duration: 3000,
    });
    this.authService
      .atualizarPerfil(this.usuarioEdicao)

      .subscribe({
        next: (usuarioAtualizado) => {
          this.usuario = usuarioAtualizado;

          this.editando = false;

          this.carregarPerfil();
        },

        error: (erro) => {
          console.error(erro);
        },
      });
  }

  cancelarEdicao(): void {
    this.editando = false;
  }

  ngOnInit(): void {
    console.log(this.usuarios);
    this.carregarPerfil();
    this.ehAdmin = this.authService.ehAdmin();
    if (this.authService.ehAdmin()) {
      this.authService.listarUsuarios().subscribe({
        next: (dados) => {
          console.log('USARIOS', dados);

          this.cdr.markForCheck();
          this.cdr.detectChanges();
          this.usuarios.set(dados);
        },
      });
    }
  }

  excluirUsuario(usuario: any): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialog, {
      width: '350px',
      data: {
        titulo: 'Excluir Usuário',
        mensagem: `Deseja excluir ${usuario.apelido}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmou) => {
      if (!confirmou) {
        return;
      }

      this.authService.excluirUsuario(usuario.id).subscribe({
        next: () => {
          this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', { duration: 3000 });

          this.usuarios.update((usuarios) => usuarios.filter((u) => u.id !== usuario.id));
        },

        error: (erro) => {
          console.error(erro);

          this.snackBar.open('Erro ao excluir usuário', 'Fechar', { duration: 3000 });
        },
      });
    });
  }
}
