import { ICatalogs } from "../../../../helpers/interfaces/catalog";


export interface IUsuarioRequest {
    id?:number;
    nombre:string;
    primerApellido:string;
    segundoApellido:string;
    correoElectronico:string;
    idArea:number;
    idRol:number;
    activo:boolean;
}
export interface IOutputUsuarioRequest{
    id:number;
    nombre:string;
    primerApellido:string;
    segundoApellido:string;
    correoElectronico:string;
    idArea:number;
    idRol:number;
    activo:boolean;
}