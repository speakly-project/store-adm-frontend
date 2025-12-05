import { Routes } from '@angular/router';
import { Cursos } from './components/pages/cursos/cursos';
import { Home } from './components/pages/inicio/home';

export const routes: Routes = [
    {path: '', component: Home},
    // {path: 'login', component: Login},
    { path: 'cursos', component: Cursos },
    // {path: 'cursos/:id', component: Cursos},
    // {path: 'categorias', component: Categorias},
    // {path: 'error', component: Error},
     {path: '**', redirectTo: ''}, 
];