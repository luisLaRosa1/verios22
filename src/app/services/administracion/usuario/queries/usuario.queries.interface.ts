import { ICatalogs } from "../../../../helpers/interfaces/catalog";

export interface ICatalogosUsuarioRequest {
}
export interface IOutputCatalogosUsuarioRequest {
    catAreas: ICatalogs[];
    catRoles: ICatalogs[];
}


export interface IBandejaUsuarioRequest {
    sort: string;
    pageIndex: number;
    pageSize: number;
    search: string;
}
export interface IOutputBandejaUsuariosResponse {
    count: number;
    pageCount: number;
    pageIndex: number;
    pageSize: number;
    resultByPage: number
    data: IOutputBandejaUsuariosDataResponse[];
}

export interface IOutputBandejaUsuariosDataResponse {
    id: number;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    correoElectronico: string;
    idRol: string;
    idUsuario: string;
    activo: boolean;
}

