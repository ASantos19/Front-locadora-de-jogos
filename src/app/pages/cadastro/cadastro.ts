import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  apelido = '';
  email = '';
  password = '';
  confirmarSenha = '';

  erro: string | null = null;

  cadastrar(): void {

    this.erro = null;

    if (this.password !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    this.authService.registrar({
      apelido: this.apelido,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.erro = 'Não foi possível realizar o cadastro.';
      }
    });
  }
}
