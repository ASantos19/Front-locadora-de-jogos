import { Routes } from '@angular/router';
import { Jogos } from './pages/jogos/jogos';
import { MeusJogos } from './pages/meus-jogos/meus-jogos';
import { Perfil } from './pages/perfil/perfil';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: 'jogos', component: Jogos, canActivate: [authGuard]},
  {path: 'meus-jogos', component: MeusJogos, canActivate: [authGuard]},
  {path: 'perfil', component: Perfil, canActivate: [authGuard]},
  {path:'login', component: Login},
  {path:'cadastro', component: Cadastro},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
