import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private readonly http = inject(HttpClient);
  private readonly usuarios = signal<Usuario[]>([]);
  private readonly carregando = signal(false);
  private readonly erro = signal<string | null>(null);
  private readonly apiUrl = 'http://localhost:8080/usuarios';

  listar(): Signal<Usuario[]> {
    return this.usuarios.asReadonly();
  }

  estaCarregando(): Signal<boolean> {
    return this.carregando.asReadonly();
  }

  mensagemErro(): Signal<string | null> {
    return this.erro.asReadonly();
  }

  carregar(): void {
    this.carregando.set(true);
    this.erro.set(null);

    this.http.get<Usuario[]>(this.apiUrl).subscribe({
      next: (dados) => {
        this.usuarios.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os usuários.');
        this.carregando.set(false);
      }
    });
  }

  buscarPorId(id: number): Usuario | undefined {
    return this.usuarios().find(usuario => usuario.id === id);
  }

  cadastrar(usuario: Omit<Usuario, 'id'>): void {
    this.http.post<Usuario>(this.apiUrl, usuario).subscribe({
      next: (novoUsuario) => {
        this.usuarios.update(lista => [...lista, novoUsuario]);
      }
    });
  }

  editar(id: number, usuarioAtualizado: Omit<Usuario, 'id'>): void {
    this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuarioAtualizado)
      .subscribe({
        next: (usuarioEditado) => {
          this.usuarios.update(lista =>
            lista.map(usuario =>
              usuario.id === id ? usuarioEditado : usuario
            )
          );
        }
      });
  }

  remover(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`)
      .subscribe({
        next: () => {
          this.usuarios.update(lista =>
            lista.filter(usuario => usuario.id !== id)
          );
        }
      });
  }
}
