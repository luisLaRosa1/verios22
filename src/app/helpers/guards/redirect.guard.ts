import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RefreshTokenService } from '../services/refreshToken.service';

export const redirectGuard: CanActivateFn = (route, state) => {

  let tokenService = inject(RefreshTokenService);
  let isValidRefreshToken = tokenService.isValidRefreshToken();

  if (!isValidRefreshToken) {
    tokenService.removeToken();
    tokenService.removeRefreshToken();
    return true;
  }

  inject(Router).navigate(['/dashboard']);
  return true;
};