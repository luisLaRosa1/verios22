import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TituloComponent } from '../components/titulo/titulo.component';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        TituloComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
    titulo: string = 'Titulo operación';
    breadcrumbs: MenuItem[] = [{ label: 'Administración' }]

}
