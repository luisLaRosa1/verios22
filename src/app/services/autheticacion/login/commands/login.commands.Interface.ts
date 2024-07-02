export interface ILoginRequest {
    correoElectronico: string;
    password: string;
}
export interface IOutputLoginRequest {
    id: number;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    correoElectronico: string;
    token: string;
}


export interface IRefreshTokenRequest {
    refreshToken: string;
}

export interface IOutputRefreshTokenRequest {
    token: string;
    refreshToken: string;
}

export interface IRecoverPasswordRequest {
    correoElectronico: string;
}