import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, WritableSignal, input } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-titulo',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule
  ],
  templateUrl: './titulo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TituloComponent implements OnInit {
  home: MenuItem | undefined;

  breadcrumbs = input<MenuItem[]>();
  titulo = input.required<string>();

  ngOnInit(): void {
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
  }
}
