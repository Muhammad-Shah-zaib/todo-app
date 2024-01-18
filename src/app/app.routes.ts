import { Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: 'home', redirectTo: '' },
    { path: 'todos', redirectTo: '' },
    { path: 'alltodos', redirectTo: '' },
    { path: 'favtodos', redirectTo: '' },
    { path: 'favouritetodos', redirectTo: '' },
    { path: 'favrouites', redirectTo: '' },
    { path: 'completedtodos', redirectTo: '' },
    { path: 'completed', redirectTo: '' },
    { path: 'done', redirectTo: '' },

    { path: '', component: NavBarComponent },
    { path: 'notFound', component: NotFoundComponent},
    {path: '**', redirectTo: 'notFound'}
];
