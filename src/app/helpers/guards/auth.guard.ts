import { CanActivateFn, Router } from '@angular/router';
import { RefreshTokenService } from '../services/refreshToken.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  let tokenService = inject(RefreshTokenService);
  let isValidRefreshToken = tokenService.isValidRefreshToken();

  if (!isValidRefreshToken) {
    tokenService.removeToken();
    tokenService.removeRefreshToken();
    inject(Router).navigate(['/login']);
    return false;
  }

  return true;
};