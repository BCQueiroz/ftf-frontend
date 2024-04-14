import { Routes } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { SearchLocalsComponent } from './components/search-locals/search-locals.component';
import { inject } from '@angular/core';
import { AuthenticationGuard } from './utils/authentication-guard';
import { LoggedAreaComponent } from './components/logged-area/logged-area.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: "login", component: LoginViewComponent },
    { path: "logged-area", component: LoggedAreaComponent , canActivate: [() => inject(AuthenticationGuard).canActivate()]}
];
