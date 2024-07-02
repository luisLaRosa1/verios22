import { Injectable } from '@angular/core';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UserToken } from '../interfaces/token';
// import { UserLogged } from '../models/auth/userLogged';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  constructor() { }

  // Token
  saveToken(token: string): void {
    setCookie('token', token, { expires: 1, path: '/' });
  }

  getToken(): string {
    return getCookie('token')!;
  }

  removeToken(): void {
    removeCookie('token');
  }

  isValidToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const decodeToken: JwtPayload = jwtDecode(token);

    if (decodeToken && decodeToken.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);

      const now = new Date();
      return tokenDate.getTime() > now.getTime();
    }

    return false;
  }

  getUserLogged(): UserToken | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const userLogged: UserToken = {
      userId: JSON.parse(atob(token.split('.')[1])).userId,
      email: JSON.parse(atob(token.split('.')[1])).email
    };

    return userLogged;
  }

  // Refresh Token
  saveRefreshToken(refreshToken: string): void {
    setCookie('refreshToken', refreshToken, { expires: 1, path: '/' });
  }

  getRefreshToken() {
    return getCookie('refreshToken')!;
  }

  removeRefreshToken(): void {
    removeCookie('refreshToken');
  }

  isValidRefreshToken(): boolean {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }

    const decodeToken: JwtPayload = jwtDecode(token);

    if (decodeToken && decodeToken.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);

      const now = new Date();
      return tokenDate.getTime() > now.getTime();
    }

    return false;
  }
}
