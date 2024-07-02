import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TarifasComponent } from './pages/reglas/tarifas/tarifas.component';
import { authGuard } from './helpers/guards/auth.guard';
import { redirectGuard } from './helpers/guards/redirect.guard';
import { RecoverPasswordComponent } from './pages/authentication/recover-password/recover-password.component';
import { UsuariosComponent } from './pages/administracion/usuarios.component';
import { QeqComponent } from './pages/reglas/qeq/qeq.component';

export const routes: Routes = [
  // {
  //     //path: "", redirectTo: "dashboard", pathMatch: "full"
  //     path: "", redirectTo: "/login", pathMatch: "full"
  // },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },

  {
    path: 'administracion',
    component: LayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent,
      },
      {
        path: 'reglas/tarifas',
        component: TarifasComponent,
      },
      {
        path: 'reglas/qeq',
        component: QeqComponent,
      },
    ],
  },
];
