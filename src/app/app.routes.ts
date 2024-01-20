import { Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignUpComponent},
    { path: 'allTodos', component: NavBarComponent },
    { path: 'alltodos', component: NavBarComponent },
    { path: 'favouriteTodos', component: NavBarComponent },
    { path: 'favouritetodos', component: NavBarComponent },
    { path: 'completedTodos', component: NavBarComponent },
    { path: 'completedtodos', component: NavBarComponent },

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'notFound', component: NotFoundComponent},
    { path: '**', redirectTo: 'notFound'}
];
