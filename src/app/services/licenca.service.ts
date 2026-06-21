import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LicencaService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:9090/licencas';

  comprar(usuarioId: number, jogoId: number) {
    return this.http.post(`${this.apiUrl}/comprar`, {
      usuarioId,
      jogoId,
    });
  }

  alugar(usuarioId: number, jogoId: number) {
    return this.http.post(`${this.apiUrl}/alugar`, {
      usuarioId,
      jogoId,
    });
  }

  listarPorUsuario(usuarioId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  listarPorUsuarioPaginado(
    usuarioId: number,

    pagina: number,

    tamanho: number,
  ) {
    return this.http.get<any>(`http://172.25.1.60:9090/licencas/usuario/${usuarioId}`, {
      params: {
        page: pagina,
        size: tamanho,
      },
    });
  }
}
