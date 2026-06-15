import { Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { MatCardModule } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-perfil',
  imports: [MatCardModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);

  usuario: any = null;

  ngOnInit(): void {
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
}
