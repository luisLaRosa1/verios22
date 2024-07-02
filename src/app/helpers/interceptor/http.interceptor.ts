import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { RefreshTokenService } from '../services/refreshToken.service';
import { LoginCommandsService } from '../../services/autheticacion/login/commands/login.commands.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);
export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private refreshTokenService: RefreshTokenService,
    private loginService: LoginCommandsService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.context.get(CHECK_TOKEN)) {
      const isValidToken = this.refreshTokenService.isValidToken(); // accessToken

      if (isValidToken) {
        return this.addToken(request, next);
      }
      else {
        return this.updateAccessTokenAndRefreshToken(request, next);
      }
    }
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.refreshTokenService.getToken();

    if (accessToken) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
      });

      return next.handle(authRequest);
    }

    return next.handle(request);
  }

  private updateAccessTokenAndRefreshToken(request: HttpRequest<unknown>, next: HttpHandler) {
    const refreshToken = this.refreshTokenService.getRefreshToken();
    const isValidRefreshToken = this.refreshTokenService.isValidRefreshToken();
    if (refreshToken && isValidRefreshToken) {
      return this.loginService.refreshToken(refreshToken)
        .pipe(
          switchMap(() => this.addToken(request, next)),
        )
    }

    return next.handle(request);
  }
}
