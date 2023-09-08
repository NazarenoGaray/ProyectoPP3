import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { estado_incidente } from 'src/app/model/categoria_incidente.model';


@Injectable({
  providedIn: 'root'
})
export class EstadoIncidenteService {

  private apiURL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  obtenerEstadosIncidentes(): Observable<estado_incidente[]> {
    const url = `${this.apiURL}/estadosIncidente`;
    return this.http.get<estado_incidente[]>(url);
  }

  obtenerEstadoIncidentePorId(idEstadoIncidente: number): Observable<estado_incidente> {
    const url = `${this.apiURL}/estadosIncidente/${idEstadoIncidente}`;
    return this.http.get<estado_incidente>(url);
  }

  crearEstado(Estado: estado_incidente): Observable<estado_incidente> {
    return this.http.post<estado_incidente>(this.apiURL, Estado);
  }


}
