import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estadisticas } from 'src/app/model/estadisticas.model';
import { Observable } from 'rxjs';
import { Establecimiento } from 'src/app/model/establecimientos.model';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  private apiURL = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
  ) { }


  obtenerEstadisticasDeIncidentesPorFecha(fechaInicio: string, fechaFinalizacion: string): Observable<Estadisticas> {
    const url = `${this.apiURL}/estadisticas/incidentesPorFecha?fechaInicio=${fechaInicio}&fechaFinalizacion=${fechaFinalizacion}`;
    return this.http.get<Estadisticas>(url);
  }


  consultarEstablecimientosConMasIncidencias(): Observable<Establecimiento[]> {
    const url = `${this.apiURL}/estadisticas/establecimientosConMasIncidencias`;
    return this.http.get<Establecimiento[]>(url);
  }


}
