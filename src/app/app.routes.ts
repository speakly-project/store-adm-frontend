import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'login', component: Login},
    {path: 'cursos', component: Cursos},
    {path: 'cursos/:id', component: Cursos},
    {path: 'categorias', component: Categorias},
    {path: 'error', component: Error},
    {path: '**', redirectTo: ''}, 
];