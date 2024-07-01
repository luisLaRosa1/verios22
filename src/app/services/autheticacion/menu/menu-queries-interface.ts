
export interface Menues {
  label: string;
  items: MenuItem[];
}

export interface MenuItem {
  label: string;
  icon: string;
  routerLink: string[];
  routerLinkActiveOptions?: any;
}

export interface ISideBarV2 {
  pathInicial: string;
  rol: string;
  menu: IMenuV2[];
}
export interface IMenuV2 {
  url: string;
  descripcion: string;
  icono: string;
  opcion: IOpcion[];
}
export interface IOpcion {
  url: string;
  descripcion: string;
  expanded: boolean;
  icono: string;
}
