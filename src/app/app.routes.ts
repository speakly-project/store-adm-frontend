import { Routes } from '@angular/router';
import { Cursos } from './components/pages/cursos/cursos';

export const routes: Routes = [
    // {path: '', component: Home},
    // {path: 'login', component: Login},
    { path: '', component: Cursos },
    // {path: 'cursos/:id', component: Cursos},
    // {path: 'categorias', component: Categorias},
    // {path: 'error', component: Error},
     {path: '**', redirectTo: ''}, 
];