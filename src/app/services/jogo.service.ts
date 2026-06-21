import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';

import { Jogo } from '../models/jogo.model';

@Injectable({
  providedIn: 'root',
})
export class JogoService {
  private readonly http = inject(HttpClient);
  private readonly jogos = signal<Jogo[]>([]);
  private readonly carregando = signal(false);
  private readonly erro = signal<string | null>(null);
  private readonly apiUrl = 'http://172.25.1.60:9090/jogos';

  listar(): Signal<Jogo[]> {
    return this.jogos.asReadonly();
  }

  listarPaginado(params: { pagina: number; tamanho: number }) {
    return this.http.get<any>('http://172.25.1.60:9090/jogos', {
      params: {
        page: params.pagina,
        size: params.tamanho,
      },
    });
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

    this.http.get<Jogo[]>(this.apiUrl).subscribe({
      next: (dados) => {
        this.jogos.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os jogos.');
        this.carregando.set(false);
      },
    });
  }

  buscarPorId(id: number): Jogo | undefined {
    return this.jogos().find((jogo) => jogo.id === id);
  }

  cadastrar(jogo: Omit<Jogo, 'id'>): void {
    this.http.post<Jogo>(this.apiUrl, jogo).subscribe({
      next: (novoJogo) => {
        this.jogos.update((lista) => [...lista, novoJogo]);
      },
    });
  }

  editar(id: number, jogoAtualizado: Omit<Jogo, 'id'>): void {
    this.http.put<Jogo>(`${this.apiUrl}/${id}`, jogoAtualizado).subscribe({
      next: (jogoEditado) => {
        this.jogos.update((lista) => lista.map((jogo) => (jogo.id === id ? jogoEditado : jogo)));
      },
    });
  }

  remover(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.jogos.update((lista) => lista.filter((jogo) => jogo.id !== id));
      },
    });
  }

  atualizarJogos(jogos: any[]): void {

  this.jogos.set(jogos);

}
}
