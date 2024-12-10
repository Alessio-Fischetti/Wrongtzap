import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard, } from './config/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import("./auth/login/login.component").then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat.component').then((m) => m.ChatComponent),
    canActivate: [AuthGuard]
  },

];
