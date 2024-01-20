import { Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignUpComponent},
    { path: 'home', redirectTo: '' },
    { path: 'todos', redirectTo: '' },
    { path: 'alltodos', redirectTo: '' },
    { path: 'favtodos', component: NavBarComponent  },
    { path: 'favouritetodos', redirectTo: '' },
    { path: 'favrouites', redirectTo: '' },
    { path: 'completedtodos', redirectTo: '' },
    { path: 'completed', redirectTo: '' },
    { path: 'done', redirectTo: '' },

    { path: '', component: NavBarComponent },
    { path: 'notFound', component: NotFoundComponent},
    {path: '**', redirectTo: 'notFound'}
];
