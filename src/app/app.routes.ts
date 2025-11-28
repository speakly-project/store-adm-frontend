import { Routes } from '@angular/router';
import { PAdmin } from './pages/p-admin/p-admin';
import { PHome } from './pages/p-home/p-home';
import { PLogin } from './pages/p-login/p-login';

export const routes: Routes = [
    {path: '', component: PHome},
    {path: 'login', component: PLogin},
    {path: 'admin', component: PAdmin},
    {path: 'error', component: Error},
    {path: '**', redirectTo: ''}, 
];
