import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {
  IResponse,
  IResponseV2,
} from '../../../services/shared/interfaces/response.interface';
import {MessageService} from 'primeng/api';
import {
  Menues,
  ISideBarV2,
  IMenuV2,
  IOpcion,
  MenuItem
} from '../../../services/autheticacion/menu/menu-queries-interface';
import {MenuQueriesService} from '../../../services/autheticacion/menu/menu.queries.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuQueriesService, MessageService],
})
export class SideBarComponent implements OnInit {
  @Input() expanded: boolean = false;
  menu_queries_service = inject(MenuQueriesService);
  messageService = inject(MessageService);
  lstMenu = signal<Menues[]>([]);

  ngOnInit(): void {
    this.lstMenu.set([]);
    // this.menu_queries_service.getMenu().subscribe({
    //   next: (response: IResponseV2) => {
    //     const lstMenus: Menues[] =[]
    //     let menu: ISideBarV2 = response.data;
    //     menu?.menu.forEach((element: IMenuV2) => {
    //       let menuPrincipal: MenuItem[] = [];
    //       element.opcion.forEach((subelement: IOpcion) => {
    //         const menuOpcion: MenuItem = {
    //           label: subelement.descripcion,
    //           icon: 'pi pi-fw pi-home',
    //           routerLink: [`${element.url}${subelement.url}`],
    //           routerLinkActiveOptions: null,
    //         };
    //         menuPrincipal.push(menuOpcion);
    //       });
    //       lstMenus.push({items: menuPrincipal, label: element.descripcion});
    //     });
    //     this.lstMenu.set(lstMenus);
    //   },
    //   error: (error: IResponse) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: `${error.message}`,
    //     });
    //   },
    // }

    this.lstMenu.set([
      {
        label: 'Administracion',
        items: [
          {routerLink: ['/usuarios'], label: 'Usuarios', icon: 'fa fa-cogs'}
        ],
      },
      {
        label: 'Reglas de negocio',
        items: [
          {routerLink: ['/cargaMasivaOII'], label: 'Carga masiva OII', icon: 'fa fa-cogs'},
          {routerLink: ['/cargaMasivaQeQ'], label: 'Carga masiva QeQ', icon: 'fa fa-cogs'},
          {routerLink: ['/cargaMasivaCumulos'], label: 'Carga masiva Cumulos', icon: 'fa fa-cogs'},
          {routerLink: ['/oii'], label: 'Tarifas', icon: 'fa fa-cogs'},
          {routerLink: ['/bandejaNacionalidad'], label: 'Bandeja de nacionalidad', icon: 'fa fa-cogs'},
          {routerLink: ['/bandejaNacionalidad'], label: 'Bandeja de nacionalidad', icon: 'fa fa-cogs'},
          {routerLink: ['/edad-plazo'], label: 'Edad + Plazo', icon: 'fa fa-cogs'},
          {routerLink: ['/imc'], label: 'IMC', icon: 'fa fa-cogs'},
          {routerLink: ['/imc'], label: 'Examen medico', icon: 'fa fa-cogs'},
          {routerLink: ['/cumulos'], label: 'Cumulos', icon: 'fa fa-cogs'},
          {routerLink: ['/ocupaciones'], label: 'Ocupaciones', icon: 'fa fa-cogs'},
        ],
      },
    ])
  }
}
