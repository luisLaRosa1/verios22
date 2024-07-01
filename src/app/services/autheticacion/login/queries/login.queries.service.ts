import { Injectable, Inject, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ITarifaResult } from './login.queries.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class TarifasQueriesService {
  private url_base: string = `${environment.apiUrl}/tarifas`
  private http = inject(HttpClient);

  /**
   * Obtiene la lista de las tarifas registradas en el sistema
   * @returns Lista de tarifas
   */
  get_all(): Observable<IResponse<Array<ITarifaResult>>> {
    return this.http.get<IResponse<Array<ITarifaResult>>>(`${this.url_base}/get-all`);
  }
}
