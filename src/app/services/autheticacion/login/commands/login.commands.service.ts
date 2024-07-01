import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ITarifaAddRequest } from './login.commands.Interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarifaCommandsService {

  private url_base: string = `${environment.apiUrl}/usuario`
  private http = inject(HttpClient);


  /**
   * Metodo para guardar las reglas de tarifas
   * @param data Lista de tarifas
   * @returns true => Inserción correctamente 
   * @returns false => Inserción incorrecta  
   */
  add(data: Array<ITarifaAddRequest>): Observable<boolean> {
    const request = { tarifas: data }
    return this.http.post<boolean>(`${this.url_base}/login`, request);
  }

}
