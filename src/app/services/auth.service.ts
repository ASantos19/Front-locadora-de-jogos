import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthRequest } from '../models/Auth-request.model';
import { AuthResponse } from '../models/Auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/auth';

  login(dados: AuthRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dados);
  }

  registrar(dados: AuthRequest) {
    return this.http.post(`${this.apiUrl}/register`, dados);
  }

  salvarToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  obterToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }

    return localStorage.getItem('token');
  }

  obterPayloadToken(): any {
    const token = this.obterToken();

    if (!token) {
      return null;
    }

    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  estaAutenticado(): boolean {
    const token = this.obterToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const expiracao = payload.exp * 1000;

      if (Date.now() > expiracao) {
        this.logout();

        return false;
      }

      return true;
    } catch {
      this.logout();

      return false;
    }
  }

  obterUsuarioId(): number {
    const token = this.obterToken();

    if (!token) {
      return 0;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return payload.id;
    } catch {
      return 0;
    }
  }

  obterUsuarioLogado() {
    return this.http.get<any>('http://localhost:8080/usuarios/me');
  }

  atualizarPerfil(usuario: any) {
    return this.http.put('http://localhost:8080/usuarios/me', usuario);
  }

  excluirUsuario(id: number) {
    return this.http.delete(`http://localhost:8080/usuarios/${id}`);
  }

  listarUsuarios() {
    return this.http.get<any[]>('http://localhost:8080/usuarios');
  }

  ehAdmin(): boolean {
    const token = this.obterToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return payload.roles?.includes('ROLE_ADMIN');
    } catch {
      return false;
    }
  }
}
