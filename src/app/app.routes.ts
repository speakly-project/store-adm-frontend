import { Routes } from '@angular/router';
import { Cursos } from './components/pages/cursos/cursos';
import { Home } from './components/pages/inicio/home';
import { loginGuard } from './guards/login-guard';
import { Error } from './components/pages/error/error';
import { Login } from './components/pages/login/login';
import { Logout } from './components/pages/logout/logout';

export const routes: Routes = [
    { path: '', component: Home },
    // {path: 'login', component: Login},
    { path: 'cursos', component: Cursos, canActivate: [loginGuard] },
    // {path: 'cursos/:id', component: Cursos},
    // {path: 'categorias', component: Categorias},
    { path: 'login', component: Login},
    { path: 'logout', component: Logout },
    { path: '**', redirectTo: '' },
];