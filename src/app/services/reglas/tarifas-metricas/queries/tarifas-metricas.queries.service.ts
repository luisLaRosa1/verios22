import {Injectable, Inject, inject} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {ITarifaMetricaResult} from './tarifas-metricas.queries.interface';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {IResponse} from '../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class TarifasMetricasQueriesService {
  private url_base: string = `${environment.apiUrl}/tarifas-metricas`
  private http = inject(HttpClient);

  /**
   * Obtiene la lista de las tarifas registradas en el sistema
   * @returns Lista de tarifas
   */
  get_all(): Observable<IResponse<Array<ITarifaMetricaResult>>> {
    return this.http.get<IResponse<Array<ITarifaMetricaResult>>>(`${this.url_base}/get-all`);
  }

  

}
