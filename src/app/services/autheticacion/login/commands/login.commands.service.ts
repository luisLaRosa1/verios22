import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest, IOutputLoginRequest, IOutputRefreshTokenRequest, IRecoverPasswordRequest, IRefreshTokenRequest } from './login.commands.Interface';
import { Observable, tap } from 'rxjs';
import { IResponse } from '../../../shared/interfaces/response.interface';
import { RefreshTokenService } from '../../../../helpers/services/refreshToken.service';
import { IdleService } from '../../../../helpers/services/idle.service';

@Injectable({
  providedIn: 'root'
})
export class LoginCommandsService {

  private url_base: string = `${environment.apiUrl}/usuario`
  private http = inject(HttpClient);
  private refreshTokenService = inject(RefreshTokenService);
  private idleService = inject(IdleService);

  login(data: ILoginRequest): Observable<IResponse<IOutputLoginRequest>> {
    const request = data;
    return this.http.post<IResponse<IOutputLoginRequest>>(`${this.url_base}/login`, data)
    .pipe(
      tap(response => {
        this.refreshTokenService.saveToken(response.data.token);
        this.refreshTokenService.saveRefreshToken(response.data.token);
      })
    );
  }

  refreshToken(refreshToken: string) {
    let refreshTokenRequest: IRefreshTokenRequest = {
      refreshToken: refreshToken
    }

    return this.http.post<IOutputRefreshTokenRequest>(`${this.url_base}/refreshtoken`, refreshTokenRequest)
      .pipe(
        tap(response => {
          this.refreshTokenService.saveToken(response.token);
          this.refreshTokenService.saveRefreshToken(response.refreshToken);
          this.idleService.restart();
        })
      );
  }

  recoverPassword(data: IRecoverPasswordRequest): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.url_base}/forgotpassword`, data);
  }

}
