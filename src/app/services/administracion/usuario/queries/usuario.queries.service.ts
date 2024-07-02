import { Injectable, Inject, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IBandejaUsuarioRequest, IOutputBandejaUsuariosDataResponse, IOutputBandejaUsuariosResponse, IOutputCatalogosUsuarioRequest } from './usuario.queries.interface';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioQueriesService {
  private url_base: string = `${environment.apiUrl}/usuario`
  private http = inject(HttpClient);

  getCatalogosUsuario() {
    return this.http.get<IResponse>(`${this.url_base}/catalogos`)
  }

  getUser(id: number) {
    return this.http.get<IOutputBandejaUsuariosDataResponse>(`${this.url_base}/getuser`, { params: { id: id.toString() }} )
  }

  getBandejaUsuarios(params: IBandejaUsuarioRequest) {
    return this.http.get<IOutputBandejaUsuariosResponse>(`${this.url_base}/bandejaUsuario`)
      .pipe(
        tap(response => {
          console.log(response, 'getBandejaUsuarios');
        })
      );
  }
}
