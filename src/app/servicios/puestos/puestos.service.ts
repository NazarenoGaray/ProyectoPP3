import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Puesto } from 'src/app/model/puesto.model';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {
  private apiURL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  obtenerPuestosPorEstablecimiento(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(`${this.apiURL}/puestos`);
  }

  // Obtener todos los puestos de un sector
  obtenerPuestosPorSector(idSector: number): Observable<Puesto[]> {
    const url = `${this.apiURL}/sectores/${idSector}/puestos`;
    return this.http.get<Puesto[]>(url);
  }


}
