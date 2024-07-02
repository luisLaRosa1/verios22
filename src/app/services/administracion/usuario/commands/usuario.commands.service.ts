import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {  IOutputUsuarioRequest, IUsuarioRequest } from './usuario.commands.Interface';
import { Observable, tap } from 'rxjs';
import { IResponse } from '../../../shared/interfaces/response.interface';
import { RefreshTokenService } from '../../../../helpers/services/refreshToken.service';
import { IdleService } from '../../../../helpers/services/idle.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioCommandsService {

  private url_base: string = `${environment.apiUrl}/usuario`
  private http = inject(HttpClient); 


  register(data: IUsuarioRequest): Observable<IResponse<IOutputUsuarioRequest>> {
    return this.http.post<IResponse<IOutputUsuarioRequest>>(`${this.url_base}/register`, data)
    .pipe(
      tap(response => {
        console.log(response, 'register');
      })
    );
  }

  edit(data: IUsuarioRequest): Observable<IResponse<IOutputUsuarioRequest>> {
    return this.http.post<IResponse<IOutputUsuarioRequest>>(`${this.url_base}/edit`, data)
    .pipe(
      tap(response => {
        console.log(response, 'edit');
      })
    );
  }

}
