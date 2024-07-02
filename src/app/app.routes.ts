import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TarifasComponent } from './pages/reglas/tarifas/tarifas.component';
import {QeqComponent} from "./pages/reglas/qeq/qeq.component";

export const routes: Routes = [
    {
        path: "", redirectTo: "dashboard", pathMatch: "full"
    },
    {
        path: "login", component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'cargaMasivaQeQ', component: QeqComponent,}
        ]
    },

    {
        path: 'administracion',
        component: LayoutComponent,
        children: [
            {
                path: 'reglas/tarifas', component: TarifasComponent
            }
        ]
    }

];
