import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ISideBarV2 } from './menu-queries-interface';
import { IResponseV2 } from '../../shared/interfaces/response.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuQueriesService {
  private url_base: string = `${environment.apiUrl}/AdmMenu`
  private http = inject(HttpClient);

  /**
   * Obtiene la lista de las tarifas registradas en el sistema
   * @returns Lista de menu por usuario
   */
  getMenu(): Observable<IResponseV2<ISideBarV2>> {
    return this.http.get<IResponseV2<ISideBarV2>>(`${this.url_base}/menu`);
  }
}
